import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./ChatStyles";
import AllChats from "./AllChats";

const Chat = () => {
  const [rooms, setRooms] = useState([]);

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
