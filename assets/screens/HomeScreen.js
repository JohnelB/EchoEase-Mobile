import { ImageBackground, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'



const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity>
        <Image source={require ('../images/unnamed.jpg')} style={styles.profilePic}/>
        </TouchableOpacity> 
        <Image source={require('../images/echoease-light.png')} style={styles.logo}/>   
        <View style={styles.rightIcons}>
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications" size={24} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </SafeAreaView> 
      </View>
      <View style={styles.footer}>
        <SafeAreaView style={styles.safedownArea}>
          <TouchableOpacity>
            <View style={styles.lowIcons}>
              <TouchableOpacity>
                <Ionicons name="home" size={25} color={"black"} style={styles.iconFooter}/>
                <Text>Home</Text> 
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="calendar" size={25} color={"black"} style={styles.iconFooter}/>
                <Text>Bookings</Text> 
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="people" size={25} color={"black"} style={styles.iconFooter}/>
                <Text>Echoee</Text> 
              </TouchableOpacity> 
              <TouchableOpacity>
                <Ionicons name="person" size={25} color={"black"} style={styles.iconFooter}/>
                <Text>Me</Text> 
              </TouchableOpacity> 

            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
   
    
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
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
  logo: {
    width: 100, // Set a fixed width for the logo
    height: 40, // Set a fixed height for the logo
    resizeMode: 'contain', // Ensures the logo maintains aspect ratio
    marginLeft: 25, // Space between profile picture and logo
    flex: 1, // Allows the logo to take up available space
    alignSelf: 'center', // Center vertically within the heading
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of width for a perfect circle
    marginRight: 10, // Space between profile picture and logo
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // Pushes icons to the right
  },
  icon: {
    marginLeft: 15, // Space between icons
  },
  footer: {
    backgroundColor: "#5BBFFF",
    height: "6%",
    width: "100%",
    marginVertical: 721,
    borderColor: "black",
    borderTopWidth: 1,
  },
  safedownArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lowIcons:{
    flexDirection: 'row',
    marginVertical: -40,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  iconFooter:{
    justifyContent: 'space-between',
    marginLeft: 15,
  }

  

})