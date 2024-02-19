import { auth } from "../firebase"

const logOut = async () => {
    try {
        await auth.signOut()
    } catch (error) {
        console.log(error)
    }
}

export {
    logOut
}