import { addDoc, 
    arrayRemove, 
    arrayUnion, 
    collection, 
    collectionGroup, 
    deleteDoc, 
    doc, 
    getDoc,
    getDocs, 
    onSnapshot, 
    orderBy, 
    query, 
    setDoc, 
    updateDoc, 
    where, 
  } from 'firebase/firestore'; 
import { db } from './firebase';


const USER_INVENTORY_COL = 'user_inventory'; //Recipes, Food Items, Reciepts etc
const USER_FOOD_ITEMS_COL = 'user_food_items';

const FOOD_ITEMS = 'food_items';

//----Test Function

export const addManualAvailableItem = async() => {

    await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
      });
    } 

export const getTestDoc = async() => {
    const docRef = await getDoc(doc(db, "cities", "LA"));
    if (docRef.exists()) {
        console.log("Document data:", docRef.data());
      }
}

//----Recipes----

export const addUserFoodItems = async (uid, userFoodItems) => {
    const docRef = doc(db, USER_INVENTORY_COL, uid);
    const subColRef = collection(docRef, USER_FOOD_ITEMS_COL);
    await addDoc(subColRef, userFoodItems);
}

// one time query 
export const getAllUserFoodItems = async (uid) => {
    const docRef = doc(db, USER_INVENTORY_COL, uid);
    //get all documents in USER_FOOD_ITEMS collection
    const querySnapshot = await getDocs(collection(docRef, USER_FOOD_ITEMS_COL));

    const userFoodItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
    }));

    return userFoodItems;

}

// set up real time listener for user specific food items
export const listenForUserFoodItemsUpdates = (uid, callback) => {
    const docRef = doc(db, USER_INVENTORY_COL, uid);
    const foodItemsCollection = collection(docRef, USER_FOOD_ITEMS_COL);
    
    const unsubscribe = onSnapshot(foodItemsCollection, (querySnapshot) => {
        const updatedFoodItems = [];
        querySnapshot.forEach((doc) => {
            updatedFoodItems.push({
                id: doc.id,
                data: doc.data(),
            });
        });
        callback(updatedFoodItems);
    });

    return unsubscribe;
}

// set up real time listner for specified user food itemType


// 

export const updateUserFoodItem = async (id, userFoodItem) => {
    await updateDoc(doc(db, 'recipes', id), recipe);
}

export const deleteUserFoodItems = async (uid, userFoodItems) => {
    await deleteDoc(doc(db, 'recipes', id));
}
