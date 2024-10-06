import { StyleSheet, Text, View, ImageBackground, Image, Animated, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useRef} from 'react'
import { useNavigation } from '@react-navigation/native'

const { height, width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  // Interpolate the animated value to create a bounce effect
  const bounceInterpolate = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Adjust the outputRange to change the bounce height
  });

  const animatedStyle = {
    transform: [{ translateY: bounceInterpolate }],
  };

  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require ('../images/homeBG.jpg')} style={styles.background}>
        <Image source={require ('../images/echoease-light.png')} style={styles.logo}/>
        {/*<Image source={require('../images/echoBot.gif')} style={styles.echoBot}/>*/}
        <Animated.Image
        source={require ('../images/echo-bot.png')}
        style={[styles.echoBot, animatedStyle]}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginWrapper} onPress={handleLogin}>
            <Text style={styles.loginBtn}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupWrapper}>
            <Text style={styles.signUpBtn}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        
      
     </ImageBackground>
     
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background:{
        flex: 1,
        width: "100%",
        height: "100%",
    },
    logo:{
        height: height * 0.06,
        width: 'auto',
        resizeMode: 'contain',
        marginVertical: 100,
    },
    echoBot:{
        resizeMode: 'contain',
        height: '100%',
        width: '70%',
        marginHorizontal: 60,
        marginVertical: -350,
    },
    buttonContainer:{
      flexDirection: 'row',
      marginVertical: 100,
      borderWidth: 2,
      borderColor: 'dodgerblue',
      width: "90%",
      height: height * 0.07,
      borderRadius: 100,
      alignSelf: 'center', 
    
    },
    loginWrapper:{
      width: "50%",
      backgroundColor: '#e0eaff',
      borderRadius: 98,
      justifyContent: 'center',
      alignItems: "center",
    },
    signupWrapper:{
      justifyContent: 'center',
      alignItems: "center",
      width: "50%",
    },
    loginBtn:{
      justifyContent: 'center',
      alignItems: "center",
      fontSize: 20,
      fontWeight: '800',           
    },
    signUpBtn:{
      justifyContent: 'center',
      alignItems: "center",
      fontSize: 20,
      fontWeight: '800',
    },
    

})