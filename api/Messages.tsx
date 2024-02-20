import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { userInformation } from "./User";
import { db } from "../firebase";

const messages = async () => {
    const user = await userInformation()
    if (!user) return null; // Return null if user is not available

    const q = query(
        collection(db, 'messages'),
        orderBy('sent')
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    const messageInfo = querySnapshot.docs.map(doc => (
        doc.data()
    ));

    return messageInfo
}


export {
    messages,
}