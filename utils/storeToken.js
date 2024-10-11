import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token, title) => {
  try {
    await AsyncStorage.setItem(title, token);
    console.log('Token stored successfully!');
  } catch (error) {
    console.error('Failed to store the token', error);
  }
};

export default storeToken;