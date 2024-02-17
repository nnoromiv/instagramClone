import React from 'react'
import { Alert, Image, Text, View } from 'react-native'
import tw from '../../tailwind'
import Header from './Header'
import { PostCardProps } from '../../types'
import { PROFILE, SEND } from '../../constant'
import Footer from './Footer'
import { Formik } from 'formik'
import FormInput from '../FormInput'
import Icon from '../Home/Icon'
import { handleComment } from '../../api'
import { useLoader } from '../../hooks'
import Loading from '../Loading'

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
  setPostInfo
}) => {

  const {load, setLoad} = useLoader()

  const handleSubmit = (i : any, { resetForm }: any) => { 
    setLoad(true) 
      try {
        handleComment(i.comment, postOwner, postId)
        resetForm()
      } catch (error) {
        Alert.alert('Error', 'An Error has Occurred')
      }
    setLoad(false)
  }

  return (
    <View style={tw`mt-1`}>
      <Header imageUrl={imageUrl} userName={userName} />

      <View style={tw`w-full h-[600px] relative mt-3`}>
        <Image
          source={{
            uri: postImage
          }}
          style={tw`h-full w-full`}
          resizeMode='cover'
        />
      </View>

      <Footer navigation={navigation} handleModal={handleModal} setPostInfo={setPostInfo} likes={likes} postOwner={postOwner} postId={postId}/>

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

             <View style={tw`flex-row items-center justify-between gap-4 mb-3 px-3`}>
              <Loading load={load}/>
              <FormInput
                onChangeText={handleChange('comment')}
                placeholder='What are your thoughts..'
                styles={`bg-[#fff] border-b-[1] border-[#d3d3d3] text-black 
                ${values.comment === "" ? 'w-[95]' : 'w-[70]'}`}
                textContentType='name'
                value={values.comment}
              />
              {
                values.comment === ''?
                  <></>
                :
                <Icon style='mt-6' navigation={navigation} onPress={() => handleSubmit(values, { resetForm })} urlSource={SEND}  />
              }
             </View>              
            )}
          </Formik>
    </View>
  )
}

export default Card