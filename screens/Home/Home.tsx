import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { BottomTab, Header, Post, Story } from '../../components'
import tw from '../../tailwind'
import { PROFILE_PICTURE } from '../../constant'
import { allPost, userDocInformation, allStory, mergeStoryByUid } from '../../api'
import { DocumentData } from 'firebase/firestore'
import Comments from '../Comments/Comments'
import { useCommentModal, useSinglePostInformation } from '../../hooks'

const Home = ({ navigation }: any) => {
  const [userImage, setUserImage] = useState(PROFILE_PICTURE)
  const [post, setPost] = useState<DocumentData[] | null>(null)
  const [story, setStory] = useState<DocumentData[] | null>(null)
  const { isModal, handleModal, setIsModal  } = useCommentModal()
  const {postInfo, setPostInfo} = useSinglePostInformation()
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentUser, setCurrentUser] = useState('')

  const [mergedStory, setMergedStory] = useState<any[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user information
        const userResult = await userDocInformation();
        if (userResult !== null) {
          setUserImage(userResult.data.profilePicture);
          setCurrentUser(userResult.data.username)
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

        const result = mergeStoryByUid(storyResult)
        setMergedStory(result)
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  
  }, [refreshing]);  

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPost(null)
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const Comment = () => {
    handleModal()
  }

  return (
    <SafeAreaView style={tw`bg-white w-full h-full`}>
      <StatusBar backgroundColor={'#f5f5f5'} barStyle={'dark-content'} />
      <ScrollView 
        stickyHeaderHiddenOnScroll 
        stickyHeaderIndices={[0]} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        <Header navigation={navigation} />
        <Story navigation={navigation} profilePicture={userImage} story={story} mergedStory={mergedStory} currentUser={currentUser} />
        <Post post={post} handleModal={() => handleModal()} setPostInfo={setPostInfo} setIsModal={setIsModal} />
        <Comments comment={postInfo} isModal={isModal} handleModal={Comment} />
      </ScrollView>
      <BottomTab navigation={navigation} profilePicture={userImage} />
    </SafeAreaView>
  )
}

export default Home