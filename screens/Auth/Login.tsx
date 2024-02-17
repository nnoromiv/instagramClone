import React from 'react'
import { SafeAreaView } from 'react-native'
import { LoginForm, Logo } from '../../components'
import tw from '../../tailwind'

const Login = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`flex h-full bg-white justify-center `}>
            <Logo styles='' />
            <LoginForm navigation={navigation} />
        </SafeAreaView>
    )
}

export default Login