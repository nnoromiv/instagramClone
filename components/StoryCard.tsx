import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import tw from '../tailwind'
import { StoryCardProps } from '../types'
import Animated, { FadeInRight } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'


const StoryCard: React.FC<StoryCardProps> = ({ navigation, imageUrl, storyType, name, onPress}) => {
    return (

            <Animated.View
             entering={FadeInRight.delay(200).duration(4000).springify()}
             style={tw`mr-4`}
            >
                <TouchableOpacity onPress={onPress}>                   
                    <FastImage
                        source={
                            {
                                uri: imageUrl,
                                priority: FastImage.priority.high
                            }
                        }
                        style={
                            tw`
                            rounded-full
                            w-[70px] h-[70px]
                            `
                        }
                        resizeMode={FastImage.resizeMode.cover}
                    >
                    </FastImage>
                </TouchableOpacity>
                {
                    storyType === 'user' &&
                    <TouchableOpacity 
                    style={tw`absolute bg-blue-800 top-12 right-0 rounded-full`} 
                    onPress={() => navigation.navigate('CreatePost', { paramPostType : 'Story' })}>
                        <Text style={tw`w-[18px] h-[18px] items-center text-white text-center`}>+</Text>
                    </TouchableOpacity>
                }
                {
                    <Text style={tw`text-center font-bold text-black`}>
                        {
                        name !== undefined ? name.length > 11 ?
                            name.slice(0, 9) + '...' :
                            name
                            :
                            'Anonymous'
                        }
                    </Text>
                }
            </Animated.View>
    )
}

export default StoryCard