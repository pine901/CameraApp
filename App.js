
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from "./src/screens/SplashScreen";
import SettingScreen from './src/screens/SettingScreen';
import MainScreen from './src/screens/MainScreen';
import WaitingScreen from './src/screens/WaitingScreen';

const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
        headerShown: false,
        gestureEnabled: true, gestureDirection: 'horizontal'
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="WaitingScreen" component={WaitingScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}