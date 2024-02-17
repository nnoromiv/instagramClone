import React from 'react'
import { SafeAreaView } from 'react-native'
import { Logo, RegisterForm } from '../../components'
import tw from '../../tailwind'

const Register = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`flex h-full bg-white justify-center `}>
            <Logo styles='' />
            <RegisterForm navigation={navigation} />
        </SafeAreaView>
    )
}

export default Register