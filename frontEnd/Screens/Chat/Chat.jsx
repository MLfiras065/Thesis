import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./ChatStyles";
import AllChats from "./AllChats";
import axios from "axios";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";

const Chat = () => {
  const id=SessionStorage.getItem('userid')
  const [rooms, setRooms] = useState([]);
  const getRoom=async()=>{
    try {
   const res= await axios.get(`${APP_API_URL}/chat/getRoom/${id}`)
  setRooms(res.data)  
  console.log("rooms",res.data);
  } catch (error) {
      console.log("err",error);
    }''
  }

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          <Pressable onPress={() => console.log("Button Pressed!")}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <AllChats item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>there is no chat !</Text>
            <Text>please chat with the owner </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Chat;
