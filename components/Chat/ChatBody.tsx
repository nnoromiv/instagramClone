import React from 'react'
import { Text, View } from 'react-native'
import tw from '../../tailwind'
import { ChatBodyProps } from '../../types'
import Animated, { FadeIn } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'

const ChatBody: React.FC<ChatBodyProps> = ({picture, name, body, time, user}) => {
  return (
    <Animated.View
        entering={FadeIn.delay(100).duration(1000).springify()}
        style={tw`mx-2`}>
        <FastImage
            source={{
                uri: picture,
                priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={tw`w-[40px] h-[40px] mb-2 rounded-full ${user === 'user' ? 'ml-auto mt-2' : ''}`}
        />
        <View style={tw`bg-[#f1f1f1] px-5 py-3 rounded-xl`}>
            <Text style={tw`font-bold text-black ${user === 'user' ? 'ml-auto' : ''}`}>{name}</Text>
            <Text style={tw`text-black font-normal ${user === 'user' ? 'ml-auto' : ''}`}>
                {body}
            </Text>
        </View>
        <Text style={tw`text-[#d3d3d3] font-bold mt-1 mr-5 ${user === 'user' ? 'ml-3' : 'ml-auto'}`}>{time}</Text>
    </Animated.View>
  )
}

export default ChatBody