
import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Checkbox from 'expo-checkbox';
import { useState , useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULTSTARTTIME = 6;
const DEFAULTENDTIME = 23;

export default function SettingScreen({ navigation }) {

  const [mon, setMon] = useState(true);
  const [tue, setTue] = useState(true);
  const [wed, setWed] = useState(true);
  const [tur, setTur] = useState(true);
  const [fri, setFri] = useState(true);
  const [sar, setSar] = useState(false);
  const [sun, setSun] = useState(false);

  const [location, setLocation] = useState('');
  const [cameraID, setCameraID] = useState('');
  const [startHours, setStartHours] = useState(DEFAULTSTARTTIME);
  const [endHours, setEndHours] = useState(DEFAULTENDTIME);

  const readData = async () => {
    await AsyncStorage.getItem('params').then((result) => {
      const params = JSON.parse(result);
      if (params) {

        setLocation(params.location);
        setCameraID(params.cameraID);
        setStartHours(params.startHours);
        setEndHours(params.endHours);

        setMon(params.schedule[0]);
        setTue(params.schedule[1]);
        setWed(params.schedule[2]);
        setTur(params.schedule[3]);
        setFri(params.schedule[4]);
        setSar(params.schedule[5]);
        setSun(params.schedule[6]);
      }

    });
  }

  useEffect(() => {
    readData()
  }, []);


  function ifValid(startHours, endHours) {
    const validTime = []
    for (let i = 0; i < 24; i++) {
      validTime.push(i);
    }

    if (Number(startHours)==null || !Number(endHours)) {
      Alert.alert('Please select starting time and ending time');
      return false;
    }
    if (Number(startHours) >= Number(endHours)) {
      Alert.alert('Please select time correctly.');
      return false;
    }

    if (!validTime.includes(Number(startHours)) || !validTime.includes(Number(endHours))) {
      Alert.alert('Please select valid time.');
      return false;
    }
    return true;
  }

  async function startRecord() {

    if (location == "" || cameraID == "") {
      Alert.alert('Please select location and CameraID');
      return;
    }

    if (!ifValid(startHours, endHours)) return;

    const params = { location, cameraID, startHours, endHours, schedule: [sun, mon, tue, wed, tur, fri, sar] }

    await AsyncStorage.setItem('params', JSON.stringify(params));

    navigation.navigate('WaitingScreen', { "params": params })
  }
  return (
    <View style={styles.container}>

      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FFFF" translucent={true} />
      <View style={styles.settingTab}>
        <Text style={{ fontSize: 16, color: 'white' }}>Location</Text>
        <TextInput style={styles.inputTag} value={location} onChangeText={(val) => { setLocation(val) }} />

        <Text style={{ fontSize: 16, marginTop: 12, color: 'white' }}>Camera ID</Text>
        <TextInput style={styles.inputTag} value={cameraID} onChangeText={(val) => setCameraID(val)} />

        <Text style={{ marginTop: 12, color: 'white' }}>Schedule</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 12 }}>
          <Checkbox
            value={mon}
            onValueChange={setMon}
            color={mon ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }}>Mon</Text>
          <Checkbox value={tue}
            onValueChange={setTue}
            color={tue ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Tue</Text>
          <Checkbox value={wed}
            onValueChange={setWed}
            color={wed ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Wed</Text>
          <Checkbox value={tur}
            onValueChange={setTur}
            color={tur ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Tur</Text>
          <Checkbox value={fri}
            onValueChange={setFri}
            color={fri ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Fri</Text>
          <Checkbox value={sar}
            onValueChange={setSar}
            color={sar ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Sar</Text>
          <Checkbox value={sun}
            onValueChange={setSun}
            color={sun ? '#18567F' : undefined} />
          <Text style={{ color: 'white' }} >Sun</Text>
        </View>
        <View style={{ width: wp('80%'), flexDirection: 'row', alignItems: 'center', height: hp('12%') }}>
          <Text style={{ fontSize: 16, alignSelf: 'center', color: 'white' }}>From: </Text>
          <TextInput
            style={[styles.inputTag, { width: wp('30%'), textAlign: 'center' }]}
            value={startHours}
            placeholder={`${DEFAULTSTARTTIME}`}
            onChangeText={(val) => {
              setStartHours(val);
            }}
          />
          <Text style={{ fontSize: 16, marginLeft: 4, color: 'white' }}>To: </Text>
          <TextInput
            style={[styles.inputTag, { width: wp('30%'), textAlign: 'center' }]}
            placeholder={`${DEFAULTENDTIME}`}
            value={endHours}
            onChangeText={(val) => {
              setEndHours(val);
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonNext} onPress={async () => startRecord()}>
        <Text style={styles.buttonText}>Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: wp('4%'),
    fontWeight: '600'
  },
  buttonNext: {
    width: wp('70%'),
    height: hp('7%'),
    backgroundColor: '#08466F',
    borderRadius: wp('2%'),
    padding: hp('1.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('6%')
  },

  settingTab: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: hp('20%'),
    justifyContent: 'space-between',
    height: hp('60%'),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('8%'),
  },
  inputTag: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    width: wp('80%'),
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 12,
    color: 'white',
    backgroundColor: '#444'
  },
  timeInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    width: wp('25%'),
    paddingHorizontal: 16,
    paddingVertical: 4
  }
});
