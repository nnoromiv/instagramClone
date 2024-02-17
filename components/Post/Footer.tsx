import React, { useState } from 'react'
import { View } from 'react-native'
import Icon from '../Home/Icon'
import { COMMENT, LIKE, BOOKMARK, SHARE, LIKE_FILLED } from '../../constant'
import tw from '../../tailwind'
import { FooterProps } from '../../types'
import { allPostComments, handleLike } from '../../api'


const Footer: React.FC<FooterProps> = ({ navigation, likes, postOwner, postId, setPostInfo, handleModal }) => {

  const [liked, setLiked] = useState(false)

  const Like = () => {
    setLiked(!liked)
    handleLike(likes, postOwner, postId)
  }

  function Comment() {
    handleModal()
    const fetchData = async() => {
      const result = await allPostComments(postOwner, postId)

      if(result){
        setPostInfo(result.data)
      }
    }

    fetchData()
  }

  return (
    <View style={tw`mt-3 px-3 flex-row justify-between`}>
      <View style={tw`flex-row gap-3`}>
        <Icon navigation={navigation} urlSource={
          !liked ? LIKE : LIKE_FILLED
        } style='' onPress={() => Like()} key={postId} />
        <Icon navigation={navigation} urlSource={COMMENT} style='' onPress={Comment} />
        <Icon navigation={navigation} urlSource={SHARE} style='' />
      </View>

      <Icon navigation={navigation} urlSource={BOOKMARK} style='' />
    </View>
  )
}

export default Footer