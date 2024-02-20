import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Likes } from "../types";

const handleLike = (likes: Likes[], postOwner: string, postId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
        const likeStatus = likes.some(like => like.email === currentUser.email);
        if (!likeStatus) {
            updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
                likes: arrayUnion({ 
                    email: currentUser.email,
                    like: true
                })
            });
        } else {
            updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
                likes: arrayRemove({ 
                    email: currentUser.email,
                    like: true
                })
            });
        }
    } else {
        console.error('No user logged in.');
    }

    return currentUser?.email
};

const getPostLikes = async(postOwner: string, postId: string) => {

    const q = query(
        collection(db, 'users', postOwner, 'Post', postId),
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const messageInfo = querySnapshot.docs.map(doc => (
        doc.data()
    ));

    return messageInfo
};

export {
    handleLike,
    getPostLikes
};
