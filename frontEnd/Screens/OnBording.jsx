import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from "expo-status-bar";
const OnBording = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, fontSize: 29 }}>
      <StatusBar hidden={true} />
      <Image
        source={require("../assets/9736aa20ec825a2ab2e66b3f8d92120c.jpg")}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "auto",
          marginBottom: 200,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          marginVertical: 20,
          marginTop: 380,
          marginLeft: 30,
          fontSize: 35,
          textAlign: "center",
          position: "absolute",
        }}
      >
        Book your
      </Text>
      <Text
        style={{
          display: "flex",
          marginVertical: 25,
          marginTop: 430,
          marginLeft: 30,
          color: "black",
          textAlign: "center",
          position: "absolute",
          fontSize: 35,
        }}
      >
        favorite place
      </Text>
      <TouchableOpacity
         onPress={()=>navigation.navigate('Role')}
        style={{
          fontSize: 46,
          flex: 1,
          marginTop: 600,
          color: "black",
          position: "absolute",
          borderRadius: 15,
          flex: 7,
          marginLeft: 150,
          marginHorizontal: 50,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          backgroundColor: "#19A7CE",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            justifyContent: "center",
            marginTop: 2,
            marginBottom: 4,
            marginRight: 4,
            marginLeft: 4,
          }}
        >
          Explore
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OnBording;
