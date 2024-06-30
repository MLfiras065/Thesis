import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ResImage from "../Component/ResImg";
import LogInUser from "./ClientLogIn";
import SignUp from "./SignUp";
const Tab = createMaterialTopTabNavigator();
const TopNav = ({ route }) => {
  const { showCINImage } = route.params;
  return (
    <View>
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          <ResImage
            source={
              "https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
            }
            width={"100%"}
            height={200}
            mode={"contain"}
          />

          <Tab.Navigator style={{ height: 600 }}>
            <Tab.Screen name="LogIn" component={LogInUser} />
            <Tab.Screen
              name="SignUp"
              component={SignUp}
              initialParams={{ showCINImage: showCINImage }}
            />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default TopNav;
