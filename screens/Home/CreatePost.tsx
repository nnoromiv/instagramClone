import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Create } from '../../components'
import tw from '../../tailwind'

const CreatePost = ({navigation, route} : any) => {
    const { paramPostType = 'Post' } = route?.params || {}

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Create navigation={navigation} paramPostType={paramPostType} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePost