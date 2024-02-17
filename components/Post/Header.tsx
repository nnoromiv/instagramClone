import React from 'react'
import { Image, Text, View } from 'react-native'
import tw from '../../tailwind'
import { PostHeaderProps } from '../../types'

const Header: React.FC<PostHeaderProps> = ({ imageUrl, userName}) => {
  return (
    <View style={tw`w-[100%] mt-6 px-3 flex-row justify-between absolute z-1`}>
        <View style={tw`flex-row items-center gap-4`}>
            <Image
                source={{
                  uri: imageUrl
                }}
                style={tw`w-[50px]  h-[50px] rounded-full `}
            ></Image>
            <Text style={tw`font-bold text-black`}>{
                userName === '' ?
                'Unknown User' :
                userName
            }</Text>
        </View>
        <Text style={tw`text-4xl text-black font-bold`}>...</Text>
    </View>
  )
}

export default Header