import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Likes } from "../types";

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

export {
    handleLike
};
