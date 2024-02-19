import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import Button from './Button'
import { AuthProps } from '../../types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import { Loading, ModalNotification } from '../index'

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required().min(2, 'Not long enough')
})

const LoginForm = ({ navigation }: any) => {

    const [load, setLoad] = useState(false)

    const [ modal, setModal ] = useState({
        status: '',
        visible: false,
        message: ''
    })


    const handleSubmit = async (i: AuthProps) => {
        setLoad(true)
        try {
            const result = await signInWithEmailAndPassword(auth, i.email, i.password)
            if (result.user.email === i.email) {
                setModal({ status: "success", visible: true, message: 'Successful - Logged In' })
                navigation.navigate('HomeStack', { screen: 'Home' })
            }
        } catch (error: any) {
            if (error.message.includes('auth/invalid-credential')) {
                setModal({ status: "error", visible: true, message: 'Error: Invalid Credentials' })
            }
            else if (error.message.includes('auth/too-many-requests')) {
                setModal({ status: "error", visible: true, message: 'Error: Account temporarily block, Try again later' })
            } 
            else if (error.message.includes('auth/network-request-failed')) {
                setModal({ status: "error", visible: true, message: 'Error: Network Error' })
            }
            else {
                console.log(error)
                setModal({ status: "error", visible: true, message: 'Error: Unknown Error' })
            }

        }

        const timeoutId = setTimeout(() => {
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
                email: '',
                password: ''
            }}
            validationSchema={LoginFormSchema}
        >
            {({ handleChange, values, isValid, errors }) => (
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
                    <TouchableOpacity>
                        <Text style={tw`ml-auto text-blue-900 underline font-bold`}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title={
                            'Login'
                        }
                        disabled={!isValid}
                        style={`py-4 rounded-xl bg-black ${isValid ? 'opacity-100' : 'opacity-50'}`}
                        onPress={() => handleSubmit(values)}
                    />

                    <Text style={tw`mx-auto mt-3 text-base text-black`}>Don&apos;t have an account?
                        <Text style={tw`text-blue-900 font-bold`} onPress={() => navigation.navigate('Register')}> Sign Up</Text>
                    </Text>
                </View>
            )}
        </Formik>
    )
}

export default LoginForm