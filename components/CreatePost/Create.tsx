import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Uploader from './Uploader'
import { useCameraPermission } from 'react-native-vision-camera'
import { CreatePostCreateProps } from '../../types'
import ModalNotification from '../ModalNotification'
import tw from '../../tailwind'


const Create: React.FC<CreatePostCreateProps> = ({ navigation, paramPostType }: any) => {

  const [ modal, setModal ] = useState({
    status: '',
    visible: false,
    message: ''
})

  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
        .then(res => {
          if (!res) {
            setModal({ status: "notification", visible: true, message: 'Permission not granted - Change the setting from your phone' })
          } else {
            setModal({ status: "notification", visible: true, message: 'Permission granted' })
            navigation.goBack()
          }
        }).catch(err => console.error(err))
    }

    const timeoutId = setTimeout(() => {
      setModal({ status: '', visible: false, message: '' })
      clearTimeout(timeoutId);
    }, 5000);

  }, [hasPermission])


  return (
    <View>
      <ModalNotification
        status={modal.status}
        visible={modal.visible}
        children={
          <Text style={tw`text-white font-bold`}>
            {modal.message}
          </Text>
        }
      />
      <Uploader navigation={navigation} paramPostType={paramPostType} />
    </View>
  )
}

export default Create