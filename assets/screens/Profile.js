import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Modal, Button, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from './ProfilePicture';
import { useGetUserQuery, useUploadImageMutation, useUpdateProfileMutation } from '../../redux/features/authApiSlice';
import {NEXT_PUBLIC_HOST} from "@env"
import * as ImagePicker from 'expo-image-picker';
import {useState, useEffect} from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { Picker } from '@react-native-picker/picker';
import {useFetchAddresses} from  '../../utils/hooks/useFetchAddresses' 

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
        {/* <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity> */} 
      </View>
      <View style={styles.container2}>
            <Text style={{fontSize: RFValue(20)}}>Personal Details</Text>
            <View style={styles.horizontalLine} /> 
            <Text style={{fontSize: RFValue(15)}}>Email: {current_user?.email}</Text>
            <Text style={{fontSize: RFValue(15)}}>Birthday: {current_user?.profile.formatted_dob}</Text>
            <Text style={{textTransform: 'capitalize', fontSize: RFValue(15)}}>Gender: {current_user?.profile.gender}</Text>
            <Text style={{fontSize: RFValue(15)}}>Phone: +63 {current_user?.profile.phone}</Text>
            <Text style={{textTransform: 'capitalize', fontSize: RFValue(15)}}>Address: {current_user?.profile.complete_address}</Text>
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
    borderRadius: 7.5,
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
  container2:{
    position: 'relative',
    bottom: 20,
    height: '30%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 7.5,
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
    fontWeight: '600',
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
    elevation: 3,
    
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    borderColor: 'blue', // Change border color on selection
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue', // Inner circle color when selected
  },
  label: {
    marginLeft: 10,
  },
  selectedRadioCircle: {
    backgroundColor: '#007BFF',
},
selectedInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
},
optionButton: {
  borderColor: 'dodgerblue', 
  borderWidth: 2, 
  borderRadius: 50, 
  paddingVertical: 2, 
  paddingHorizontal: 10, 
  alignItems: 'center',
  marginVertical: 2.5, 
},
dropdown: {
  margin: 16,
  height: 50,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: 'white',
  paddingHorizontal: 10,
  justifyContent: 'center',
},
dropdownItem: {
  height: 50, // Increased height for better visibility
  justifyContent: 'center',
  paddingHorizontal: 10,
},
dropdownText: {
  fontSize: 18, // Increased font size for better readability
  color: 'black',
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

    const options = () => {
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
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Deactivate</Text>
            </TouchableOpacity>
           <EditProfile/>
            <TouchableOpacity  onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
  const EditProfile = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [date, setDate] = useState(new Date(current_user.profile.dob) || new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [firstName, setFirstName] = useState(current_user.first_name);
    const [lastName, setLastName] = useState(current_user.last_name);
    const [gender, setGender] = useState(current_user.profile.gender);
    const [mobile, setMobile] = useState(current_user.profile.phone);
    const [mobileError, setMobileError] = useState('');
    const [province, setProvince] = useState(current_user.profile.province);
    const [municipality, setMunicipality] = useState(current_user.profile.municipality);
    const [barangay, setBarangay] = useState(current_user.profile.brgy);
    const [updateProfile] = useUpdateProfileMutation();

    // const { provinces, municipalities, barangays, fetchProvinces, fetchMunicipalities, fetchBarangays } = useFetchAddresses();

    // useEffect(() => {
    //   fetchProvinces();
    // }, []);
  
    // useEffect(() => {
    //   if (province) {
    //     fetchMunicipalities(province);
    //   }
    // }, [province]);
  
    // useEffect(() => {
    //   if (municipality) {
    //     fetchBarangays(municipality);
    //   }
    // }, [municipality]);
  
    const onChange = (event, selectedDate) => {
      console.log("Selected Date Event:", event);
      console.log("Selected Date:", selectedDate);
    
      if (event.type === 'set' && selectedDate) {
        setDate(selectedDate);
        setShowDatePicker(false);
      } else {
        setShowDatePicker(false);
      }
    };

    const handleSave = async () => {

      setMobileError('');

      if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        setMobileError('Please enter a valid 10-digit mobile number.');
        return
      } 

      const updatedData = {
        first_name: firstName,
        last_name: lastName,
        dob: date.toISOString().split('T')[0],
        phone: mobile,
        gender,
        // complete_address: `${street}, ${barangay}, ${municipality}, ${province}`,
      };
      console.log("Updating profile with data:", updatedData);
      try{
        await updateProfile(updatedData);
        setIsOpen(false);
        Toast.show({
          text2: "Profile updated successfully",
          type:'success',
        });
      } catch {
        Toast.show({
          text2: "Failed updating profile",
          type: 'error',
        });
      }
    };

    return (
      <>
       <TouchableOpacity style={styles.optionButton} onPress={()=>{setIsOpen(true)}}>
              <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
      <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <View style={[styles.modalContainer, {backgroundColor: 'rgba(0, 0, 0, 0.7)' }]}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>First Name</Text>
          <TouchableOpacity>
            <TextInput  
            placeholder="Enter first name" 
            style={{textAlign: 'center', borderColor: 'dodgerblue', borderWidth: 1, paddingHorizontal: 10, borderRadius: 50, marginVertical: 10 }}
            value={firstName}
            onChangeText={setFirstName}></TextInput>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>Last Name</Text>
          <TouchableOpacity>
          <TextInput 
            placeholder="Enter last name" 
            style={{textAlign: 'center', borderColor: 'dodgerblue', borderWidth: 1, paddingHorizontal: 10, borderRadius: 50, marginVertical: 10 }}
            value={lastName}
            onChangeText={setLastName}></TextInput>
          </TouchableOpacity>
            
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>Birthday</Text>
          <TouchableOpacity onPress={() => {console.log("Birthday input pressed"); setShowDatePicker(true)}} >
          <TextInput 
          placeholder={`Birthday: ${current_user.profile.dob}` } 
          editable={false} 
          value={`Birthday: ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          style={{textAlign: 'center', borderColor: 'dodgerblue', borderWidth: 1, paddingHorizontal: 10, borderRadius: 50, marginVertical: 10, color: 'dodgerblue' }}
          ></TextInput>
          </TouchableOpacity>

          {/* Gender Picker */}
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>Gender</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{height: 50, width: '67%', borderColor: 'dodgerblue', borderWidth: 1, borderRadius: 8,}}
            >
              <Picker.Item label="Select Gender" value="" style={{fontSize: 15}}/>
              <Picker.Item label="Male" value="Male" style={{fontSize: 15}}/>
              <Picker.Item label="Female" value="Female" style={{fontSize: 15}}/>
              <Picker.Item label="Other" value="Other" style={{fontSize: 15}}/>
            </Picker>

          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '500'}}>Mobile Number</Text>
          <TouchableOpacity>
          <TextInput 
          placeholder= "Enter mobile number"  
          value={mobile}
          keyboardType='phone-pad'
          onChangeText={setMobile}
          maxLength={10}
          style={{textAlign: 'center', borderColor: 'dodgerblue', borderWidth: 1, paddingHorizontal: 10, borderRadius: 50, marginVertical: 10}}
          ></TextInput>
          {mobileError ? (
              <Text style={{ color: 'red', textAlign: 'center' }}>{mobileError}</Text>
          ) : null}
          </TouchableOpacity>

          {/* Province Dropdown */}
          <Text>Province:</Text>
            {/* <Picker
              selectedValue={province}
              onValueChange={(itemValue) => setProvince(itemValue)}
            >
              <Picker.Item label="Select Province" value="" />
              {provinces.map((prov) => (
                <Picker.Item key={prov.code} label={prov.name} value={prov.code} />
              ))}
            </Picker> */}

            {/* Municipality Dropdown */}
            <Text>Municipality:</Text>
            {/* <Picker
              selectedValue={municipality}
              onValueChange={(itemValue) => setMunicipality(itemValue)}
            >
              <Picker.Item label="Select Municipality" value="" />
              {municipalities.map((mun) => (
                <Picker.Item key={mun.code} label={mun.name} value={mun.code} />
              ))}
            </Picker> */}

            {/* Barangay Dropdown */}
            {/* <Text>Barangay:</Text>
            <Picker
              selectedValue={barangay}
              onValueChange={(itemValue) => setBarangay(itemValue)}
            >
              <Picker.Item label="Select Barangay" value="" />
              {barangays.map((brgy) => (
                <Picker.Item key ={brgy.code} label={brgy.name} value={brgy.code} />
              ))}
            </Picker> */}
          

          

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}              

          <View style={{display: 'flex', flexDirection: 'row', gap: 20,}}>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.closeText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
      </>
     
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
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', left: '950%', bottom: '15%'}}>
      <Ionicons name="save-outline" size={20} color={'dodgerblue'}/>
      <Text> Save</Text>
      <TouchableOpacity onPress={() => setProfilePic()}>
        <Text>    Cancel</Text>
      </TouchableOpacity>
      </View>
      </TouchableOpacity>}
     
      </View>
      <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
        <Text style={styles.name}>{current_user?.first_name}</Text>
        <Text style={styles.name}>{current_user?.last_name}</Text>
      </View>
      {options()}
    </View>
    
  )
}