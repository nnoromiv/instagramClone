import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, Text } from 'react-native'
import { ChatProps } from '../../types'
import { ChatBody, ChatInput, Loading, MessengerHeader, ModalNotification } from '../../components'
import tw from '../../tailwind'
import { formatDate, messages, toSentenceCase } from '../../api'
import { DocumentData } from 'firebase/firestore'
import { auth } from '../../firebase'

const Chat: React.FC<ChatProps> = ({ navigation, route }) => {

    const [load, setLoad] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [modal, setModal] = useState({
        status: '',
        visible: false,
        message: ''
    })

    const [message, setMessage] = useState<DocumentData[] | undefined>()


    const { userInformation, item } = route?.params || {
        userInformation: null,
        item: null
    }


    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await messages();

                if (result) {
                    const filteredMessages = result.filter((user: any) =>
                        (user.receiverUid === item._uid && user.senderUid === userInformation._uid) ||
                        (user.receiverUid === userInformation._uid && user.senderUid === item._uid)
                    );
                    setMessage((prev: any) => [...filteredMessages]);
                }


            } catch (error) {
                setModal({ status: "error", visible: true, message: `Error while loading your messages` })

                const timeoutId = setTimeout(() => {
                    setModal({ status: '', visible: false, message: '' })
                    clearTimeout(timeoutId);
                }, 3000);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, []);



    const timeoutId = setTimeout(() => {
        setLoad(false)
        clearTimeout(timeoutId);
    }, 1500);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, []);

    useEffect(() => {
    }, [item.username])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setMessage(undefined)
        setTimeout(() => {
          setRefreshing(false);
        }, 1500);
      }, []);

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <ModalNotification
                status={modal.status}
                visible={modal.visible}
                children={
                    <Text style={tw`text-white font-bold`}>
                        {modal.message}
                    </Text>
                } />
            <MessengerHeader navigation={navigation} currentUser={item.username} profilePicture={item.profilePicture} />
            <ScrollView
                ref={scrollViewRef}
                style={tw`mt-3 mb-20 relative`}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            >
                {

                    message && message.length > 0 ?
                        <React.Fragment>
                            <Text style={tw`text-[#d3d3d3] font-bold m-auto`}>Messages with {toSentenceCase(item.username)} are encrypted</Text>
                            {
                                message && message.length > 0 ? (
                                    message.map((user: any, index: number) => (
                                        user.senderEmail === auth.currentUser?.email ?
                                            <ChatBody
                                                key={`message-${index}`}
                                                picture={userInformation.profilePicture}
                                                name={toSentenceCase(userInformation.username)}
                                                time={formatDate(user?.sent?.seconds, user?.sent?.nanoseconds)} // Access nested properties
                                                body={toSentenceCase(user.body)}
                                                user='user'
                                            />
                                            :
                                            <ChatBody
                                                key={`message-${index}`}
                                                picture={item.profilePicture}
                                                name={toSentenceCase(item.username)}
                                                time={formatDate(user?.sent?.seconds, user?.sent?.nanoseconds)} // Access nested properties
                                                body={toSentenceCase(user.body)}
                                                user='other'
                                            />
                                    ))
                                ) : (
                                    <Text style={tw`text-black font-bold m-auto`}>Start Chatting with {toSentenceCase(item.username)}</Text>
                                )
                            }
                        </React.Fragment>
                        :
                        <Loading load={load} />
                }

            </ScrollView>
            <ChatInput userInformation={userInformation} item={item} />
        </SafeAreaView>
    )
}

export default Chat