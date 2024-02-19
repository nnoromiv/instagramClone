import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { LOGO } from '../constant'
import tw from '../tailwind'
import { LogoProps } from '../types'

const Logo: React.FC<LogoProps> = ({ styles, image, onPress, onLongPress }) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
                {
                    image ?
                    <Image source={image} style={tw`h-[100px] w-[100px] self-center ${styles}`} />
                    :
                    <Image source={{ uri: LOGO }} resizeMode='contain' style={tw`h-[100px] w-[100px] self-center ${styles}`} />
                }
            </TouchableOpacity>
        </View>
    )
}

export default Logo
