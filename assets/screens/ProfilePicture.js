import { StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

const ProfilePicture = ({ profile }) => {

  const defaultProfilePicture = require('../images/profile.png')

  const profileImage = profile?.profile?.is_complete
  ? {uri: profile.profile.profile_image || defaultProfilePicture}
  : defaultProfilePicture;

  console.log('Profile Image', profileImage);

  return (
    <View style={styles.container}>
        <Image source={profileImage} style={styles.profilePic}/>
    </View>
    
  )
}

export default ProfilePicture

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20, // Half of width for a perfect circle
    marginRight: 10, // Space between profile picture and logo
  },
})