import { PROFILE_PICTURE } from "@env"

const getRandomPicture = async () => {
    const result = await fetch(PROFILE_PICTURE)
    return result.json()
}


export {
    getRandomPicture
}