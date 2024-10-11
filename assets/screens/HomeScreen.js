import { ImageBackground, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native'
import ProfilePicture from './ProfilePicture'
import { useGetUserQuery } from '../../redux/features/authApiSlice'
import {NEXT_PUBLIC_HOST} from "@env"



const { width, height } = Dimensions.get('window')

const dataSet1 = [
  { image: require('../images/profile.png'), label: 'Profile' },
  { image: require('../images/booking.png'), label: 'Bookings' },
  { image: require('../images/comments.png'), label: 'Messages' },
  // { image: require('../images/mobile-banking.png'), label: 'Transactions' },
];

const dataSet2 = [
  { image: require('../images/microphone.png'), label: 'Echoee' }, // Use different images and labels for the second set
  { image: require('../images/mobile-banking.png'), label: 'Transactions' },
  { image: require('../images/settings.png'), label: 'Settings' },
  // { image: require('../images/mobile-banking.png'), label: 'Transactions' },
];

const HomeScreen = () => {

  const navigation = useNavigation();
  const {data: current_user, isLoading} = useGetUserQuery();
  const handlePress = (label) => {
    if (label === 'Profile') {
      navigation.navigate('Profile');
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity>
        <Image source={{uri:`${NEXT_PUBLIC_HOST}${current_user?.profile.profile_image}`}}style={styles.profilePic}/>
        {/* <ProfilePicture profile={profile} st  yle={styles.profilePic}/> */}
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
      <View style={{ flexDirection: 'row', width: '100%', height: '85%' }}>
      <View style={styles.column}>
        {dataSet1.map((item, index) => (
          <View key={index} style={styles.wrapper}>
            <LinearGradient
              colors={['#00F2FE', '#48F7B8']}
              angle={180}
              style={styles.box}>
              <TouchableOpacity onPress={() => handlePress(item.label)}>
                <Image source={item.image} style={styles.profile} resizeMode="cover" />
                <Text style={styles.profileTxt}>{item.label}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </View>

      {/* Right Column */}
      <View style={styles.column}>
        {dataSet2.map((item, index) => (
          <View key={index} style={styles.wrapper}>
            <LinearGradient
              colors={['#00F2FE', '#48F7B8']}
              angle={180}
              style={styles.box}>
              <TouchableOpacity onPress={() => handlePress(item.label)}>
                <Image source={item.image} style={styles.profile} resizeMode="cover" />
                <Text style={styles.profileTxt}>{item.label}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>

      
      {/* <View style={[{backgroundColor: 'red'}, {width: '50%'}, {height:'85%'}, {flexDirection: 'column'}]}> */}
      {/* <View style={styles.wrapper}>
        
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={styles.box}>
          <TouchableOpacity>
           <Image source={require('../images/profile.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={[styles.profileTxt, {}]}>Profile</Text>
           </TouchableOpacity>
        </LinearGradient>
        
      </View> */}
      {/* <View style={styles.wrapper}>
        
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/microphone.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Echoee</Text>
           </TouchableOpacity>
        </LinearGradient>
     
      </View>
      <View style={styles.wrapper}>
     
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/booking.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Bookings</Text>
           </TouchableOpacity>
        </LinearGradient>
        
      </View> */}
      {/* <View style={styles.wrapper}>
       
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/mobile-banking.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Transactions</Text>
           </TouchableOpacity>
        </LinearGradient>
       
      </View>
      </View>
      <View style={[{backgroundColor: 'red'}, {width: '50%'}, {height:'85%'}, {flexDirection: 'column'}]}>
      <View style={styles.wrapper}>
        
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={styles.box}>
          <TouchableOpacity>
           <Image source={require('../images/profile.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={[styles.profileTxt, {}]}>Profile</Text>
           </TouchableOpacity>
        </LinearGradient>
        
      </View>
      <View style={styles.wrapper}>
       
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/microphone.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Echoee</Text>
           </TouchableOpacity>
        </LinearGradient>
       
      </View>
      <View style={styles.wrapper}>
 
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/booking.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Bookings</Text>
           </TouchableOpacity>
        </LinearGradient>
       
      </View>
      <View style={styles.wrapper}>
       
        <LinearGradient
         colors={['#00F2FE', '#48F7B8']}
         angle={180}
         style={[styles.box]}>
          <TouchableOpacity>
           <Image source={require('../images/mobile-banking.png')} style={styles.profile} resizeMode="cover"/>
           <Text style={styles.profileTxt}>Transactions</Text>
           </TouchableOpacity>
        </LinearGradient>
        
      </View> */}
      {/* </View> */}
      
      {/* <View style={styles.footer}>
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
      </View> */}
      
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
  // footer: {
  //   backgroundColor: "#5BBFFF",
  //   height: "6%",
  //   width: "100%",
  //   marginVertical: 721,
  //   borderColor: "black",
  //   borderTopWidth: 1,
  // },
  // safedownArea: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   width: '100%',
  // },
  // lowIcons:{
  //   flexDirection: 'row',
  //   marginVertical: -40,
  //   alignItems: 'center',
  //   marginLeft: 'auto',
  // },
  // iconFooter:{
  //   justifyContent: 'space-between',
  //   marginLeft: 15,
  // }
  column: {
    // backgroundColor: 'red',
    width: '50%',
    height: '100%',
    flexDirection: 'column',
  },

  wrapper:{
    marginVertical: 15,
    marginHorizontal: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  box: {
    width: width * 0.35,
    height: height * 0.19,
    borderRadius: 25,
    borderColor: '#000101',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',

  },
  profileTxt:{
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1.5},
    textShadowRadius: 1,
    alignSelf: 'center',
    textAlign: 'center', 
    color: 'white',
    paddingVertical: 4,
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },
  profile:{
    width: height * 0.09, // Adjust size based on height
    height: height * 0.09, // Adjust size based on height
    marginBottom: 10,
    alignSelf: 'center',

  }
  

  

})