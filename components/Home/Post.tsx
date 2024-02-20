import React, { useEffect, useState } from 'react'
import {  Text, View } from 'react-native'
import tw from '../../tailwind'
import Card from '../Post/Card'
import { PostProps } from '../../types'
import Loading from '../Loading'
import { toSentenceCase } from '../../api'


const Post: React.FC<PostProps> = ({post, handleModal, setPostInfo}) => {
  
  const [ load, setLoad ] = useState(true)
  

  useEffect(() => {

    // Set the timeout and store the timeout ID
const timeoutId = setTimeout(() => {
  // Code to be executed after 20 seconds
  setLoad(false)

  // Clear the timeout after it executes
  clearTimeout(timeoutId);
}, 5000); // 20 seconds in milliseconds


  },[])

  return (
    <View style={tw`mt-3 flex`}>
      {
        post === null && !load && <Text style={tw`text-black font-bold m-auto`}>Getting Post</Text>
      }
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
            postImage={post[index].imageUrl[0].image.image.url}
            numberOfComments={item.comments.length}
            likes={item.likes}
            postOwner={item.ownerEmail}
            postId={post[index].id}
            handleModal={handleModal}
            setPostInfo={setPostInfo}
            post={post}
          />
          </View>
        ))
      }
    </View>
  )
}

export default Post