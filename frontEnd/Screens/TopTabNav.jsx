import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ResImage from "../Component/ResImg";
const Tab = createMaterialTopTabNavigator();
const TopTabNav = ({ route }) => {
  const { showCINImage } = route.params;
  return (
    <View>
      <ScrollView>
        <View>
          {/* <ResImage
            source={
              "https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg"
            }
            width={"100%"}
            height={200}
            mode={"contain"}
          /> */}
          <Tab.Navigator style={{ height: 800 }}>
            <Tab.Screen name="Login" component={Login} />
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

export default TopTabNav;
