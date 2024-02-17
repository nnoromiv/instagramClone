import React, { useEffect, useState } from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { PROFILE_PICTURE } from '../../constant'
import { launchGallery, openCamera, userDocInformation } from '../../api'
import Button from '../Auth/Button'
import { CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import Header from './Header'
import { CreatePostUploaderProps, postSubmittedProps } from '../../types'
import { DocumentData, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import validUrl from 'valid-url'

const PostSchema = Yup.object().shape({
    caption: Yup.string().required("Write your caption").max(2200, 'Exceeded caption entries')
})

const Uploader: React.FC<CreatePostUploaderProps> = ({ navigation, paramPostType }) => {
 
    const [postType, setPostType] = useState(paramPostType)
    const [image, setImage] = useState<string | undefined>(PROFILE_PICTURE)
    const { hasPermission } = useCameraPermission()
    const [user, setUser] = useState<DocumentData | null>(null)
    let device: CameraDevice | undefined;

    useEffect(() => {
        const fetchUser = async() => {
            try {
                    const result = await userDocInformation()

                    if(result !== null){
                        setUser(result)
                    }
            
            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    },[])

    const handleSubmit = ({ postType, image, caption }: postSubmittedProps) => {
        if(caption === '') return Alert.alert('Caption Error', 'Please add a caption')
        if(user !== null && image !== undefined) {
            try {
                const handler = addDoc(collection(db, 'users', user.data.email, postType),{
                    imageUrl: [{
                        image: validUrl.isUri(image)
                    }],
                    caption: caption,
                    ownerEmail: user.data.email,
                    username: user.data.username,
                    profilePicture: user.data.profilePicture,
                    _uid: user.data._uid,
                    createdAt: serverTimestamp(),
                    likes: [],
                    comments: []
                }).then(() => (
                    Alert.alert(
                        `${postType} added`,
                        'Update has been done'
                    )
                )).finally(
                    () => navigation.goBack()
                )
    
                return handler
            } catch (error) {
                Alert.alert('Error', 'An Error has Occurred')
            }
        } else {
            Alert.alert(
                'Error',
                "You're not permitted to do this"
            )
        }
    }

    if (hasPermission) {
        device = useCameraDevice('back')
    }


    const handleOpenCamera = async () => {
        try {
            const result = await openCamera()

            if (result) {
                if (result.didCancel) {
                    return
                } else if (result.errorMessage !== undefined) {
                    Alert.alert('Error', 'Error while loading picture')
                } else if (result.assets !== undefined) {
                    setImage(result.assets[0].uri)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleGallery = async () => {
        try {
            const result = await launchGallery()

            if (result) {
                if (result.didCancel) {
                    return
                } else if (result.errorMessage !== undefined) {
                    Alert.alert('Error', 'Error while loading picture')
                } else if (result.assets !== undefined) {
                    setImage(result.assets[0].uri)
                }
            }

        } catch (error) {
            console.error(error)
        }
    }


    if (device === undefined || device === null) {
        return <View style={tw`px-3`}>
            <Text style={tw`text-center text-black mt-20 font-bold`}>Give Camera Permission</Text>
            <Button title='Back' style={`mt-5`} onPress={() => navigation.goBack()} />
        </View>
    }
    return (
        <>
            <View style={tw`h-full`}>
                <Formik
                    initialValues={{
                        caption: ''
                    }}
                    onSubmit={() => undefined}
                    validateOnMount
                    validationSchema={PostSchema}
                >
                    {({ handleChange, values, isValid, errors }) => (
                        <>
                        <Header navigation={navigation} addPostOnPress={() => handleSubmit(
                            {
                                postType: postType, image: image, caption: values.caption
                            }
                        )} />

                            <TouchableOpacity onPress={handleOpenCamera}>
                                <Image
                                    source={{
                                        uri: image
                                    }}
                                    style={tw`w-full h-[500px] bg-black rounded-b-lg`}
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleGallery()}>
                                <Text style={tw`text-blue-900 font-bold underline mt-2 ml-auto mr-3`}>Select from gallery</Text>
                            </TouchableOpacity>

                            <FormInput
                                onChangeText={handleChange('caption')}
                                placeholder='Write a caption'
                                styles='bg-white mx-3 border-b-[1px]'
                                textContentType='name'
                                value={values.caption}
                            />

                            <Text style={tw`m-auto mt-2 text-green-900 font-bold`}>{
                                !isValid ? errors.caption : ''
                            }</Text>
                        </>
                    )}
                </Formik>
                <View style={tw`px-3 mt-6 flex-row mx-auto gap-3`}>
                    <Button title='Story' onPress={() => setPostType('Story')} style={`${postType === 'Story' ? 'bg-black' : 'bg-[#d3d3d3] opacity-40'} px-4 py-1`} />
                    <Button title='Post' onPress={() => setPostType('Post')} style={`${postType === 'Post' ? 'bg-black' : 'bg-[#d3d3d3] opacity-40'} px-4 py-1`} />
                </View>
            </View>
        </>
    )
}

export default Uploader