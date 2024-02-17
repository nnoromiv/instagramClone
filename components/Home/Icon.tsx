import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { IconProps } from '../../types'

const Icon: React.FC<IconProps> = ({ navigation, style, urlSource, text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {
                text !== undefined &&
                <View style={tw`bg-[#FF3250] items-center p-1 rounded-full absolute z-101 left-[10px] bottom-[10px]`}>
                    <Text style={tw`text-white font-bold`}>{text}</Text>
                </View>
            }
            <Image
                style={tw`w-[24px] h-[24px] ${style}`}
                resizeMode='cover'
                source={{
                    uri: urlSource,
                }} />
        </TouchableOpacity>
    )
}

export default Icon