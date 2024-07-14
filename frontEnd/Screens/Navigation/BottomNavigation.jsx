import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../Profile/Profile";
import Chat from "../Chat/Chat";
import WishList from "../WishList/WishList";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import HomePage from "../HomePage/HomePage";
import SessionStorage from "react-native-session-storage";
import Map from "../Map/Map";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const email = SessionStorage.getItem("email");
  const ownerid = SessionStorage.getItem("ownerid");
  const navigation = useNavigation();
  const onPressHome = () =>
    navigation.navigate("Home", { screen: "Home" });

  const renderIconWithDot = (IconComponent, iconName, focused, iconSize = 22) => (
    <View style={styles.iconContainer}>
      <IconComponent name={iconName} size={iconSize} color={focused ? "#4d8790" : "gray"} />
      {focused && <View style={styles.dot} />}
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(Octicons, "home", focused),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(Feather, "map-pin", focused),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(Ionicons, "chatbox-ellipses-outline", focused),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(EvilIcons, "heart", focused, 34),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => renderIconWithDot(SimpleLineIcons, "user", focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    height: 60,
    borderTopWidth: 0,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4d8790",
    marginTop: 4,
  },
});
