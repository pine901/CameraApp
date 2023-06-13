import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useState, useCallback } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';

// Camera Capture Interval
const CAPTUREINTERVAL = 300

export default function WaitingScreen({ navigation, route }) {

  useKeepAwake();

  const [waitingTime, setWaitingTime] = useState(CAPTUREINTERVAL)
  const [workState, setWorkState] = useState(false)

  const params = route.params.params;
  const startHours = params.startHours;
  const endHours = params.endHours;

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        updateState();
      }, 1000);

      return () => clearInterval(interval);
    }, [])
  );

  function ifInvalidTime() {
    let curTime = new Date();
    let week = curTime.getDay();

    if (!params.schedule[week]) return true;  //check if current week is working day

    let hour = curTime.getHours();

    if (hour < Number(startHours) || hour > Number(endHours)) return true;  //check if valid time

    return false;
  }

  function updateState() {

    if (ifInvalidTime()) {
      setWorkState(false);

    }
    else {
      setWorkState(true);

      setWaitingTime((waitingTime) => {

        if (waitingTime == 0) {
          setWaitingTime(CAPTUREINTERVAL)
          navigation.navigate("MainScreen", { "params": params });
        }

        else return waitingTime - 1
      });
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {workState ? (
        <View style={styles.subContainer}>
          <Text style={styles.textStyle}>Camera is On</Text>
          <Text style={[styles.textStyle, { marginTop: 12 }]} >
            Capture after {waitingTime}S
          </Text>
          <TouchableOpacity style={styles.stopButton}
            onPress={() => navigation.navigate("SettingScreen")}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.restView}>
          <Text style={styles.subText}>
            It's time for a break. It will start automatically during business hours.
          </Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    width: wp('100%'),
    color: 'white',
    fontSize: 36
  },
  stopButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    width: wp('30%'),
    borderRadius: 10,
    marginTop: 24
  },
  restView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '900'
  },
  subText: {
    textAlign: 'center',
    width: wp('100%'),
    color: 'white'
  }
})
