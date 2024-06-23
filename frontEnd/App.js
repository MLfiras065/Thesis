import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import OnBording from './Screens/OnBording';
import Role from './Screens/Role';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import TopTabNav from './Screens/TopTabNav';
import SignUp from './Screens/SignUp';
import Search from "./Screens/Search"
import React from 'react';
import ProductDetails from './Screens/ProductDetails'; 
import Profile from "./Screens/Profile"
import EditProfile from "./Screens/EditProfile"
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {/* <Stack.Screen name="OnBording" component={OnBording}   options={{ headerShown: false }}/>
   <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
     <Stack.Screen name="TopTabNav" component={TopTabNav}  options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} />  
    <Stack.Screen name="SignUp" component={SignUp} /> 
    <Stack.Screen name="Search" component={Search} />  */}
    <Stack.Screen name="ProductDetails" component={ProductDetails} /> 
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />  */}
  </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
