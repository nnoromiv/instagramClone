import React from 'react'
import { Image, Text, Pressable, View, TouchableOpacity } from 'react-native'
import tw from '../tailwind'
import { StoryCardProps } from '../types'


const StoryCard: React.FC<StoryCardProps> = ({ navigation, id, imageUrl, storyType, name, onPress}) => {

    return (
            <View style={tw`mr-4`} key={id}>
                <Pressable onPress={onPress}>                   
                    <Image
                        source={
                            {
                                uri: imageUrl
                            }
                        }
                        style={
                            tw`
                            rounded-full
                            w-[70px] h-[70px]
                            `
                        }
                        resizeMode='cover'
                    >
                    </Image>
                </Pressable>
                {
                    storyType === 'user' &&
                    <TouchableOpacity 
                    style={tw`absolute bg-blue-800 top-12 right-0 rounded-full`} 
                    onPress={() => navigation.navigate('CreatePost', { paramPostType : 'Story' })}>
                        <Text style={tw`w-[18px] h-[18px] items-center text-white text-center`}>+</Text>
                    </TouchableOpacity>
                }
                {
                    <Text style={tw`text-center`}>
                        {
                        name.length > 11 ?
                            name.slice(0, 9) + '...' :
                            name
                        }
                    </Text>
                }
            </View>
    )
}

export default StoryCard