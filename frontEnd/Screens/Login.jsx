import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { APP_API_URL } from "../env";
import SessionStorage from "react-native-session-storage";
import axios from "axios";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState('');

  const logIn = async (navigation) => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(`${APP_API_URL}/owner/log/${email}`, {
        Password: password,
      });

      console.log("data", res.data);
      SessionStorage.setItem("emailOwner", email);
      SessionStorage.setItem("ownerid", res.data.id);
      SessionStorage.setItem("ownerToken", res.data.token);
      
      console.log("ownerid", res.data.id);
      console.log("ownertoken", res.data.token);
      alert("Login successful");

      navigation.navigate("OwnerNav", { screen: "BottomNavigation" });;
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handleLogIn = () => {
    logIn(navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
      <View style={styles.wrapper}>
        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputWrapper(email ? "blue" : "gray")}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={"gray"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper(password ? "blue" : "gray")}>
          <MaterialCommunityIcons
            name="lock-outline"
            size={20}
            color={"gray"}
          />
          <TextInput
            style={styles.input}
            onChangeText={(pass) => setPassword(pass)}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.options}>
          
          
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 50,
  },

  wrapper: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: "white",
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 15,
  }),
  input: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  
  
  button: {
    backgroundColor: "#4d8790",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
