import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Modal, Button } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from './ProfilePicture';
import { useGetUserQuery, useUploadImageMutation } from '../../redux/features/authApiSlice';
import {NEXT_PUBLIC_HOST} from "@env"
import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';



const Profile = () => {
  const navigation = useNavigation();
  const {data: current_user, isLoading} = useGetUserQuery();
  const handlePress = () => {
      navigation.navigate("Home");
  }
  if (isLoading){
    return <View>
      <Text>Loading</Text>
    </View>
  }

  
  
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity onPress={handlePress}> 
            <Ionicons name='arrow-back' size={25}/>
          </TouchableOpacity>
            <Text style={styles.profileTxt}>Profile</Text>
        </SafeAreaView>
      </View>
      <View style={styles.container}>
      <ImageBackground source={require('../images/homeBG.jpg')} style={styles.bg}>
      <View style={styles.container1}>
      {current_user && <Hero current_user={current_user}/>}     
      <View style={styles.horizontalLine} /> 
        <Text>Personal Details</Text>
        <Text>Email: {current_user?.email}</Text>
        <Text>Birthday: {current_user?.profile.dob}</Text>
        <Text style={{textTransform: 'capitalize'}}>Gender: {current_user?.profile.gender}</Text>
        <Text>Phone: +63 {current_user?.profile.phone}</Text>
        <Text style={{textTransform: 'capitalize'}}>Address: {current_user?.profile.complete_address}</Text>
        {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity> */} 
      </View>
      </ImageBackground>
      </View>
    </View>
    

  )
};

export default Profile

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
  container1:{
    position: 'relative',
    height: '25%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },  
  profilePic:{
    width: RFPercentage(15), // Adjust size for better responsiveness
    height: RFPercentage(15),
    borderRadius: RFPercentage(7.5), // Makes it circular
    borderWidth: 2,
    borderColor: 'dodgerblue', // White border for the profile picture
    marginBottom: 10,
    // flex: 1,
    // width: '30%',
    // resizeMode: 'contain',
    // alignSelf: 'center',
  },
  bg:{
    flex: 1,
    width: '100%',
    height: '100%',

  },
  name:{
    fontSize: RFValue(20),
    textAlign: 'center',
    fontWeight: '800',
  },
  role: {
    fontSize: RFValue(16),
    color: 'dodgerblue',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  editButton: {
    backgroundColor: '#5BBFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeText: {
    marginTop: 20,
    color: 'blue',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  horizontalLine: {
    height: 1.5,
    backgroundColor: 'black', // Change color as needed
    width: '100%', // Full width
    marginVertical: 10,
    marginTop: 10, // Space above the line
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3
    ,
  },

})


// 

const Hero = ({current_user}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [uploadImage,{isLoading : isUploading}] = useUploadImageMutation();
  const [modalVisible, setModalVisible] = useState(false);

  // console.log('current user',current_user)
  
  
  const pickImage = async () => {
    // Request permission to access the camera roll
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      Toast.show({
        text2: "Image selection was canceled.",
        type: 'info',
      });
    } 
    
    // Check if the assets array is present and has items
    if (result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setProfilePic(selectedAsset);
      Toast.show({
        text2: `Image selected: ${selectedAsset}`,
        type: 'success',
      });
    } else {
        Toast.show({
          text2: "No image selected.",
          type: 'error',
        });
      }
  };

  const uploadPic = async (asset) => {
    const formData = new FormData();
    formData.append('profile_image', {
      uri: asset.uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });
    
    
      uploadImage(formData).unwrap().then(()=>{
        Toast.show({
          text2: "Image uploaded successfully",
          type: 'success',
        });
      }).catch(()=>{
        Toast.show({
          text2: `Failed uploading image`,
          type: 'error',
        });
      }) 
      setProfilePic(null)
    }

    const editProfile = () => {
      return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity>
              <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionText}>Deactivate</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.optionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      )
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <View style={{position: 'absolute', right: '1%', top: '1%'}}>
      <TouchableOpacity onPress={() => setModalVisible(true)}><Ionicons name="ellipsis-horizontal-outline" size={20} color={'black'}/></TouchableOpacity>
      
      </View>
      <View style={{alignItems: 'center'}}>
      <Image source={{ uri: profilePic? profilePic.uri: `${NEXT_PUBLIC_HOST}${current_user.profile.profile_image}` }}
  style={styles.profilePic}/>
      <TouchableOpacity>
        <Text style={styles.changePictureText} onPress={pickImage}>Change Profile Picture</Text>
      </TouchableOpacity>
      {profilePic && <TouchableOpacity style={{textAlign:'center', alignItems:'center'}} onPress={() => uploadPic(profilePic)}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', left: '1075%', bottom: '15%'}}>
      <Ionicons name="save-outline" size={20} color={'dodgerblue'}/>
      <Text> Save</Text>
      </View>
      </TouchableOpacity>}
      </View>
      <View style={{}}>
        <Text style={styles.name}>{current_user?.fullname}</Text>
        <Text style={styles.role}>{current_user?.role}</Text>
      </View>
      {editProfile()}
    </View>
    
  )
}

