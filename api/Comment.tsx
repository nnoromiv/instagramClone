import { updateDoc, doc, arrayUnion, query, collection, where, limit, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const handleComment = (comment: string, postOwner: string, postId: string) => {
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.email) {
        updateDoc(doc(db, 'users', postOwner, 'Post', postId), {
            comments: arrayUnion({
                email: currentUser.email,
                comment: comment,
                commentedAt: new Date()
            })
        });
    } else {
        console.error('No user logged in.');
    }
};

const commenterDocInformation = async (email: string) => {
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

export {
    handleComment,
    commenterDocInformation,
    allPostComments
}