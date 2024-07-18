import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./OwnerChatStyle";
import { useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";


const OwnerAllChats = ({ iduser }) => {
  const navigation = useNavigation();
  const [owner,setOwner]=useState([])
  const ownerId=SessionStorage.getItem('ownerid')
  console.log("testitem", iduser);
  const getOwner=async()=>{
    const res= await axios.get(`${APP_API_URL}/user/user/${ownerId}`)
    try {
setOwner(res.data)
console.log('owner',res.data);

      
    } catch (error) {
        console.log("error",error);
    }
}
useEffect(()=>getOwner(),[])
  const handleNavigation = () => {
    navigation.navigate("ownerchats", {
      userid: iduser,
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
          <Text style={styles.cusername}>{iduser}</Text>

          <Text style={styles.cmessage}>
            {iduser?.message ? iduser.message : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>{iduser?.time ? iduser.time : "now"}</Text>
        </View>
      </View>
    </Pressable>
  );
};
export default OwnerAllChats;
