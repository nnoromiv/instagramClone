import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import Button from './Button'
import { getRandomPicture } from '../../api'
import { AuthProps } from '../../types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase'

const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required().min(2, 'Not long enough'),
    confirmPassword: Yup.string().required().min(2, 'Not long enough'),
})

const RegisterForm = ({ navigation }: any) => {

    const [loading, setLoading] = useState<boolean>(true)

    const getProfile = async () => {
        try {
            const result = await getRandomPicture()

            if(result !== undefined){
                return result.results[0].picture.large
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handleSubmit = async (i: AuthProps) => {
        setLoading(!loading)
        try {
            const result = await createUserWithEmailAndPassword(auth, i.email, i.password)
            if(result.user.email !== null){
                await setDoc(
                    doc(db, 'users', result.user.email),{
                        _uid: result.user.uid,
                        username: i.userName,
                        email: i.email,
                        profilePicture: await getProfile()
                    }
                ).then(
                    () => Alert.alert(
                            'Account Created',
                            'Login to continue'
                        )
                )
            }
        } catch (error) {
            Alert.alert(
                'Error',
                'An error occurred attempting to Create Account'
            )
        }
        setLoading(true)  
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
            {({ handleChange, values, isValid, errors }) => (
                <View style={tw`w-full px-3 gap-6 mt-6`}>
                    
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
                            loading ? 'Create Account' : 'Creating...'
                        } 
                        disabled={
                            loading ? !(isValid && (values.confirmPassword === values.password)) : !loading
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