import { collectionGroup, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

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

export {
    allStory
}