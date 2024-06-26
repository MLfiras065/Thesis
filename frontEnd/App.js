import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from './Component/Auth.jsx';
import OnBording from './Screens/OnBording';
import Role from './Screens/Role';
import Login from './Screens/Login';
import TopTabNav from './Screens/TopTabNav';
import BottomNavigation from './Screens/BottomNavigation.jsx';
import SignUp from './Screens/SignUp';
import LogInUser from './Screens/ClientLogIn.jsx';
import TopNav from './Screens/TopNav.jsx';
import Search from './Screens/Search';
import Subscribe from './Screens/Subscribe.jsx';
import ProductDetails from './Screens/ProductDetails'; 
import Profile from './Screens/Profile';
import EditProfile from './Screens/EditProfile';
import HomePage from './Screens/HomePage';
import FilteredProperties from './Screens/FilteredProperties.jsx';
import AllPropertiesPage from './Screens/AllPropertiesPage';  // Import the new screen
import { StripeProvider } from "@stripe/stripe-react-native";
// import Chat from './Screens/Chat.jsx';
const Stack = createStackNavigator();

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51O7xr1FBTzNlZioJG5eArUt9FVglGo9PSPmDI5EU7STowGqZPxZbI8FOkfGhlqX6CGiYILjvtYntdB0CtMiD7k4g00pipm25C1">
    <Provider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="OnBording" component={OnBording} options={{ headerShown: false }}/>
          <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
          <Stack.Screen name="TopTabNav" component={TopTabNav} options={{ headerShown: false }}/>
          <Stack.Screen name="TopNav" component={TopNav} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} />  
          <Stack.Screen name="SignUp" component={SignUp} /> 
          <Stack.Screen name="LogIn" component={LogInUser} />  
          <Stack.Screen name="Navigation" component={BottomNavigation} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="FilteredProperties" component={FilteredProperties} />
          <Stack.Screen name="AllProperties" component={AllPropertiesPage} options={{ title: 'All Properties' }} />
          <Stack.Screen name="Search" component={Search} />  
          <Stack.Screen name="FiltredProperties" component={FilteredProperties} />  
          <Stack.Screen name="ProductDetails" component={ProductDetails} /> 
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} /> 
          {/* <Stack.Screen name="Chat" component={Chat} />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </StripeProvider>
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
