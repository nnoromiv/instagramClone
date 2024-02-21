import React, { useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import tw from '../../tailwind'
import Header from './Header'
import { PostCardProps } from '../../types'
import { SEND } from '../../constant'
import Footer from './Footer'
import { Formik } from 'formik'
import FormInput from '../FormInput'
import Icon from '../Home/Icon'
import { handleComment } from '../../api'
import { useLoader } from '../../hooks'
import Loading from '../Loading'
import ModalNotification from '../ModalNotification'
import FastImage from 'react-native-fast-image'

const {width} = Dimensions.get('screen')

const Card: React.FC<PostCardProps> = ({
  imageUrl,
  userName,
  numberOfLikes,
  caption,
  navigation,
  postImage,
  numberOfComments,
  likes,
  postOwner,
  postId,
  handleModal,
  setPostInfo,
  post
}) => {

  const { load, setLoad } = useLoader()
  const [ modal, setModal ] = useState({
    status: '',
    visible: false,
    message: ''
})

  const handleSubmit = (i: any, { resetForm }: any) => {
    setLoad(true)
    try {
      if(i.comment !== ''){
        handleComment(i.comment, postOwner, postId)
      }
      resetForm()
    } catch (error) {
      console.log(error)
      setModal({ status: "error", visible: true, message: 'Error: Comment not added - Try Again' })
    }
    setLoad(false)
  }

  const timeoutId = setTimeout(() => {
    setModal({ status: '', visible: false, message: '' })
    clearTimeout(timeoutId);
}, 5000);

  return (
    <View style={tw`mt-1`}>
      <Header imageUrl={imageUrl} userName={userName} />

      <ModalNotification
        status={modal.status}
        visible={modal.visible}
        children={
          <Text style={tw`text-white font-bold`}>
            {modal.message}
          </Text>
        }
      />

      <View style={tw`w-full h-[600px] relative mt-3`}>
        <FastImage
          source={{
            uri: postImage,
            priority: FastImage.priority.high
          }}
          style={tw`h-full w-full`}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>

      <Footer navigation={navigation} post={post} handleModal={handleModal} setPostInfo={setPostInfo} likes={likes} postOwner={postOwner} postId={postId} />

      <Text style={tw`px-3 mt-2 text-sm text-black`}>
        {
          numberOfLikes === 0 ?
            'No Likes'
            :

            <Text style={tw`font-bold `}> {numberOfLikes} Likes</Text>
        }
      </Text>

      <Text style={tw`text-black px-3 mt-1 font-bold `}>{userName + ` `}
        <Text style={tw`font-normal`}>{
          caption.length >= 150 ?
            caption.slice(0, 149) + '...more' :
            caption
        }</Text>
      </Text>

      <View>
        <Text style={tw`px-3 mt-1 text-gray-700`}>
          {
            numberOfComments === 0 ?
              'No Comment'
              :
              ` View all ${numberOfComments} Comments`
          }
        </Text>
      </View>

      <Formik
        initialValues={{ comment: '' }}
        onSubmit={() => undefined}
      >
        {({ handleChange, values, resetForm }) => (

          <View style={tw`gap-4 mb-3 px-3 flex-row items-center justify-between`}>
            <Loading load={load} />
            <FormInput
              onChangeText={handleChange('comment')}
              placeholder='What are your thoughts..'
              styles={`bg-[#fff] border-b-[1] border-[#d3d3d3] text-black w-[${width/5}]`}
              textContentType='name'
              value={values.comment}
            />

                <Icon style='mt-6' navigation={navigation} onPress={() => handleSubmit(values, { resetForm })} urlSource={SEND} />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Card