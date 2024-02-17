import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import tw from '../../tailwind'
import Card from '../Post/Card'
import { PostProps } from '../../types'
import { useLoader } from '../../hooks'
import Loading from '../Loading'
import { toSentenceCase } from '../../api'


const Post: React.FC<PostProps> = ({post, handleModal, setPostInfo}) => {
  
  const { load, handleLoader } = useLoader()
  

  useEffect(() => {
    if(post === null){
      handleLoader()
    }
  },[])

  return (
    <View style={tw`mt-3 flex`}>
      {
        post === null ?
        <Loading load={load} />
        :
        post.map((item, index) => (
          <View key={index}>
            <Card
            imageUrl={item.profilePicture}
            userName={toSentenceCase(item.username)}
            numberOfLikes={item.likes.length}
            caption={item.caption}
            postImage={post[index].imageUrl[0].image}
            numberOfComments={item.comments.length}
            likes={item.likes}
            postOwner={item.ownerEmail}
            postId={post[index].id}
            handleModal={handleModal}
            setPostInfo={setPostInfo}
          />
          </View>
        ))
      }
    </View>
  )
}

export default Post