import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { APP_API_URL } from "../env";
import SessionStorage from "react-native-session-storage";
import axios from "axios";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const logIn = async (navigation) => {
    if (!email || !Password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(`${APP_API_URL}/user/log/${email}`, {
        Password: Password,
      });

      console.log("data", res.data);
      SessionStorage.setItem("emailOwner", email);
      SessionStorage.setItem("ownerid", res.data.id);
      SessionStorage.setItem("ownerToken", res.data.token);
      console.log("ownerid", res.data.id);
      console.log("ownertoken", res.data.token);
      alert("Login successful");

      navigation.navigate("Navigation", { screen: "BottomNavigation" });
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
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper(email ? "blue" : "gray")}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={"gray"}
              />
              <View style={{ marginLeft: 5 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Email"
                />
              </View>
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper(Password ? "blue" : "gray")}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color={"gray"}
              />
              <View style={{ marginLeft: 5 }}>
                <TextInput
                  onChangeText={(pass) => setPassword(pass)}
                  value={Password}
                  placeholder="Password"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={{ marginTop: 30, borderRadius: 50 }}>
              <Button
                title="Login"
                onPress={() => {
                  handleLogInUser(navigation);
                }}
                style={{ marginTop: 30, borderRadius: 80, borderWidth: 5 }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }),
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontsize: 10,
    marginBottom: 4,
    marginEnd: 4,
    textAlign: "left",
  },
});
