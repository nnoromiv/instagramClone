import React from 'react'
import { ActivityIndicator, Dimensions, Modal, View } from 'react-native'
import tw from '../tailwind'
import { LoadingProps } from '../types'

const {height} = Dimensions.get('screen')

const Loading: React.FC<LoadingProps> = ({load}) => {
  return (
    <Modal visible={load} transparent>
        <View style={tw`my-auto items-center justify-center rounded-xl h-[${height/25}]`}>
            <ActivityIndicator animating color={'#000'} size={'large'}/>
        </View>
    </Modal>
  )
}

export default Loading