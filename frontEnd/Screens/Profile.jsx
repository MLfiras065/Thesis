import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import { APP_API_URL } from "../env";
import SessionStorage from "react-native-session-storage";

function ProfileScreen() {
  const navigation = useNavigation();
  const [item, setItem] = useState([]);
  const [token, setToken] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const getEmail = async () => {
    try {
      const emailUser = SessionStorage.getItem("emailUser");
      const emailOwner = SessionStorage.getItem("emailOwner");
      console.log("email",emailUser);
      // const ownerToken = SessionStorage.getItem("ownerToken");
      // const userToken = SessionStorage.getItem("userToken");
      if (emailOwner) {
        const res = await axios.get(`${APP_API_URL}/owner/${emailOwner}`);
        setItem(res.data);
        setToken(res.data.ownerToken)
        console.log(res.data);
      } else if (emailUser) {
        const res = await axios.get(`${APP_API_URL}/user/${emailUser}`);
        SessionStorage.getItem('emailUser')
        setItem(res.data);
        // setToken(res.data.Password)
        console.log('profuser',res.data);
      } else {
        console.log("no email provided");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled((previousState) => !previousState);
  };
  const logout=()=>{
    SessionStorage.clear('emailUser')
    navigation.navigate("Login")
  }

  const styles = createStyles(isDarkTheme);
  useEffect(() => {
    getEmail();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image  source={{ uri: item?item.image :"" }} style={styles.avatar} />
        <Text style={styles.name}>{item?item.FirstName :"" } </Text>
        <Text style={styles.email}>{item?item.LastName :"" }</Text>
        <Text style={styles.phone}>{item?item.email:''}</Text>
        
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("EditProfile", { item: item })}
      >
        <Text style={styles.optionText}>Edit profile information</Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={toggleTheme}>
        <Text style={styles.optionText}>Theme</Text>
        <Text style={styles.optionText}>
          {isDarkTheme ? "Dark mode" : "Light mode"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Contact us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={logout}>
      <Feather name="log-out" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (isDarkTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkTheme ? "#333" : "#f5f5f5",
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkTheme ? "#fff" : "#000",
    },
    email: {
      fontSize: 16,
      color: isDarkTheme ? "lightgray" : "gray",
    },
    phone: {
      fontSize: 16,
      color: isDarkTheme ? "lightgray" : "gray",
    },
    option: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#555" : "#ccc",
    },
    optionText: {
      fontSize: 18,
      color: isDarkTheme ? "#fff" : "#000",
    },
  });

export default ProfileScreen;
