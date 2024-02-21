import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native'
import tw from '../tailwind'
import { CommentsProps } from '../types'
import { Loading } from '.'
import { useLoader } from '../hooks'
import { commenterDocInformation, toSentenceCase } from '../api'
import Animated, { FadeInDown } from 'react-native-reanimated'
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('screen')

const Comments: React.FC<CommentsProps> = ({ isModal, handleModal, comment }) => {

  const { load } = useLoader()
  const [comments, setComments] = useState<any[] | undefined>()

  useEffect(() => {
    if (comment !== undefined) {
      Promise.all(comment.comments.map(async (item: any) => {
        try {
          const result = await commenterDocInformation(item.email);
          return result ? { commenter: result.data, comment: item } : null;
        } catch (error) {
          console.error(error);
          return null;
        }
      })).then((commentData) => {
        const filteredCommentData = commentData.filter((data) => data !== null);
        setComments(filteredCommentData);
      }).catch((error) => {
        console.error('Error fetching commenter data:', error);
      });
    }
  }, [comment, load]);
  

  const exitModal = () => {
    handleModal()
    setComments([])
  }


  return (
    comments === undefined ?
      <Loading load={load} />
      :
      comments.length > 0 ?
        <Modal
          visible={isModal}
          transparent
          animationType='slide'
          onRequestClose={handleModal}
          style={tw``}
        >
          <View style={tw`bg-white rounded-t-3xl p-5 h-[${height / 4.5}] w-[${width / 4}] absolute bottom-0`}>
            <Pressable onPress={exitModal} style={tw`self-center rounded-full h-[5] w-[20] bg-red-600`}>
              <Text style={tw`text-white text-center`}>exit</Text>
            </Pressable>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                comments.map((item: any, index: number) => (
                  <Animated.View
                    entering={FadeInDown.delay(100).duration(100).springify()}
                    style={tw`mt-4`} 
                    key={index}
                  >
                    <View style={tw`flex-row gap-6 items-center`}>
                      <FastImage 
                        source={{ 
                          uri: item.commenter.profilePicture,
                          priority: FastImage.priority.high
                        }} 
                        resizeMode={FastImage.resizeMode.cover}
                        style={tw`w-[70px] my-3 h-[70px] rounded-full`} 
                      />
                      <View style={tw`gap-2`}>
                        <Text style={tw`text-black font-bold text-base`}>{toSentenceCase(item.commenter.username)}</Text>
                        <Text style={tw`text-black`}>{item.comment.comment}</Text>
                      </View>
                    </View>
                    <View style={tw`self-center rounded-full h-[1px] w-[100] bg-[#d3d3d3]`}></View>
                  </Animated.View>
                ))
              }
            </ScrollView>
          </View>
        </Modal>
        :
        <Modal
          visible={isModal}
          transparent
          animationType='slide'
          onRequestClose={handleModal}
          style={tw``}
        >
          <View style={tw`bg-white rounded-t-3xl p-5 h-[${height / 4.5}] w-[${width / 4}] absolute bottom-0`}>
            <Pressable onPress={handleModal} style={tw`self-center rounded-full h-[5] w-[20] bg-red-600`}>
              <Text style={tw`text-white text-center`}>exit</Text>
            </Pressable>
            <Text style={tw`font-bold text-black self-center my-auto`}>No Comments</Text>
          </View>
        </Modal>
  )
}

export default Comments