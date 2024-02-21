import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import tw from '../../tailwind'
import { toSentenceCase } from '../../api'
import { MessageCardProps } from '../../types'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'

const MessageCard: React.FC<MessageCardProps> = ({ navigation, onPress, messengerProfilePicture, messengerName }) => {
  return (
    <TouchableOpacity 
      style={tw`border-b-[1px] mb-3 border-[#d3d3d3]`}
      onPress={onPress}
    >
      <Animated.View 
        entering={SlideInLeft.delay(200).duration(1000).springify()}
        style={tw`flex-row gap-4 items-center mb-5`}>
        <FastImage 
          source={{
            uri: messengerProfilePicture,
            priority: FastImage.priority.high
          }}        

          resizeMode={FastImage.resizeMode.cover}

          style={tw`w-[70px] h-[70px] rounded-full`}
        />
        <Text style={tw`font-bold text-black text-lg`}>{toSentenceCase(messengerName)}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default MessageCard