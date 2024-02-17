import React from 'react'
import { ImageBackground, View } from 'react-native'
import tw from '../tailwind'
import { BACKGROUND } from '../constant'

const Background = () => {
    return (
        <View>
            <ImageBackground style={tw`w-full h-full relative opacity-80`} source={BACKGROUND} resizeMode='cover' />
        </View>
    )
}

export default Background