import React from 'react'
import { SafeAreaView, View } from 'react-native'
import tw from '../../tailwind'
import { Button, Logo } from '../../components'

const Welcome = ({ navigation }: any) => {
    return (
        <SafeAreaView>
            <View
                style={tw`w-full h-full px-3 flex justify-center items-center`}
            >

                <Logo styles='' />
                <View 
                    style={tw`w-full flex gap-4 justify-evenly mt-30 `}
                >
                    <Button title='Login' style={`px-15 py-4`} onPress={() => navigation.navigate('Login')} />
                    <Button title='Create Account' style={`px-15 py-4 opacity-80`} onPress={() => navigation.navigate('Register')} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome