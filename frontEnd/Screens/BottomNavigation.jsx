import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from './Profile';
import Chat from './Chat';
import WishList from './WishList';
import { AntDesign } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomePage from './HomePage';
import SessionStorage from 'react-native-session-storage';

const Tab = createBottomTabNavigator();
const BottomNavigation=()=>{
  const email=SessionStorage.getItem('email')
  const navigation = useNavigation()
const  onPressHome=()=>navigation.navigate("HomePage",{screen:"HomePage"})
    return (
        <Tab.Navigator style={styles.mainContainer} >
          <Tab.Screen name="HomePage" component={HomePage}
           options={{
            
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" onPress={onPressHome} />
            ),
          }} />
          <Tab.Screen name="WishList" component={WishList} 
            options={{
            
              tabBarIcon: () => (
              
                <EvilIcons name="heart" size={34} color="black" />
              ),
            }}/>
          <Tab.Screen name="Chat" component={Chat}
            options={{
              
              tabBarIcon: () => (
                <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
              
              ),
            }} />
        
          <Tab.Screen name="Profile" component={Profile} 
              options={{
                
                tabBarIcon: () => (
                  <SimpleLineIcons name="user" size={24} color="black" />
                
                ),
              }}
          />
        </Tab.Navigator>
      );
}
export default BottomNavigation
const styles=StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 55,
    backgroundColor: "#182028",
    borderRadius: 25,
    // marginHorizontal: 0.1
  }
})