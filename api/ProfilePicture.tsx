import { RANDOM_PHOTO } from "@env"

const getRandomPicture = async () => {
    const result = await fetch(RANDOM_PHOTO)
    return result.json()
}


export {
    getRandomPicture
}