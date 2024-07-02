import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
// import Bottomsheet from "../Component/Bottomsheet";

const Role = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Let's start</Text>
      <Image
        source={require("../assets/Forfait-internationnaux.webp")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TopTabNav", { showCINImage: true })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TopNav", { screen: "TopNav" })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Client</Text>
        </TouchableOpacity>
      </View>
      {/* <Bottomsheet/> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    textAlign: "center",
    marginBottom:-50,
    marginVertical: 20,
  },
  image: {
    width: "80%",
    height: 200,
    marginVertical: 90,
    marginBottom: 300,
  },
  buttonContainer: {
    marginTop:20,
    flex: 1,
    justifyContent: "flex-end",
    width: "90%",
  },
  button: {
    
    backgroundColor: "#008080",
    borderRadius: 100,
    paddingVertical: 10,
    marginVertical: 50,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: "white",
  },
});

export default Role;