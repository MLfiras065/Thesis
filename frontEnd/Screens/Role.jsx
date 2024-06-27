import { View, Text, SafeAreaView, Image,TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native'

const Role = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text
        style={{
          display: "flex",
          fontSize: 28,
          marginLeft: 140,
          marginHorizontal: 50,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        Let's start 
      </Text>
      <Image 
      source={require('../assets/Forfait-internationnaux.webp')}
resizeMode="cover"
style={{marginLeft:70,
    marginBottom:100
}}
      />
        <TouchableOpacity
          onPress={() => navigation.navigate('TopNav', { showCINImage: true })}
        style={{
          fontSize: 46,
          flex: 1,
          marginTop: 400,
          color: "black",
          position: "absolute",
          borderRadius: 15,
          flex: 7,
          marginLeft: 120,
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
            marginTop: 4,
            marginBottom: 4,
            marginRight: 40,
            marginLeft: 40,
          }}
        >
          Owner
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
         onPress={()=>navigation.navigate('TopNav',{screen:"TopNav"})}
        style={{
          fontSize: 46,
          flex: 1,
          marginTop: 480,
          color: "black",
          position: "absolute",
          borderRadius: 15,
          flex: 7,
          marginLeft: 120,
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
            marginTop: 4,
            marginBottom: 4,
            marginRight: 40,
            marginLeft: 40,
          }}
        >
          Client
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Role;

