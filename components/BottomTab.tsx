import React, { useState } from 'react'
import { View } from 'react-native'
import tw from '../tailwind'
import Icon from './Home/Icon'
import { BOTTOM_TAB_ICONS } from '../constant'
import { BottomTabProps } from '../types'

const BottomTab: React.FC<BottomTabProps> = ({ navigation, profilePicture }) => {
    const [active, setActive] = useState<string>('Home')
    return (
        <View style={tw`flex bg-white flex-row justify-around items-center h-[50px]`}>
            {
                BOTTOM_TAB_ICONS.map((item, index) => (
                    <Icon
                        key={index}
                        navigation={navigation}
                        urlSource={
                            (item.name === 'Profile' && profilePicture !== '' && profilePicture !== undefined) ? 
                                profilePicture :  
                            (active === item.name ? item.active : item.inactive)
                          }
                          
                        style={`
                            ${item.name === 'Profile' ? 'rounded-full h-[30px] w-[30px]': ''}
                            ${item.name === 'Profile'&& active === 'Profile' ? 'border border-[2px] border-black' : ''}
                        `}
                        onPress={() => setActive(item.name)}
                    />
                ))
            }
        </View>
    )
}

export default BottomTab