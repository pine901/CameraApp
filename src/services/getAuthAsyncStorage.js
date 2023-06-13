//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  //const user = await AsyncStorage.getItem('userData');
  return {
    token,
    user: null,//JSON.parse(user),
  };
}

export async function setAuthAsyncStorage(response) {
  AsyncStorage.setItem('userToken', response.data.token);
  //await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
}
