import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; // Assuming './firebase' exports the Firebase app instance
import { AuthStack, HomeStack } from './Stacks';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import onAuthStateChanged from 'firebase/auth'

const Screen: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        currentUser ?

            <HomeStack />

            :
            <AuthStack />
    )
};

export default Screen;
