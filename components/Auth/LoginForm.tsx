import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import Button from './Button'
import { AuthProps, ErrorProps } from '../../types'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required().min(2, 'Not long enough')
})

const LoginForm = ({ navigation }: any) => {

    const [loading, setLoading] = useState<boolean>(true)

    const handleSubmit = async (i: AuthProps) => {
        setLoading(!loading)
        try {
            const result = await signInWithEmailAndPassword(auth, i.email, i.password)
            if(result.user.email === i.email){
                navigation.navigate('HomeStack', {screen: 'Home'})
            }
        } catch (error : any) {
            if(error.message === 'Firebase: Error (auth/invalid-credential).'){
                Alert.alert(
                    'Error',
                    'Wrong Credentials'
                )
            }
            else {
                Alert.alert(
                    'Error',
                    'An error occurred attempting to Logging in'
                )
            }
        }
        setLoading(true)  
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
                            loading ? 'Login' : 'Logging...'
                        } 
                        disabled={loading ? !isValid : !loading} 
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