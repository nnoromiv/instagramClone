import React from 'react'
import { ScrollView, View } from 'react-native'
import tw from '../../tailwind'
import StoryCard from '../StoryCard'
import { StoryProps } from '../../types'
import { auth } from '../../firebase'
import { toSentenceCase } from '../../api'


const Story: React.FC<StoryProps> = ({ navigation, profilePicture, story, mergedStory, currentUser }) => {
  return (
    <View style={tw`mt-3 mx-3`}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
        mergedStory !== null && mergedStory !== undefined && story !== null &&
        <React.Fragment>
          {
          mergedStory.map((item: any, index: number) => {
            if (item.ownerEmail !== auth.currentUser?.email) {
              return (
                <StoryCard
                  key={index}
                  navigation={navigation}
                  imageUrl={profilePicture}
                  storyType='user'
                  name={toSentenceCase(currentUser)}
                />
              );
            } else {
              return null;
            }
          })

          }
          {
            mergedStory.map((item: any, index: number) => (
              item.ownerEmail === auth.currentUser?.email ?
              <StoryCard
                key={index}
                navigation={navigation}
                imageUrl={profilePicture}
                storyType='user'
                name={toSentenceCase(currentUser)}
                onPress={() => navigation.navigate('Story', {
                  name: item.username,
                  story: story
                })}
              />
              : <StoryCard
                  key={index}
                  navigation={navigation}
                  imageUrl={item.profilePicture}
                  storyType='others'
                  name={toSentenceCase(item.username)}
                  onPress={() => navigation.navigate('Story', {
                    name: item.username,
                    story: story
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