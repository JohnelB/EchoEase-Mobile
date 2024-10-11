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
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})