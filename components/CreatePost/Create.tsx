import React, { useEffect } from 'react'
import { Alert, View } from 'react-native'
import Uploader from './Uploader'
import { useCameraPermission } from 'react-native-vision-camera'
import { CreatePostCreateProps } from '../../types'

const Create: React.FC<CreatePostCreateProps> = ({navigation, paramPostType } : any) => {

  const { hasPermission, requestPermission } = useCameraPermission()  

  useEffect(() => {
    if(!hasPermission){
      requestPermission()
      .then(res => {
        if(!res){
          Alert.alert('Permission not granted' ,'You can always change the setting from your phone settings')
        } else{
          Alert.alert('Permission Granted', 'Instagram can now take pictures and videos')
          navigation.goBack()
        }
      }).catch(err => console.error(err))
    }
  },[hasPermission])


  return (
    <View>
      <Uploader navigation={navigation} paramPostType={paramPostType} />
    </View>
  )
}

export default Create