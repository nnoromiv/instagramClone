import { API_KEY, BASE_URL } from "@env";

const blobToBase64 = (blob: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === "string" && reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
};


const uploadImage = async (filePath: any) => {
    let imageData: any | undefined

        const response = await fetch(filePath);

        const blob = await response.blob();

        const base64Data = await blobToBase64(blob);
        
        
        const url = `${BASE_URL}?key=${API_KEY}`;
        const formData = new FormData()
        formData.append('image', base64Data);


        const requestOptions : RequestInit = {
            method: 'POST',
            body: formData
        };

        await fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to upload image. Status: ${response.status}`);
                }
                return response.json();
            })
            .then( data => {
                imageData =  data
            })
            .catch(error => {
                return error
            });

    return imageData
};

export {
    uploadImage
}