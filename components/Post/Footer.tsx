import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Icon from '../Home/Icon'
import { COMMENT, LIKE, BOOKMARK, SHARE, LIKE_FILLED } from '../../constant'
import tw from '../../tailwind'
import { FooterProps } from '../../types'
import { allPostComments, getPostLikes, handleLike } from '../../api'
import { User } from 'firebase/auth'
import { auth } from '../../firebase'
import { DocumentData } from 'firebase/firestore'


const Footer: React.FC<FooterProps> = ({ navigation, post, likes, postOwner, postId, setPostInfo, handleModal }) => {

  const [like, setLike] = useState(false)
  const [email, setLikeEmail] = useState(auth.currentUser?.email)

  const Like = () => {
    try {
      setLike(!like)
      handleLike(likes, postOwner, postId)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      setLikeEmail(auth.currentUser?.email)
    }
    fetchData()
  }, [auth.currentUser?.email])

  function Comment() {
    handleModal()
    const fetchData = async () => {
      const result = await allPostComments(postOwner, postId)

      if (result) {
        setPostInfo(result.data)
      }
    }

    fetchData()
  }

  return (
    <View style={tw`mt-3 px-3 flex-row justify-between`}>
      <View style={tw`flex-row gap-3`}>
        <Icon navigation={navigation} urlSource={
          likes.length > 0 && likes.some(like => like.email === email && like.like === true) ? LIKE_FILLED : LIKE
        } style='' onPress={() => Like()} key={postId} />
        <Icon navigation={navigation} urlSource={COMMENT} style='' onPress={Comment} />
        <Icon navigation={navigation} urlSource={SHARE} style='' />
      </View>

      <Icon navigation={navigation} urlSource={BOOKMARK} style='' />
    </View>
  )
}

export default Footer