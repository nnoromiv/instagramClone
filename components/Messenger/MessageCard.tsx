import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { toSentenceCase } from '../../api'
import { MessageCardProps } from '../../types'

const MessageCard: React.FC<MessageCardProps> = ({ navigation, onPress, messengerProfilePicture, messengerName }) => {
  return (
    <TouchableOpacity 
      style={tw`border-b-[1px] mb-3 border-[#d3d3d3]`}
      onPress={onPress}
    >
      <View style={tw`flex-row gap-4 items-center mb-5`}>
        <Image 
          source={{
            uri: messengerProfilePicture
          }}        

          resizeMode='cover'

          style={tw`w-[70px] h-[70px] rounded-full`}
        />
        <Text style={tw`font-bold text-black text-lg`}>{toSentenceCase(messengerName)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MessageCard