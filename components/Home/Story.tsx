import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import tw from '../../tailwind'
import StoryCard from '../StoryCard'
import { PROFILE_PICTURE } from '../../constant'
import { StoryProps } from '../../types'
import { auth } from '../../firebase'

const OTHERS = [
  {
    imageUrl: PROFILE_PICTURE,
    name: 'Jackie Zhang',
    story: [
      {
        image: PROFILE_PICTURE
      },
      {
        image: PROFILE_PICTURE
      }
    ]
  },
  {
    imageUrl: PROFILE_PICTURE,
    name: 'Jane Doe',
    story: [
      {
        image: PROFILE_PICTURE
      },
      {
        image: PROFILE_PICTURE
      }
    ]
  }
]

const Story: React.FC<StoryProps> = ({ navigation, profilePicture, story }) => {
  return (
    <View style={tw`mt-3 mx-3`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          story !== null &&
          story[0].ownerEmail === auth.currentUser?.email &&
          <StoryCard
            id={story[0]._uid}
            navigation={navigation}
            imageUrl={profilePicture}
            storyType='user'
            name='Your Story'
            onPress={() => navigation.navigate('Story', {
              name: 'YOUR STORY',
              story: story[0].imageUrl
            })}
          />
        }
        {
          story !== null &&
          story[0].ownerEmail !== auth.currentUser?.email &&
          <StoryCard
            id={story[0]._uid}
            navigation={navigation}
            imageUrl={profilePicture}
            storyType='others'
            name={story[0].username}
            onPress={() => navigation.navigate('Story', {
              name: story[0].username,
              story: story[0].imageUrl
            })}
          />
        }

      </ScrollView>
    </View>
  )
}

export default Story