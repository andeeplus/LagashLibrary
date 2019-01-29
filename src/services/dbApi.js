import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let db;
export default class DatabaseApi {

  static initDatabase() {
    var config = {
      apiKey: "AIzaSyB0q4nBf-HygLdY93x2YDEcXmKeBcaC0B8",
      authDomain: "lagash-library.firebaseapp.com",
      databaseURL: "https://lagash-library.firebaseio.com",
      projectId: "lagash-library",
      storageBucket: "lagash-library.appspot.com",
      messagingSenderId: "353626050596"
    };
    
    firebase.initializeApp(config);

    db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true
    });
  }

  static async getDocumentById(collectionName, id){
    let resultDoc = null;
    
    try {
      const doc = await db.collection(collectionName).doc(id.toString()).get();
      if (doc.exists) {
        resultDoc = {
          id: doc.id,
          ...doc.data()
        }
      }
    } catch (error) {
			console.log("​DatabaseApi -> getDocumentById -> error", error)
    }

    return resultDoc;
  }

  static async createDocumentWithId(collectionName, document, id){
    return await DatabaseApi.updateDocument(collectionName, document, id);
  }

  static async updateDocument(collectionName, document, id){
    let success = true;
    
    //TODO: ojo con guardar el id del documento

    try {
      await db.collection(collectionName).doc(id).set(document, { merge: true });
    } catch (error) {
      success = false;
			console.log("​DatabaseApi -> updateDocument -> error", error)
    }

    return success;
  }

  static async deleteDocumentWithId(collection, docID){
    db.collection(collection).doc(docID).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  static async deleteDocumentFieldWithId(collection, docID, field){
    db.collection(collection).doc(docID).update({
      [field]: firebase.firestore.FieldValue.delete()
  })}

  static async updateItemArrayIntoDoc(collection, docId, fieldid, itemToAdd){
    db.collection(collection).doc(docId).update({
    [fieldid]: firebase.firestore.FieldValue.arrayUnion(itemToAdd)
  });
  }

  static async removeItemArrayIntoDoc(collection, docId, fieldid, itemToRemove){
    db.collection(collection).doc(docId).update({
    [fieldid]: firebase.firestore.FieldValue.arrayRemove(itemToRemove)
  });
  }

  static async removeItemFromDoc(collection, docId, fieldid){
    db.collection(collection).doc(docId).update({
    [fieldid]: firebase.firestore.FieldValue.delete()
  });
  }



  static async addDocument(collectionName, document){
    let success = false;
    
    try {
      const docRef = await db.collection(collectionName).add(document);
      if(docRef.id) {
				console.log("​DatabaseApi -> addDocument -> docRef.id", docRef.id)
        success = true;
      }
      
    } catch (error) {
			console.log("​DatabaseApi -> }catch -> error", error)
    }

    return success;
  }

  static async addDocumentWithID(collectionName, document, docID){
    let success = false;
    
    try {
      const docRef = await db.collection(collectionName).doc(docID).set(document);
      if(docRef) {
				console.log("​DatabaseApi -> addDocument -> docRef.id", docRef)
        success = true;
      }
      
    } catch (error) {
			console.log("​DatabaseApi -> }catch -> error", error)
    }

    return success;
  }

  static async getRealtimeDocument(collectionName, filterName, filterValue, callback){
    db.collection(collectionName).where(filterName, "==", filterValue)
      .onSnapshot((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({id:doc.id, ...doc.data()});
        });
        callback(result);
    });
  }

  static async getDocument(collectionName, filterName, filterValue){
    const collectionRef = db.collection(collectionName);
    const query = collectionRef.where(filterName, "==", filterValue);
    let result = [];

    const querySnapshot = await query.get();
    querySnapshot.forEach((doc) => {
      result.push({id:doc.id,...doc.data()}) 
    });

    return result;
  }

  static async getDocumentDateNow24(collectionName, dateNow, callback){
    const date24 = (dateNow - 8,64e+7)
    
    db.collection(collectionName).where('dateNow', "<", dateNow).where('dateNow', ">", date24)
    .onSnapshot((querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({id:doc.id, ...doc.data()});
      });
      callback(result);
  });
  }

  static async getCollection(collectionName) {
    const result = [];

    try {
      const querySnapshot = await db.collection(collectionName).get();
      querySnapshot.forEach((doc) => {
        const databaseObject = doc.data();
        databaseObject.id = doc.id;
        result.push(databaseObject);
      });

    } catch (error) {
			console.log("​DatabaseApi -> catch -> error", error)
    }

    return result;
  }
}