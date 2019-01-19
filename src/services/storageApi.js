import * as firebase from 'firebase'

export default class storageApi{
   static fileUploader(folder, file, callback){
    var storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${folder}/${file.name}`)
   }
}