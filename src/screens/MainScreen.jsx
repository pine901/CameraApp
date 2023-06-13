import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Camera } from 'expo-camera'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useCallback } from 'react';
import { initializeApp } from "firebase/app";
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';

//When developing admin dashboard 
// import { getDatabase } from 'firebase/database';
// import * as Battery from 'expo-battery';
// import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD9EDDVo75V55CaaI1N9MBLKUfr7eu0J1s",
  authDomain: "https://timelapse-116-default-rtdb.firebaseio.com",
  projectId: "timelapse-116",
  storageBucket: "timelapse-116.appspot.com",
};

const app = initializeApp(firebaseConfig);

let camera = Camera

const uploadImage = async (photo, location, cameraID) => {

  const storage = getStorage(app);
  const uri = photo.uri

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  let curTime = new Date();
  let year = curTime.getFullYear();
  let month = curTime.getMonth() + 1;
  let day = curTime.getDate();
  let hour = curTime.getHours();
  let minute = curTime.getMinutes();

  let savePath = "Projects" + "/" + location + "/" + cameraID + "/" + year + "/" + month + "/" + day + "/";

  let fileName = year + "_" + month + "_" + day + "_" + hour + "_" + minute + ".jpg";

  // TODO: UUID @savePath + fileName
  const storageRef = ref(storage, savePath + fileName);

  uploadBytes(storageRef, blob)
    .then(async (snapshot) => {
      console.log('Photo uploaded successfully.');

      //if upload success, then you have to check local storage and have to upload failed photos.

      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);

      files.forEach(async function (file) {

        //get blob
        const newBlob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", FileSystem.documentDirectory + file, true);
          xhr.send(null);
        });
        uploadBytes(storageRef, newBlob)
        
        //Then , delete this file.
        await FileSystem.deleteAsync(FileSystem.documentDirectory + file);
      });
    })
    .catch(async (error) => {

      //if upload failed, then you have to save in local storage.
      await FileSystem.moveAsync({
        from: uri,
        to: FileSystem.documentDirectory + fileName,
      });

    });
}

export default function MainScreen({ navigation, route }) {
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')


  const params = route.params.params;
  const location = params.location;
  const cameraID = params.cameraID;

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status !== 'granted') {
      Alert.alert('Access denied')
    }
  }

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        __takePicture();
      }, 2000);  // Give the rest time for preparing and allowing 

      return () => clearInterval(interval);
    }, [])
  );

  __startCamera();

  const __takePicture = async () => {

    const photo = await camera.takePictureAsync()

    //while developping admin dashboard
    // sendBatteryAlert();

    await uploadImage(photo, location, cameraID);
    navigation.navigate("WaitingScreen", {"params": params});
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: '100%'
        }}
      >
          <Camera
          type={cameraType}
          flashMode={flashMode}
          style={{ flex: 1 }}
          ref={(r) => {
            camera = r
          }}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
              </View>
            </View>
          </View>
        </Camera>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
