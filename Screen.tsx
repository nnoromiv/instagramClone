import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { AuthStack, HomeStack } from './Stacks';
import { onAuthStateChanged, User } from 'firebase/auth';

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
