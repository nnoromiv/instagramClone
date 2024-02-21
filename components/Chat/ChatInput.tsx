import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { Formik } from 'formik'
import FormInput from '../FormInput'
import { ChatInputProps } from '../../types'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import Icon from '../Home/Icon'
import { SEND } from '../../constant'

const { width } = Dimensions.get('screen')

const ChatInput: React.FC<ChatInputProps> = ({ userInformation, item }) => {

    const handleSubmit = async (i: any, { resetForm }: any) => {
        if (userInformation !== null && item !== null && i.message !== '') {
            try {
                await addDoc(
                    collection(db, 'messages'), {
                    senderUid: userInformation._uid,
                    senderEmail: userInformation.email,
                    receiverUid: item._uid,
                    receiverEmail: item.email,
                    body: i.message,
                    sent: new Date()
                })
            } catch (error) {
                console.log(error)
            } finally {
                resetForm()
            }
        }
    }

    return (
        <View style={tw`px-3 mb-2 absolute bottom-0`}>
            <Formik
                validateOnMount
                onSubmit={i => console.log(i)}
                initialValues={{
                    message: ''
                }}
            >
                {({ handleChange, values, resetForm }) => (
                    <View style={tw`w-full flex-row items-center gap-1`}>
                        <FormInput
                            onChangeText={handleChange('message')}
                            placeholder=''
                            styles={`bg-[#d3d3d3] border-b-[1] border-white text-black w-[${width/4.5}]`}
                            textContentType='name'
                            value={values.message}
                            keyboardType='twitter'
                            isMessage
                        />

                        <Icon style='mt-3 ' navigation={null} onPress={() => handleSubmit(values, { resetForm })} urlSource={SEND} />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default ChatInput