import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SessionStorage from "react-native-session-storage";
const Home = () => {
  const email = SessionStorage.getItem("email");
  console.log("email",email);
 
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})