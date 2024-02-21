import React from 'react'
import { Text, View } from 'react-native'
import tw from '../../tailwind'
import { PostHeaderProps } from '../../types'
import FastImage from 'react-native-fast-image'

const Header: React.FC<PostHeaderProps> = ({ imageUrl, userName}) => {
  return (
    <View style={tw`w-[100%] mt-6 px-3 flex-row justify-between absolute z-1`}>
        <View style={tw`flex-row items-center gap-4`}>
            <FastImage
                source={{
                  uri: imageUrl,
                  priority: FastImage.priority.high
                }}
                style={tw`w-[50px]  h-[50px] rounded-full `}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={tw`font-bold text-[#d3d3d3]`}>{
                userName === '' ?
                'Unknown User' :
                userName
            }</Text>
        </View>
        <Text style={tw`text-4xl text-[#d3d3d3] font-bold`}>...</Text>
    </View>
  )
}

export default Header