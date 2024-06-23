import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnBording from './Screens/OnBording';
import Role from './Screens/Role';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Screens/Login';
import TopTabNav from './Screens/TopTabNav';
import SignUp from './Screens/SignUp';
import HomePage from './Screens/HomePage';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>

    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomePage} />
    <Stack.Screen name="OnBording" component={OnBording}   options={{ headerShown: false }}/>
   <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
     <Stack.Screen name="TopTabNav" component={TopTabNav}  options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={Login} />  
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="HomePage" component={HomePage} />
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
