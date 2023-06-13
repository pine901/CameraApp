import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyD9EDDVo75V55CaaI1N9MBLKUfr7eu0J1s",
    authDomain: "https://timelapse-116-default-rtdb.firebaseio.com",
    projectId: "timelapse-116",
    storageBucket: "timelapse-116.appspot.com",

};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db) {
    const citiesCol = collection(db, 'User');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log("cityList: ---------------");
    console.log(cityList);
    return cityList;
}

getCities(db);

module.exports = () => {

    const uploadImage = async (photo) => {
        const response = await fetch(photo.uri)
        const blob = response.blob()
        const filename = photo.uri.substring(photo.uri.lastIndexOf('/') + 1)
        var ref = db.storage().ref().child(filename).put(blob)
        try {
            await ref;
        } catch (e) {
            console.log(e)
        }
    }
    return { uploadImage }
}