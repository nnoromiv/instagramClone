import React from 'react'
import { Dimensions, Modal, View } from 'react-native'
import { ModalNotificationProps } from '../types'
import tw from '../tailwind'
import Icon, {} from 'react-native-vector-icons/FontAwesome6'

const { height } = Dimensions.get('screen')


const ModalNotification: React.FC<ModalNotificationProps> = ({ visible, children, status }) => {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={tw` ${
                status === 'error' ?
                'bg-red-900' :
                status === 'success' ?
                'bg-green-900' :
                'bg-[#d3d3d3]'
            } mx-4 mb-auto flex-row mt-20 px-6 justify-center gap-4 items-center rounded-xl h-[${height / 50}]`}>
                {
                    status === 'error' ?
                    <Icon name='question' size={30} color={'red'}/>
                    :
                    status === 'success' ?
                    <Icon name='dizzy' size={30} color={'green'}/>
                    :
                    <Icon name='ghost' size={30} color={'white'}/>
                }
                {children}
            </View>
        </Modal>
    )
}

export default ModalNotification