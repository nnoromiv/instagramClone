import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Logo from '../Logo'
import tw from '../../tailwind'
import { LIKE, MESSENGER, OTHER_LOGO, POST } from '../../constant'
import Icon from './Icon'
import { HeaderProps } from '../../types'
import { logOut } from '../../api'
import ModalNotification from '../ModalNotification'
import Animated, { SlideInRight } from 'react-native-reanimated'


const Header: React.FC<HeaderProps> = ({ navigation }) => {

    const [modal, setModal] = useState({
        status: '',
        visible: false,
        message: ''
    })

    const handlePress = () => {
        setModal({ status: "notification", visible: true, message: `Hold for 3 Seconds to Logout` })

        const timeoutId = setTimeout(() => {
            setModal({ status: '', visible: false, message: '' })
            clearTimeout(timeoutId);
        }, 3000);
    }

    function openPost(navigation: any) {
        navigation.navigate('CreatePost')
    }

    return (
        <View style={tw`flex bg-[#f5f5f5] flex-row justify-between items-center relative z-1 py-2 px-3`}>
            <Logo image={OTHER_LOGO} styles='h-[10] w-[30]' onPress={() => handlePress()}  onLongPress={() => logOut()}/>
            <ModalNotification
                status={modal.status}
                visible={modal.visible}
                children={
                    <Text style={tw`text-white font-bold`}>
                        {modal.message}
                    </Text>
                } />
            <Animated.View
             entering={SlideInRight.delay(2000).duration(2000).springify()}
             style={tw`flex flex-row gap-3`}
            >
                <Icon urlSource={POST} navigation={navigation} onPress={() => openPost(navigation)} style='' />
                <Icon urlSource={LIKE} navigation={navigation} style='' />
                <Icon urlSource={MESSENGER} navigation={navigation} style=''onPress={() => navigation.navigate('Messenger')}/>
            </Animated.View>
        </View>
    )
}

export default Header