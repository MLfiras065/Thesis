import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert,Image,Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { APP_API_URL } from '../env';
import { useNavigation } from '@react-navigation/native';
import SessionStorage from 'react-native-session-storage';

const EditProfile = () => {
  const navigation=useNavigation()
  const [FirstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
 const ownerid=SessionStorage.getItem('ownerid')

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${APP_API_URL}/user/upd/${ownerid}`, {
        FirstName,
        lastName,
        email,
        image
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate("Profile")
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the profile');
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleCameraLaunch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };




  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerBackground}>
        <TouchableOpacity 

onPress={pickImage}
   >
            <Image 
source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s' }}
style={styles.avatar} 

/>
<Button title="Camera" onPress={async () => {
              handleCameraLaunch(true);
          }}  />
</TouchableOpacity> 
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>FirstName</Text>
          <TextInput
            style={styles.input}
            // value={FirstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>LastName</Text>
            <TextInput
              style={styles.input}
              // value={password}
              onChangeText={setLastName}
            />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            // value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View> */}
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    padding: 20,
  },
  headerBackground: {
    width: '100%',
    height: 200,
    backgroundColor:"#f0f0f0" , // Blue background
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#000',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
