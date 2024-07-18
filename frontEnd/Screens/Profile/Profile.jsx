import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Feather, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";
// import BottomNavigation from './Screens/BottomNavigation.jsx';

function ProfileScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const navigation = useNavigation();
  const [item, setItem] = useState([]);
  const [email, setEmail] = useState(SessionStorage.getItem("emailUser"));
  const [token, setToken] = useState();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const getEmail = async () => {
    try {
      const emailUser = SessionStorage.getItem("emailUser");
      if (emailUser) {
        const res = await axios.get(`${APP_API_URL}/user/${emailUser}`);
        setItem(res.data);
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

  const logout = () => {
    SessionStorage.clear('emailUser');
    navigation.navigate("Role");
  };

  const styles = createStyles(isDarkTheme);

  useEffect(() => {
    getEmail();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileHeader}>
          <Image source={{ uri: item ? item.image : "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{item ? item.FirstName : "First Name"}</Text>
            <Text style={styles.lastname}>{item ? item.LastName : "Last Name"}</Text>
            <Text style={styles.email}>{item ? item.email : 'email'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile", { item: item })} style={styles.editButton}>
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("MyAccount")}>
            <MaterialIcons name="account-circle" size={24} color={isDarkTheme ? "#fff" : "#000"} />
            <Text style={styles.optionText}>My Account</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>

          <View style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text style={styles.optionText}>Notification</Text>
            <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
          </View>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("TwoFactorAuthentication")}>
            <Feather name="lock" size={24} color={isDarkTheme ? "#fff" : "#000"} />
            <Text style={styles.optionText}>Two-Factor Authentication</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("HelpSupport")}>
            <Feather name="help-circle" size={24} color={isDarkTheme ? "#fff" : "#000"} />
            <Text style={styles.optionText}>Help & Support</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("AboutApp")}>
            <Feather name="info" size={24} color={isDarkTheme ? "#fff" : "#000"} />
            <Text style={styles.optionText}>About App</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={logout}>
            <Feather name="log-out" size={24} color="red" />
            <Text style={styles.optionText}>Log out</Text>
            <AntDesign name="right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <BottomNavigation/> */}
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
      flexDirection: 'row',
      alignItems: "center",
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkTheme ? "#fff" : "#000",
    },
    lastname: {
      fontSize: 18,
      color: isDarkTheme ? "#fff" : "#000",
    },
    email: {
      fontSize: 16,
      color: isDarkTheme ? "lightgray" : "gray",
    },
    editButton: {
      backgroundColor: '#4d8790',
      padding: 10,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    section: {
      marginTop: 20,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: isDarkTheme ? "#555" : "#ccc",
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? "#555" : "#ccc",
    },
    optionText: {
      fontSize: 18,
      color: isDarkTheme ? "#fff" : "#000",
      flex: 1,
      marginLeft: 15,
    },
  });

export default ProfileScreen;
