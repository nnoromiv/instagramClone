import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { IconProps } from '../../types'
import FastImage from 'react-native-fast-image'

const Icon: React.FC<IconProps> = ({ navigation, style, urlSource, text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {
                text !== undefined &&
                <View style={tw`bg-[#FF3250] items-center p-1 rounded-full absolute z-101 left-[10px] bottom-[10px]`}>
                    <Text style={tw`text-white font-bold`}>{text}</Text>
                </View>
            }
            <FastImage
                style={tw`w-[24px] h-[24px] ${style}`}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                    uri: urlSource,
                    priority: FastImage.priority.high
                }} />
        </TouchableOpacity>
    )
}

export default Icon