import { format } from 'date-fns';
import { storage } from "./firebase";
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';

//emulator url
const BUCKET_URL = "http://127.0.0.1:9199/foodsaver-50899.appspot.com";
//const BUCKET_URL = "gs://foodsaver-50899.appspot.com/"

export async function uploadImage(image, uid){
    const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const bucket = `${BUCKET_URL}/images/${uid}/${formattedDate}.jpg`;
    //let firebase return errors
    await uploadBytes(ref(storage, bucket), image);
    return bucket;
}

 // Replaces existing image in storage and returns the storage bucket
export function replaceImage(image, bucket) {
    uploadBytes(ref(storage, bucket), image);
  }
  
 // Deletes existing image in storage
export function deleteImage(bucket) {
    deleteObject(ref(storage, bucket));
  }
  
 // Gets the download URL from the reference URL
export async function getDownloadURL(bucket) {
    return await getStorageDownloadURL(ref(storage, bucket));
  }

