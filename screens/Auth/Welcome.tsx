import React from 'react'
import { Linking, SafeAreaView, Text, View } from 'react-native'
import tw from '../../tailwind'
import { Button } from '../../components'

const Welcome = ({ navigation }: any) => {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`px-3 gap-4 flex justify-center items-center m-auto`}>
                <Text style={tw`font-bold text-black text-3xl mb-2`}>Welcome by NNOROMIV</Text>
                <Text style={tw`font-light text-black text-base`}>Begin editing page</Text>
                {/* Example Usage of Custom Button */}
                <Button title='Visit Author' style={`px-6 py-2`} onPress={() => Linking.openURL('https://github.com/nnoromiv')} />
            </View>
        </SafeAreaView>
    )
}

export default Welcome