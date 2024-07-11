import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Profilee";
// import Chat from "./Chat";
// import WishList from "./WishList";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OwnerHomePage from "./OwnerHomePage";
import SessionStorage from "react-native-session-storage";

const Tab = createBottomTabNavigator();
const OwnerBottomNavigation = () => {
  const email = SessionStorage.getItem("email");
  const ownerid = SessionStorage.getItem("ownerid");
  const navigation = useNavigation();
  const onPressHome = () =>
    navigation.navigate("OwnerHomePage", { screen: "OwnerHomePage" });
  return (
    <Tab.Navigator style={styles.mainContainer}>
      <Tab.Screen
        name="HomePage"
        component={OwnerHomePage}
        options={{
          tabBarIcon: () => (
            <AntDesign
              name="home"
              size={24}
              color="black"
              onPress={onPressHome}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: () => <EvilIcons name="heart" size={34} color="black" />,
        }}
      /> */}
      {/* <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <SimpleLineIcons name="user" size={24} color="black" />
          ),
        }}
        
      />
    </Tab.Navigator>
  );
};
export default OwnerBottomNavigation;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 55,
    backgroundColor: "#182028",
    borderRadius: 25,
  },
});
