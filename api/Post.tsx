import { collectionGroup, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

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

export {
    allPost
}