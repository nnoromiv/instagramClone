import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { MessengerProps } from '../../types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { userDocInformation, usersInformation } from '../../api';
import { PROFILE_PICTURE } from '@env';
import { Loading, MessageCard, MessengerHeader } from '../../components';
import tw from '../../tailwind';
import { DocumentData } from 'firebase/firestore';

const Messenger: React.FC<MessengerProps> = ({ navigation }) => {

  const [profilePicture, setProfilePicture] = useState(PROFILE_PICTURE)
  const [currentUser, setCurrentUser] = useState('')
  const [userInformation, setUserInformation] = useState<DocumentData | null>()
  const [currentUserId, setCurrentUserId] = useState('')
  const [allUsers, setAllUsers] = useState<DocumentData[] | null>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userDocInformation();
        const allUsers = await usersInformation()

        if (user !== null) {
          setProfilePicture(user.data.profilePicture);
          setCurrentUser(user.data.username)
          setCurrentUserId(user.data._uid)
          setUserInformation(user.data)
        }

        if (allUsers !== null) {
          setAllUsers(allUsers)
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <SafeAreaView>
      <View style={tw`mt-3`}>
        <MessengerHeader navigation={navigation} currentUser={currentUser} profilePicture={profilePicture} />
        {
          allUsers !== null && allUsers !== undefined ?
            <Text style={tw`text-black font-bold self-center`}>All Users</Text>
              :
              <Loading load={true} />
        }
        <ScrollView
          style={tw`px-3 mt-3 mb-20`}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical

        >
          {
            allUsers !== null && allUsers !== undefined &&
            allUsers.map((item: any, index: number) => (
              item._uid !== currentUserId &&
              <MessageCard
                key={index}
                navigation={navigation}
                messengerName={item.username}
                messengerProfilePicture={item.profilePicture}
                onPress={() => navigation.navigate('Chat', {
                  userInformation,
                  item
                })}
              />
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Messenger