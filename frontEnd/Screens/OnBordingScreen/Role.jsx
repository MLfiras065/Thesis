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

const Role = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Let's start!</Text>
        <Image
          src="https://github.com/Minte-grace/React-Native-Onboarding/blob/master/images/1.png?raw=true"
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.bottomContainer}>
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
    padding: 20,
    justifyContent: "space-between", 
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 50, 
  },
  headerText: {
    fontSize: 28,
    fontStyle: "italic",
    fontVariant: ["small-caps"],
    fontWeight: "bold", 
    lineHeight: 32, 
    fontFamily: "cursive", 
    textAlign: "center",
    marginBottom: 20, 
  },
  image: {
    width: "80%",
    height: 380,
  },
  button: {
    backgroundColor: "#4d8790",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10, 
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default Role;
