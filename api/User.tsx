import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { auth, db } from "../firebase"

const userInformation = async () => {
    const user = auth.currentUser

    return user
}

const userDocInformation = async () => {
    const user = await userInformation()
    if (!user) return null; // Return null if user is not available

    const q = query(
        collection(db, 'users'),
        where('_uid', '==', user.uid),
        limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null; // Return null if no matching document found

    const userInfo = querySnapshot.docs.map(doc => ({
        data: doc.data()
    }));

    return userInfo[0]
}

const usersInformation = async () => {
    const q = query(
        collection(db, 'users'),
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null; // Return null if no matching document found

    const userInfo = querySnapshot.docs.map(doc => (
        doc.data()
    ));

    return userInfo
}

export {
    userInformation,
    userDocInformation,
    usersInformation
}