import React from 'react'
import { TouchableOpacity } from 'react-native'
import { LOGO } from '../constant'
import tw from '../tailwind'
import { LogoProps } from '../types'
import FastImage from 'react-native-fast-image'
import Animated, { FlipInEasyX } from 'react-native-reanimated'

const Logo: React.FC<LogoProps> = ({ styles, image, onPress, onLongPress }) => {
    return (
        <Animated.View
            entering={FlipInEasyX.delay(200).duration(1000).springify().damping(30).mass(5)}
        >
            <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
                {
                    image ?
                    <FastImage 
                        source={
                            image                            
                        } 
                        
                        style={tw`h-[100px] w-[100px] self-center ${styles}`} 
                    />
                    :
                    <FastImage 
                        source={{ 
                            uri: LOGO,
                            priority: FastImage.priority.high
                        }} 
                        resizeMode={FastImage.resizeMode.cover} 
                        style={tw`h-[100px] w-[100px] self-center ${styles}`} 
                    />
                }
            </TouchableOpacity>
        </Animated.View>
    )
}

export default Logo
