import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { OnboardFlow } from "react-native-onboard";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Role", { screen: "Role" });
  };

  return (
    <OnboardFlow
      pages={[
        {
          title: "Welcome to my app",
          subtitle: "you have the best places to book here ",
          imageUri:
            "https://media.istockphoto.com/id/1281244663/vector/happy-tourists-choosing-hotel-and-booking-room-online.jpg?s=612x612&w=0&k=20&c=zoapw5nusmW8lcnoyKjvlhtfvReSBQE6m8bVWlHRdEE=",
        },
        {
          title: "You have a place  ",
          subtitle: "you can add it here that our customer can enjoy it ",
          imageUri:
            "https://media.istockphoto.com/id/1317765391/vector/online-booking-services-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=_50Ongy54IDZqlSLFV8jLLb5Jk_em1FTzU5C3PqAYH0=",
        },
      ]}
      onDone={handleDone}
    />
  );
}
