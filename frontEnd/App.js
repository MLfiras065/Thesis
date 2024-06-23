import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider}  from "./Component/Auth.jsx"
import OnBording from './Screens/OnBording';
import Role from './Screens/Role';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './Screens/Login';
import TopTabNav from './Screens/TopTabNav';
import BottomNavigation from './Screens/BottomNavigation.jsx';
import SignUp from './Screens/SignUp';
import LogInUser from './Screens/ClientLogIn.jsx';
import TopNav from './Screens/TopNav.jsx';
import Subscribe from './Screens/Subscribe.jsx';
// import Home from './Screens/Home.jsx';
const Stack = createStackNavigator();
export default function App() {
  return (
   <Provider >
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="OnBording" component={OnBording}   options={{ headerShown: false }}/>
    {/* <Stack.Screen name="Sub" component={Subscribe}   options={{ headerShown: false }}/> */}
    <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
     <Stack.Screen name="TopTabNav" component={TopTabNav}  options={{ headerShown: false }}/>
     <Stack.Screen name="TopNav" component={TopNav}  options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} />  
    <Stack.Screen name="SignUp" component={SignUp} />  
    <Stack.Screen name="LogIn" component={LogInUser} />  
    <Stack.Screen name="Navigation" component={BottomNavigation}  options={{headerShown:false}}/>
    {/* <Stack.Screen name="Home" component={Home}  options={{headerShown:false}}/> */}
  </Stack.Navigator>
    </NavigationContainer>
   </Provider>
    
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
