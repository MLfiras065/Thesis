import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./OwnerChatStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { APP_API_URL } from "../../env";

const OwnerAllChats = ({ data }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
     
      const userRequest = axios.get(`${APP_API_URL}/user/user/${data}`); 
      const [userResponse] = await Promise.all([userRequest]);
  
     
      console.log('userchat', userResponse.data);
      setUser(userResponse.data);
  
    } catch (error) {
      console.log("error", error);
    }
  }
  
  useEffect(() => {
    getUser();
  }, [data]);
  

  const handleNavigation = () => {
    navigation.navigate("ownerchats", {
      userid: data,
    });
  };

  return (
    <Pressable
      style={styles.cchat}
      onPress={() => {
        handleNavigation();
      }}
    >
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>
            {userResponse ? userResponse.FirstName : "Loading..."}
          </Text>
          <Text style={styles.cmessage}>
            { "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            { "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default OwnerAllChats;
