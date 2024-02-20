import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import Button from './Button'
import { getRandomPicture } from '../../api'
import { AuthProps } from '../../types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import Loading from '../Loading'
import ModalNotification from '../ModalNotification'

const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required().min(2, 'Not long enough'),
    confirmPassword: Yup.string().required().min(2, 'Not long enough'),
})

const RegisterForm = ({ navigation }: any) => {

    const [load, setLoad] = useState(false)

    const [ modal, setModal ] = useState({
        status: '',
        visible: false,
        message: ''
    })

    const getProfile = async () => {
        try {
            const result = await getRandomPicture()

            if (result !== undefined) {
                return result.results[0].picture.large
            }
        } catch (error) {
            setModal({ status: "error", visible: true, message: 'Error: Failed generating picture' })
        }

        const timeoutId = setTimeout(() => {
            setModal({ status: '', visible: false, message: '' })
            clearTimeout(timeoutId);
        }, 5000);
    }


    const handleSubmit = async (i: AuthProps) => {
        setLoad(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, i.email, i.password)
            if (result.user.email !== null) {
                await setDoc(
                    doc(db, 'users', result.user.email), {
                        _uid: result.user.uid,
                        username: i.userName,
                        email: i.email,
                        profilePicture: await getProfile(),
                        joinedAt: serverTimestamp(),

                    }
                )
                setModal({ status: "success", visible: true, message: 'Successful - Go Log In' })
            }
        } catch (error: any) {
            if(error.message.includes('auth/email-already-in-use')){
                setModal({ status: "error", visible: true, message: 'Error: User already Exists' })
            } else {
                console.log(error)
                setModal({ status: "error", visible: true, message: 'Error: Unknown Error' })
            }
        }

        const timeoutId = setTimeout(() => {
            if(modal.status === 'success'){
                navigation.navigate('Login')
            }
            setModal({ status: '', visible: false, message: '' })
            setLoad(false)
            clearTimeout(timeoutId);
        }, 5000);
    }

    return (
        <Formik
            validateOnMount
            onSubmit={() => undefined}
            initialValues={{
                userName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={RegisterSchema}
        >
            {({ handleChange, values, isValid, errors, isSubmitting }) => (
                <View style={tw`w-full px-3 gap-6 mt-6`}>
                    <Loading load={load} />

                    <ModalNotification
                        status={modal.status}
                        visible={modal.visible}
                        children={
                            <Text style={tw`text-white font-bold`}>
                                {modal.message}
                            </Text>
                        }
                    />
                    
                    <FormInput
                        placeholder='User name'
                        onChangeText={handleChange('userName')}
                        textContentType='name'
                        value={values.userName}
                        keyboardType='default'
                        logic={!errors.userName}
                        styles=''
                    />

                    <FormInput
                        placeholder='Email'
                        onChangeText={handleChange('email')}
                        textContentType='emailAddress'
                        value={values.email}
                        keyboardType='email-address'
                        logic={!errors.email}
                        styles=''
                    />

                    <FormInput
                        placeholder='Password'
                        onChangeText={handleChange('password')}
                        textContentType='password'
                        value={values.password}
                        secureTextEntry
                        logic={!errors.password}
                        styles=''
                    />

                    <FormInput
                        placeholder='Confirm Password'
                        onChangeText={handleChange('confirmPassword')}
                        textContentType='password'
                        value={values.confirmPassword}
                        secureTextEntry
                        styles=''
                    />
                    <TouchableOpacity>
                        <Text style={tw`ml-auto text-blue-900 underline font-bold`}>Terms & Conditions<Text style={tw`no-underline text-[#d3d3d3]`}> are accepted on account creation</Text></Text>
                    </TouchableOpacity>

                    <Button
                        title={
                            'Create Account'
                        }
                        disabled={
                            !(isValid && (values.confirmPassword === values.password))
                        }
                        style={
                            `py-4 rounded-xl bg-black 
                            ${(isValid && values.password === values.confirmPassword)
                                ? 'opacity-100'
                                : 'opacity-50'
                            } 
                        `}
                        onPress={() => handleSubmit(values)}
                    />

                    <Text style={tw`mx-auto mt-3 text-base`}>Already have an account?
                        <Text style={tw`text-blue-900 font-bold`} onPress={() => navigation.navigate('Login')}> Log In</Text>
                    </Text>
                </View>
            )}
        </Formik>
    )
}

export default RegisterForm