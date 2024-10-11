import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, Dimensions, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import { useLoginMutation } from '../../redux/services/apiSlice'
import { useLoginMutation } from '../../redux/features/authApiSlice'
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import storeToken from '../../utils/storeToken'
import Toast from 'react-native-toast-message'



const { height, width } = Dimensions.get('window');





const LoginScreen = () => {

  const [secureEntry, setSecureEntry] = useState(true);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [login, {data, isSuccess, isError, isLoading}] = useLoginMutation();
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("Welcome");
  };
  const handleLogin = async() => {

    if (!email){
      Toast.show({
        text1: 'Email Required',
        text2: 'Please enter your email address',
        type: 'error',
      });
      return;
    }

    if (!pass) {
      Toast.show({
        text1: 'Password Required',
        text2: 'Please enter your password',
        type: 'error',
      });
      return;
    }
    try{
      const data = await login({email: email, password: pass}).unwrap();
        storeToken(data.access, data.refresh);
        Toast.show({
          text1: 'Logged in successfully!',
          type: 'success',
          visibilityTime: 1000,
        })
        navigation.navigate("Home");

    }catch(error){
      Toast.show({
        text1: 'Invalid',
        text2: 'Invalid Email or Password',
        type: 'error',
      });
    }
    // const data = await login({email: email, password: pass}).unwrap().then(()=>{
    //   Toast.show({
    //     text1: 'Logged in successfully!',
    //     type: 'success',
    //     visibilityTime: 1000,
    //   })
    //   navigation.navigate("Home");
    // }).catch(()=>{ 
    //   Toast.show({
    //   text1: 'Invalid',
    //   text2: 'Invalid Email or Password',
    //   type: 'error',
    // });
    
  // });
    
    // storeToken(data.access, data.refresh);
  };

  

 
 

 

  return (
    <SafeAreaView style={styles.container}> 
      <TouchableOpacity style={styles.backArrow} onPress={handleBack}>
      <Ionicons name="arrow-back-circle-outline" color={"black"} size={40}></Ionicons>
      </TouchableOpacity>
        <Text style={styles.welcome}>Welcome Back!</Text>
      <View style={styles.emailWrapper}>
        <Ionicons name='mail' size={25} style={styles.emailIcon}/>
        <TextInput 
        style={styles.emailTxt} 
        placeholder='Enter your email' 
        keyboardType='email-address' 
        value={email} 
        onChangeText={setEmail}></TextInput>
      </View>
      <View style={styles.emailWrapper}>
        <MaterialCommunityIcons name='onepassword' size={25} style={styles.emailIcon}/>
          <TextInput style={styles.passTxt} 
          placeholder='Enter your password' 
          secureTextEntry={secureEntry} 
          value={pass} 
          onChangeText={setPass}></TextInput>
        <TouchableOpacity 
        onPress={() => {
          setSecureEntry((prev) => !prev);
        }} style={styles.eye}>
        <SimpleLineIcons name='eye' size={20}/>
        </TouchableOpacity>    
        <Image source={require('../images/echoease-logo.png')} style={styles.logo}/>    
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff"/>
          ) : (
            <Text style={styles.loginTxt}>Login</Text>
          )} 
        </TouchableOpacity>
        <Text style={styles.centerTxt}>or continue with</Text>   
        <TouchableOpacity style={styles.googleWrapper}>
          <Image source={require('../images/google.png')} style={styles.googleImage}/>
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.fbWrapper}>
          <Image source={require('../images/facebook.png')} style={styles.fbImage}/>
          <Text style={styles.fbText}>Facebook</Text>
        </TouchableOpacity>
        <View style={styles.signupWrapper}>
          <Text style={styles.accountTxt}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupTxt}>Sign up</Text>
          </TouchableOpacity>
          
        </View>
      </View>    
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  backArrow:{
    padding: height * 0.026,//20,
    marginTop: height * 0.036, //30,
  },
  welcome:{
    padding: height * 0.026,//20,
    fontSize: height * 0.046,//40,
  },
  emailWrapper:{
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: "90%",
    borderWidth: 2,
    height: height * 0.07,//60,
    borderColor: "dodgerblue",
    borderRadius: 100,    
    marginVertical: height * 0.016,//10,
    padding: height * 0.0026,//2,
    
  },
  emailIcon:{
    marginLeft: height * 0.026,//20,
  },
  emailTxt:{
    width: '100%',
    marginLeft: height * 0.016,//10,
  
  },
  passTxt:{
    width: '80%',
    marginLeft: height * 0.016,//10,
  },
  eye:{
    marginLeft: height * -0.026,//-20,
  },
  forgotPass:{
    textAlign: 'right',
    marginVertical: height * 0.016,//10,
    marginRight: height * 0.036,//30,
    fontSize: height * 0.0215//15.5,
  },
  loginBtn:{
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
    width: "90%",
    height: height * 0.07,//60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.056,//50,
  },
  loginTxt:{
    fontSize: height * 0.026,//20,    
    fontWeight: '600',
  },
  centerTxt:{
    alignSelf: 'center',
    marginVertical: height * -0.026,//-20,
    fontWeight: '400',
  },
  googleImage:{
    height: height * 0.035,//25.64,
    width: width * 0.07,//30,
  },
  googleWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "dodgerblue",
    borderRadius: 100,
    width: "90%",
    alignSelf: 'center',
    height: height * 0.07,//60,
    marginVertical: height * 0.056,//50,
    
  },
  googleText:{
    fontSize: height * 0.026,//20,
    padding: height * 0.0056,//5,
    fontWeight: '600',
  },
  fbImage:{
    height: height * 0.043,//33,
    width: height * 0.043,//33,
  },
  fbWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "dodgerblue",
    borderRadius: 100,
    width: "90%",
    alignSelf: 'center',
    height: height * 0.07,//60,
    marginVertical: height * -0.036,//-30,
    
  },
  fbText:{
    fontSize: height * 0.026,//20,
    padding: height * 0.0056,//5,
    fontWeight: '600',
  },
  signupWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.066,//60, 
  },
  accountTxt:{
    fontSize: height * 0.020,//15.5,
    fontWeight: '500',
  },
  signupTxt:{
    marginLeft: height * 0.0056,//5,
    color: 'dodgerblue',
    fontSize: height * 0.020,//15.5,
    fontWeight: '800',
  },  
})