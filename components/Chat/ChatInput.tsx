import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import tw from '../../tailwind'
import { Formik } from 'formik'
import FormInput from '../FormInput'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ChatInputProps } from '../../types'
import { Timestamp, addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const ChatInput: React.FC<ChatInputProps> = ({ userInformation, item }) => {

    const handleSubmit = async (i: any, { resetForm }: any) => {
        if (userInformation !== null && item !== null) {
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
                            styles={`bg-[#d3d3d3] border-b-[1] border-white text-black 
                                ${values.message === '' ? 'w-[97]' : 'w-[87]'}`}
                            textContentType='name'
                            value={values.message}
                            keyboardType='twitter'
                            isMessage
                        />

                        {
                            values.message !== '' &&
                            <TouchableOpacity onPress={() => handleSubmit(values, { resetForm })}>
                                <Icon name='send' size={30} color={'white'} style={tw`mt-3 bg-black rounded-full p-2`} />
                            </TouchableOpacity>
                        }
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default ChatInput