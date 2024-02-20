import React from 'react'
import { Image, Text, View } from 'react-native'
import tw from '../../tailwind'
import { MessengerHeaderProps } from '../../types'
import { toSentenceCase } from '../../api'

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ navigation, currentUser, profilePicture}) => {
  return (
    <View style={tw`flex-row items-center justify-between px-3 mt-3`}>
        <Text style={tw`text-black font-bold text-lg`}>{toSentenceCase(currentUser)}</Text>

        <Image 
            source={{
                uri: profilePicture
            }}
            resizeMode='cover'
            style={tw`h-[50px] w-[50px] rounded-full border-[1px] border-black`}
        />
    </View>
  )
}

export default MessengerHeader