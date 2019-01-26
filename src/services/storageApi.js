import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/firebase-storage'

export default class StorageApi {
  static uploadFile(folder, file, callback) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${folder}/${+(new Date())}-${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
      (snapshot) => {

        console.log('Upload is ' + snapshot + '% done');

      },(error) => {

         console.log('Some error occured while uploading data:', error)
      
      }, () => {
        console.log("Upload completed successfully");
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          callback(downloadURL);
        });
    });
  }
}