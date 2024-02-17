import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native'
import tw from '../../tailwind'
import { CLOSE } from '../../constant'
import { Icon } from '../../components'
import { toSentenceCase } from '../../api'

const { height, width } = Dimensions.get('screen')

const StoryView = ({ navigation, route }: any) => {
    const { name, story } = route?.params || {}
    const [index, setIndex] = useState(0)
    const [iteration, setIteration] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIndex(prevIndex => (prevIndex + 1) % story.length)
            setIteration(prevIteration => prevIteration + 1);
        }, 3000);

        iteration >= story.length && (
            clearTimeout(timeoutId),
            navigation.goBack()
        )

        return () => clearTimeout(timeoutId);
      }, [index, iteration]);
    
      useEffect(() => {
        scrollViewRef.current?.scrollTo({ x: index * (width/4), animated: true });
      }, [index]);
    
    

    return (
        <View style={tw``}>

            <View style={tw` w-[100] px-3 mt-5 absolute z-10 flex-row items-center justify-between`}>
                <Icon
                    urlSource={CLOSE}
                    navigation={true}
                    style='bg-red-600 rounded-lg'
                    onPress={() => navigation.goBack()}
                />

                <Text style={tw`font-bold text-black text-base w-[40]`}>
                    {
                        name.length > 11 ?
                            toSentenceCase(name.slice(0, 9))+ '...' :
                            toSentenceCase(name)
                    }
                </Text>
            </View>

            <ScrollView ref={scrollViewRef} pagingEnabled horizontal showsHorizontalScrollIndicator={false} style={tw`absolute overflow-hidden`}>
                {
                    story.map((item: any, id: number) => (
                        <Pressable style={tw`relative`} key={index+id} onPress={() => setIndex(prevIndex => (prevIndex + 1) % story.length) } >
                            <Image
                                source={
                                    {
                                        uri: item.image
                                    }
                                }
                                style={
                                    tw`w-[${width / 4}] h-[${height / 4}] `
                                }
                                resizeMode='cover'
                            >
                            </Image>
                            <Text style={tw`absolute hidden`}>{index}</Text>
                        </Pressable>
                    ))
                }
            </ScrollView>

        </View>
    )
}

export default StoryView