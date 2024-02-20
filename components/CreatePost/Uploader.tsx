import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../FormInput'
import { PROFILE_PICTURE } from '../../constant'
import { launchGallery, openCamera, uploadImage, userDocInformation } from '../../api'
import Button from '../Auth/Button'
import { CameraDevice, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import Header from './Header'
import { CreatePostUploaderProps, postSubmittedProps } from '../../types'
import { DocumentData, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import ModalNotification from '../ModalNotification'
import Loading from '../Loading'
import Icon from 'react-native-vector-icons/FontAwesome6'

const PostSchema = Yup.object().shape({
    caption: Yup.string().required("Write your caption").max(2200, 'Exceeded caption entries')
})

const Uploader: React.FC<CreatePostUploaderProps> = ({ navigation, paramPostType }) => {

    const [postType, setPostType] = useState(paramPostType)
    const [image, setImage] = useState<string | undefined>(PROFILE_PICTURE)
    const { hasPermission } = useCameraPermission()
    const [user, setUser] = useState<DocumentData | null>(null)
    let device: CameraDevice | undefined;

    const [modal, setModal] = useState({
        status: '',
        visible: false,
        message: ''
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await userDocInformation()

                if (result !== null) {
                    setUser(result)
                }

            } catch (error) {
                console.error(error)
            }
        }

        fetchUser()
    }, [])

    const handleSubmit = ({ postType, image, caption }: postSubmittedProps) => {
        if (caption === '') return setModal({ status: "notification", visible: true, message: 'Please add a caption' })
        if (user !== null && image !== undefined) {
            try {
                const handleImage = async () => {
                    const result = await uploadImage(image)

                    if (result !== undefined && result.status === 200) {
                        addDoc(
                            collection(db, 'users', user.data.email, postType), {
                            imageUrl: [{
                                image: result.data
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
                            setModal({ status: "success", visible: true, message: `Success: ${postType} Added` })
                        ))
                    }

                }
                handleImage()
            } catch (error) {
                setModal({ status: "error", visible: true, message: `Error: Error while adding ${postType}` })
            }
        } else {
            setModal({ status: "error", visible: true, message: `Error: Not Permitted` })
        }


    }

    const timeoutId = setTimeout(() => {
        setModal({ status: '', visible: false, message: '' })
        clearTimeout(timeoutId);
    }, 7000);

    if (hasPermission) {
        device = useCameraDevice('back')
    }


    const handleOpenCamera = async () => {
        try {
            const result = await openCamera()

            if (result) {
                if (result.didCancel) {
                    setModal({ status: "notification", visible: true, message: `Cancelled` })
                } else if (result.errorMessage !== undefined) {
                    setModal({ status: "notification", visible: true, message: `No picture detected` })
                } else if (result.assets !== undefined) {
                    setImage(result.assets[0].uri)
                }
            }
        } catch (error) {
            setModal({ status: "error", visible: true, message: `Error: Handler Error - Try Again` })
        }
    }

    const handleGallery = async () => {
        try {
            const result = await launchGallery()

            if (result) {
                if (result.didCancel) {
                    setModal({ status: "notification", visible: true, message: `Cancelled` })
                } else if (result.errorMessage !== undefined) {
                    setModal({ status: "notification", visible: true, message: `No picture detected` })
                } else if (result.assets !== undefined) {
                    setImage(result.assets[0].uri)
                }
            }

        } catch (error) {
            setModal({ status: "error", visible: true, message: `Error: Handler Error - Try Again` })
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
                    {({ handleChange, values, isValid, errors, isSubmitting }) => (
                        <>
                            <Loading load={isSubmitting} />
                            <ModalNotification
                                status={modal.status}
                                visible={modal.visible}
                                children={
                                    <Text style={tw`text-white font-bold`}>
                                        {modal.message}
                                    </Text>
                                }
                            />
                            <Header navigation={navigation} addPostOnPress={() => handleSubmit({
                                postType: postType, image: image, caption: values.caption
                            })} />

                            <TouchableOpacity onPress={handleOpenCamera}>
                                <Image
                                    source={{
                                        uri: image
                                    }}
                                    style={tw`w-full h-[500px] bg-[#d3d3d3] rounded-b-lg`}
                                    resizeMode='cover'
                                />
                            </TouchableOpacity>

                            <View style={tw`flex-row px-3 mt-2 justify-between`} >
                                <Icon name='trash' size={20} color={'red'} onPress={() => setImage(PROFILE_PICTURE)} />
                                <TouchableOpacity onPress={() => handleGallery()}>
                                    <Text style={tw`text-blue-900 font-bold underline ml-auto`}>Select from gallery</Text>
                                </TouchableOpacity>
                            </View>

                            <FormInput
                                onChangeText={handleChange('caption')}
                                placeholder='Write a caption'
                                styles='bg-white text-black mx-3 border-b-[1px]'
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