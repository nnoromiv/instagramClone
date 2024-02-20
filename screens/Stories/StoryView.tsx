import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { CLOSE } from '../../constant'
import { Icon } from '../../components'
import { toSentenceCase } from '../../api'
import Carousel from 'react-native-reanimated-carousel'

const { height, width } = Dimensions.get('screen')

const StoryView = ({ navigation, route }: any) => {
    const { name, story } = route?.params || {
        name: '',
        story: null
    }
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
        scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
      }, [index]);




    return (
        <View style={tw``}>
            <View style={tw`px-3 mt-5 z-10 m-3 flex-row items-center justify-between`}>
                <Icon
                    urlSource={CLOSE}
                    navigation={true}
                    style='bg-red-600 rounded-lg'
                    onPress={() => navigation.goBack()}
                />

                {
                    name !== undefined &&
                    <Text style={tw`font-bold text-black text-base`}>
                        {
                            name.length > 11 ?
                                toSentenceCase(name.slice(0, 9)) + '...' :
                                toSentenceCase(name)
                        }
                    </Text>
                }
            </View>

            {/* {
                story !== null &&
                <Carousel
                loop
                width={width/4}
                height={height/4}
                autoPlay={true}
                data={story}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                key={index}
                renderItem={(item: any ) => (
                    <View style={tw`relative`} >
                            <Image
                                source={
                                    {
                                        uri: item.imageUrl
                                    }
                                }
                                style={
                                    tw`w-[${width / 4}] h-[${height / 4}] `
                                }
                                resizeMode='cover'
                            >
                            </Image>
                            <Text style={tw`bg-white w-full font-bold self-center text-center bottom-50 text-black`}>{item.caption}</Text>
                        </View>
                    )
                }
            />
            } */}

            <ScrollView
                ref={scrollViewRef}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw``}
            >
                {
                    story.map((item: any, id: number) => (
                        <Pressable style={tw`relative`} key={id} onPress={() => setIndex(prevIndex => (prevIndex + 1) % story.length) } >

                            <Image
                                source={{ uri: item.imageUrl }}
                                style={tw`w-[${width / 4}] h-[${height / 4}]`}
                                resizeMode='cover'
                            />
                            <Text style={tw`bg-white w-full font-bold self-center text-center bottom-50 text-black`}>
                                {item.caption}
                            </Text>
                        </Pressable>
                ))}
            </ScrollView>



        </View>
    )
}

export default StoryView