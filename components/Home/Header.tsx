import React, { useState } from 'react'
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native'
import Logo from '../Logo'
import tw from '../../tailwind'
import { LIKE, MESSENGER, OTHER_LOGO, POST } from '../../constant'
import Icon from './Icon'
import { HeaderProps } from '../../types'
import { logOut } from '../../api'

const { height } = Dimensions.get('screen')

const Header: React.FC<HeaderProps> = ({ navigation }) => {

    const [load, setLoad] = useState(false)

    const handleLogOut = () => {
        logOut()
        setLoad(false)
    }

    const SignOutModal = () => (
        <Modal visible={load} transparent>
            <View style={tw`bg-white mx-4 my-auto items-center justify-center rounded-xl h-[${height / 25}]`}>
                <Text style={tw`text-black font-bold`}>Are you sure you want to Log out?</Text>
                <View style={tw`h-[1px] w-full bg-black mt-10`}></View>
                <View style={tw`flex-row mt-3 w-[100%]`}>
                    <TouchableOpacity style={tw`w-[50%] border-r-[1px]`} onPress={() => setLoad(false)} >
                        <Text style={tw`text-center font-bold text-xl text-green-900`}>Stay in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`w-[50%] border-l-[1px]`} onPress={() => handleLogOut()}>
                        <Text style={tw`text-center font-bold text-xl text-red-600`}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

    function openPost(navigation: any) {
        navigation.navigate('CreatePost')
    }

    return (
        <View style={tw`flex bg-[#f5f5f5] flex-row justify-between items-center relative z-1 py-2 px-3`}>
            <Logo image={OTHER_LOGO} styles='h-[10] w-[30]' onPress={() => setLoad(true)}/>
            <SignOutModal />
            <View style={tw`flex flex-row gap-3`}>
                <Icon urlSource={POST} navigation={navigation} onPress={() => openPost(navigation)} style='' />
                <Icon urlSource={LIKE} navigation={navigation} style='' />
                <Icon urlSource={MESSENGER} navigation={navigation} style='' text={11} />
            </View>
        </View>
    )
}

export default Header