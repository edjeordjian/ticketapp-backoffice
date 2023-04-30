import {firebaseStorage} from './FirebaseService';

import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

function getFileSizeAndWidth(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const width = this.width;
                const height = this.height;
                resolve({ width, height });
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

const uploadFile = async (file, name) => {
    const fileRef = ref(firebaseStorage, name);

    return uploadBytes(fileRef, file)
        .then(async () => {
            const url = await getDownloadURL(fileRef);
            console.log(`Uploaded to firebase: ${url}`);
            return url;
        });
}

export {
    uploadFile, getFileSizeAndWidth
};
