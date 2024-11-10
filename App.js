import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './assets/screens/WelcomeScreen';
import LoginScreen from './assets/screens/LoginScreen';
import HomeScreen from './assets/screens/HomeScreen';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from './redux/store';
import Toast from 'react-native-toast-message';
import Profile from './assets/screens/Profile';
import ForgotPassword from './assets/screens/ForgotPassword';
import Bookings from './assets/screens/Bookings';
import Messaging from './assets/screens/Messaging';
import Transactions from './assets/screens/Transactions';
import Notifications from './assets/screens/Notifications';
import Echoees from './assets/screens/Echoees';


const Stack = createNativeStackNavigator();

const App = () => {
  return (    
    <Provider store={store}>
      <StatusBar 
        style='auto' 
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="Bookings" component={Bookings}/>
          <Stack.Screen name="Messaging" component={Messaging}/>
          <Stack.Screen name="Transactions" component={Transactions}/>
          <Stack.Screen name="Notifications" component={Notifications}/>
          <Stack.Screen name="Echoees" component={Echoees}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})