import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { Avatar } from 'react-native-elements';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import { APP_API_URL } from '../env';

const EditProfile = () => {
  const [FirstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
 
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`${APP_API_URL}/user/upd/${1}`, {
        FirstName,
        lastName,
        email,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while updating the profile');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerBackground}>
          {/* <Avatar
            size="xlarge"
            rounded
            source={{ uri: 'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718841600&semt=ais_user' }} 
            containerStyle={styles.avatar}
          >
            <Feather name="camera" size={24} color="black" />
          </Avatar> */}
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
    marginTop: 40,
    marginBottom: 20,
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
