import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import React from "react";
import { OnboardFlow } from 'react-native-onboard';
import { useNavigation } from "@react-navigation/native";
// import LottieView from 'lottie-react-native';
import ResImage from "../Component/ResImg";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Role",{screen:"Role"});
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <OnboardFlow
    pages={[
      {
        title: 'Welcome to my app',
        subtitle: 'This is page 1',
        imageUri: 'https://media.istockphoto.com/id/1281244663/vector/happy-tourists-choosing-hotel-and-booking-room-online.jpg?s=612x612&w=0&k=20&c=zoapw5nusmW8lcnoyKjvlhtfvReSBQE6m8bVWlHRdEE=',
      },
      {
        title: 'Page 2 header',
        subtitle: 'This is page 2',
        imageUri: 'https://media.istockphoto.com/id/1317765391/vector/online-booking-services-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=_50Ongy54IDZqlSLFV8jLLb5Jk_em1FTzU5C3PqAYH0=',
      }
    ]}
    onDone={handleDone}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 1,
    height: width,
  },
  doneButton: {
    padding: 20,
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'contain'
  }
});
