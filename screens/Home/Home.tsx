import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { BottomTab, Header, Post, Story } from '../../components'
import tw from '../../tailwind'
import { PROFILE_PICTURE } from '../../constant'
import { allPost, userDocInformation, allStory } from '../../api'
import { DocumentData } from 'firebase/firestore'
import Comments from '../Comments/Comments'
import { useCommentModal, useSinglePostInformation } from '../../hooks'

const Home = ({ navigation }: any) => {
  const [userImage, setUserImage] = useState(PROFILE_PICTURE)
  const [post, setPost] = useState<DocumentData[] | null>(null)
  const [story, setStory] = useState<DocumentData[] | null>(null)
  const { isModal, handleModal, setIsModal  } = useCommentModal()
  const {postInfo, setPostInfo} = useSinglePostInformation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user information
        const userResult = await userDocInformation();
        if (userResult !== null) {
          setUserImage(userResult.data.profilePicture);
        }
  
        // Fetch post data
        const postResult = await allPost();
        if (postResult) {
          setPost(postResult);
        }

        // Fetch story data
        const storyResult = await allStory();
        if (storyResult) {
          setStory(storyResult);
        }
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData(); // Call the fetchData function

    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  
  }, []);  

  const Comment = () => {
    handleModal()
  }

  return (
    <SafeAreaView style={tw`bg-white w-full h-full`}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView stickyHeaderHiddenOnScroll stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <Story navigation={navigation} profilePicture={userImage} story={story} />
        <Post post={post} handleModal={() => handleModal()} setPostInfo={setPostInfo} setIsModal={setIsModal} />
        <Comments comment={postInfo} isModal={isModal} handleModal={Comment} />
      </ScrollView>
      <BottomTab navigation={navigation} profilePicture={userImage} />
    </SafeAreaView>
  )
}

export default Home