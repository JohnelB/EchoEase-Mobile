import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './assets/screens/WelcomeScreen';
import LoginScreen from './assets/screens/LoginScreen';
import HomeScreen from './assets/screens/HomeScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (    
    <>
      <StatusBar 
        style='auto' 
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={"Welcome"} component={WelcomeScreen}/>
          <Stack.Screen name={"Login"} component={LoginScreen}/>
          <Stack.Screen name={"Home"} component={HomeScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})