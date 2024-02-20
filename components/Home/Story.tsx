import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import tw from '../../tailwind'
import StoryCard from '../StoryCard'
import { StoryProps } from '../../types'
import { auth } from '../../firebase'
import { toSentenceCase } from '../../api'
import { DocumentData } from 'firebase/firestore'


const Story: React.FC<StoryProps> = ({ navigation, profilePicture, story, mergedStory, currentUser }) => {

  const [userHasStory, setUserHasStory] = useState(false)
  const [otherUserHasStory, setOtherUserHasStory] = useState(false)
  const [userStories, setUserStories] = useState<DocumentData[] | null>()
  const [otherStories, setOtherStories] = useState<any[]>()


  useEffect(() => {
    const storyExists = () => {
      if (mergedStory !== null && mergedStory !== undefined && story !== null) {
        const userStoryExist = [mergedStory.find(item => item.ownerEmail === auth.currentUser?.email)]

        const userStory = story
          .filter(item => item.ownerEmail !== auth.currentUser?.email)
          .map(item => ({
            imageUrl: item.imageUrl[0].image.url,
            caption: item.caption
          }))

        setUserStories(userStory)

        const otherStoryExist = [mergedStory.find(item => item.ownerEmail !== auth.currentUser?.email)]

        const otherStory = story
          .filter(item => item.ownerEmail !== auth.currentUser?.email)
          .map(item => ({
            imageUrl: item.imageUrl[0].image.url,
            caption: item.caption
          }))


        setOtherStories(otherStory)

        if (userStoryExist.length > 0) {
          setUserHasStory(true)

        } else {
          setUserHasStory(false)
        }

        if (otherStoryExist.length > 0) {
          setOtherUserHasStory(true)

        } else {
          setOtherUserHasStory(false)
        }
      }
    }

    storyExists()
  }, [story])

  return (
    <View style={tw`mt-3 mx-3`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal
      >
        {
          mergedStory !== null && mergedStory !== undefined && story !== null &&
          <React.Fragment>
            {
              userHasStory ?
                <StoryCard
                  navigation={navigation}
                  imageUrl={profilePicture}
                  storyType='user'
                  name={toSentenceCase(currentUser)}
                  onPress={() => navigation.navigate('StoryView', {
                    name: currentUser,
                    story: userStories
                  })}
                />
                :
                <StoryCard
                  navigation={navigation}
                  imageUrl={profilePicture}
                  storyType='user'
                  name={toSentenceCase(currentUser)}
                />
            }

            {
              otherUserHasStory &&
              mergedStory.map((item, index) => (
                item.ownerEmail !== auth.currentUser?.email &&
                <StoryCard
                  key={index}
                  navigation={navigation}
                  imageUrl={item.profilePicture}
                  storyType='others'
                  name={toSentenceCase(item.username)}
                  onPress={() => navigation.navigate('StoryView', {
                    name: item.username,
                    story: otherStories
                  })}
                />
              ))

            }
          </React.Fragment>
        }
      </ScrollView>
    </View>
  )
}

export default Story