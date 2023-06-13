import React, { useCallback } from 'react';
import { TouchableWithoutFeedback, } from 'react-native';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';

const splashScreen = require("../../assets/logo.png");

export default function HomeScreen({ navigation }) {

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        navigation.navigate("SettingScreen")
      }, 2000);

      return () => clearInterval(interval);
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageLogo: {
      width: wp('100%'),
      height: hp('100%'),
      position: 'absolute',
      top: 0
    },
  });


  return (
    <TouchableWithoutFeedback>

      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image source={splashScreen} style={styles.imageLogo} resizeMode='contain' />
      </View>
    </TouchableWithoutFeedback>
  );
}


