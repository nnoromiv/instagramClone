import { arrayRemove, arrayUnion, collection, collectionGroup, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore"
import { auth, db } from "../firebase"
import { Likes } from "../types"
import { Alert } from "react-native";

function toSentenceCase(str: string) {
    // Split the string into words
    const words = str.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a sentence
    return capitalizedWords.join(' ');
}


const getRandomPicture = async () => {
    const result = await fetch('https://randomuser.me/api')
    return result.json()
}

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

const allPost = async () => {

    const q = query(
        collectionGroup(db, 'Post'),
        orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null; // Return null if no matching document found

    const userInfo = querySnapshot.docs.map(doc => (
        { id: doc.id, ...doc.data() }
    ))

    return userInfo
}

const allStory = async () => {

    const q = query(
        collectionGroup(db, 'Story')
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null; // Return null if no matching document found

    const userInfo = querySnapshot.docs.map(doc => (
        doc.data()
    ));

    return userInfo
}

const handleLike = (likes: Likes[], postOwner: string, postId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
        const likeStatus = likes.some(like => like.email === currentUser.email);
        if (!likeStatus) {
            updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
                likes: arrayUnion({ email: currentUser.email })
            });
        } else {
            updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
                likes: arrayRemove({ email: currentUser.email })
            });
        }
    } else {
        console.error('No user logged in.');
    }
};

const handleComment = (comment: string, postOwner: string, postId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
        updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
            comments: arrayUnion({
                email: currentUser.email,
                comment: comment,
            })
        });
    } else {
        console.error('No user logged in.');
    }
};

const commenterDocInformation = async (email : string) => {
    const q = query(
        collection(db, 'users'),
        where('email', '==', email),
        limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null; // Return null if no matching document found

    const userInfo = querySnapshot.docs.map(doc => ({
        data: doc.data()
    }));

    return userInfo[0]
}

const allPostComments = async (postOwner: string, postId: string) => {
    
    const q = doc(db, 'users', postOwner, 'Post', postId)

    const querySnapshot = await getDoc(q);
    if (!(querySnapshot.exists())) return null; // Return null if no matching document found

    const postInfo = {
        data: querySnapshot.data()
    };

    return postInfo
}

const logOut = async() => {
    try {
        await auth.signOut()
    } catch (error) {
        console.log(error)
    }
}

export {
    getRandomPicture,
    userInformation,
    userDocInformation,
    allPost,
    allStory,
    handleLike,
    handleComment,
    commenterDocInformation,
    allPostComments,
    toSentenceCase,
    logOut
}