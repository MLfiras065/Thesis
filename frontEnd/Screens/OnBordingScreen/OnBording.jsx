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
          title: "Welcome to TuniGo",
          subtitle: "you have the best places to book here ",
          imageUri:
            "https://static.wixstatic.com/media/b4e344_65c21534e6d24c13ba53663395a53d4a~mv2_d_2816_3004_s_4_2.png/v1/fill/w_750,h_800,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/communication-png-passport-travel-visa-c.png",
        },
        {
          title: "You have a place  ",
          subtitle: "you can add it here that our customer can enjoy it ",
          imageUri:
            "https://www.thecurvehotel.com.qa/storage/booking.png",
            
            
        },
      ]}
      onDone={handleDone}
    
    />
  );
}
