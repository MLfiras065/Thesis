import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./OwnerChatStyle";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import axios from "axios";


const OwnerAllChats = ({ data }) => {
  const navigation = useNavigation();
  const [user,setUser]=useState([])
  console.log("iduser====",data);
  // const ownerId=SessionStorage.getItem('ownerid')
  console.log("testitem", data);
  console.log("user",user);
  const getUser=async()=>{
    const res= await axios.get(`${APP_API_URL}/user/user/${1}`)
    try {
      console.log('userchat',res.data);
      setUser(res.data)

      
    } catch (error) {
        console.log("error",error);
    }
}
useEffect(()=>{getUser()},[user])
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
          <Text style={styles.cusername}>test{data.FirstName}</Text>

          <Text style={styles.cmessage}>
            {data?.message ? data.message : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>{data?.time ? data.time : "now"}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default OwnerAllChats;
