
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import { APP_API_URL } from "../../env";
import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
// import BottomNavigation from './Screens/Navigation/BottomNavigation.jsx';

const EditProfile = () => {
  const route = useRoute();
  const Password = route.params?.Password;
  const navigation = useNavigation();
  const [FirstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [LastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [ownerid, setOwnerId] = useState(null);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    const fetchOwnerId = async () => {
      const id = await SessionStorage.getItem("ownerid");
      setOwnerId(id);
    };
    const fetchUserId = async () => {
      const userid = await SessionStorage.getItem("userid");
      setUserId(userid);
    };
    fetchOwnerId();
    fetchUserId();
  }, []);

  const handleUpdate = async () => {
    if (!ownerid) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Owner ID is not available',
        position: 'bottom',
        bottomOffset:800,
      });
      return;
    }

    try {
      const response = await axios.put(`${APP_API_URL}/user/upd/${userid}`, {
        FirstName,
        LastName,
        email,
        image,
      });

      if (response.status === 200) {
        SessionStorage.setItem('emailUser', email);
        setEmail(response.data.email);
        setFirstName(response.data.FirstName);
        setLastName(response.data.LastName);
        setImage(response.data.image);
        console.log("Updated", response.data);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
          position: 'bottom',
          bottomOffset:800,
        });
        navigation.goBack("Profile", {});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update profile',
          position: 'bottom',
          bottomOffset:800,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred',
        position: 'bottom',
        bottomOffset:800,
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0]);
    }
  };

  const handleCameraLaunch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerBackground}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s",
              }}
              style={styles.avatar}
            />
            <Entypo name="camera" size={24} color="black" onPress={handleCameraLaunch} style={styles.camera} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={FirstName}
            placeholder="your new First Name"
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={LastName}
            placeholder="your new Last Name"
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholder="your new Email"
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
      {/* <BottomNavigation/> */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    padding: 20,
  },
  headerBackground: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: "#000",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    height: 50,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: "#4d8790",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 100,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  camera: {
    alignItems: 'center',
    paddingLeft: 37
  }
});

export default EditProfile;

