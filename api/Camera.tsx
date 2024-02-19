import * as ImagePicker from 'react-native-image-picker'

let options : ImagePicker.OptionsCommon = {
    mediaType: 'mixed',           
    includeBase64: true,
    presentationStyle: 'pageSheet',
    videoQuality: 'high',
    quality: 1
}

const openCamera = async () => {

    const result = await ImagePicker.launchCamera(options)

    return result
};

const launchGallery = async () => {

    const result = await ImagePicker.launchImageLibrary(options)

    return result
};


export {
    openCamera,
    launchGallery
}