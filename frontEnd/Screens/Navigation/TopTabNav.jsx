import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Login from "../Registration/Login";
import SignUp from "../Registration/SignUp";
import ResImage from "../../Component/ResImg";
const Tab = createMaterialTopTabNavigator();
const TopTabNav = ({ route }) => {
  const { showCINImage } = route.params;
  return (
    <View>
      <ScrollView>
        <View>
        
          <Tab.Navigator style={{ height: 850 }}>
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
