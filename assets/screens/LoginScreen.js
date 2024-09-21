import { StyleSheet, Text, View, TextInput} from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const LoginScreen = () => {

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate("Welcome");
  };

  const [secureEntry, setSecureEntry] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={handleBack}>
      <Ionicons name="arrow-back-circle-outline" color={"black"} size={40}></Ionicons>
      </TouchableOpacity>
        <Text style={styles.welcome}>Welcome Back!</Text>
      <View style={styles.emailWrapper}>
        <Ionicons name='mail' size={25} style={styles.emailIcon}/>
        <TextInput style={styles.emailTxt} placeholder='Enter your email' keyboardType='email-address'></TextInput>
      </View>
      <View style={styles.emailWrapper}>
        <MaterialCommunityIcons name='onepassword' size={25} style={styles.emailIcon}/>
          <TextInput style={styles.passTxt} placeholder='Enter your password' secureTextEntry={secureEntry}></TextInput>
        <TouchableOpacity 
        onPress={() => {
          setSecureEntry((prev) => !prev);
        }} style={styles.eye}>
        <SimpleLineIcons name='eye' size={20}/>
        </TouchableOpacity>       
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginTxt}>Login</Text>
        </TouchableOpacity>   
      </View>      
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
      flex: 1,
  },
  backArrow:{
    padding: 20,
    marginTop: 30,
  },
  welcome:{
    padding: 20,
    fontSize: 40,
  },
  emailWrapper:{
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: "90%",
    borderWidth: 2,
    height: 60,
    borderColor: "dodgerblue",
    borderRadius: 100,    
    marginVertical: 10,
    padding: 2,
    
  },
  emailIcon:{
    marginLeft: 20,
  },
  emailTxt:{
    width: '100%',
    marginLeft: 10,
  
  },
  passTxt:{
    width: '80%',
    marginLeft: 10,
  },
  eye:{
    marginLeft: -20,
  },
  forgotPass:{
    textAlign: 'right',
    marginVertical: 10,
    marginRight: 30,
    fontSize: 15.5,
  },
  loginBtn:{
    backgroundColor: 'dodgerblue',
    borderRadius: 100,
    width: "90%",
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  loginTxt:{
    fontSize: 20,    
    fontWeight: '600',
  }
  
  

  
})