import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

const Messaging = () => {

    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("Home");
    }
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity onPress={handlePress}> 
            <Ionicons name='arrow-back' size={25}/>
          </TouchableOpacity>
            <Text style={styles.profileTxt}>Messages</Text>
        </SafeAreaView>
      </View>
      <View style={styles.container}>
      <ImageBackground source={require('../images/homeBG.jpg')} style={styles.bg}>

      </ImageBackground>
      </View>
    </View>
  )
}

export default Messaging

const styles = StyleSheet.create({
    container:{
        flex: 1,
      },
      heading:{
        flexDirection: 'row',
        backgroundColor: "#5BBFFF",
        height: "13%",
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: 10, // Adds some padding
        borderColor: "black",
        borderBottomWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
      safeArea: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      },
      profileTxt:{
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1.5},
        textShadowRadius: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: RFValue(20),
        padding: 5,
        marginLeft: 10,
        fontWeight: 'bold',
      },
      bg:{
        flex: 1,
        width: '100%',
        height: '100%',
    
      },
})