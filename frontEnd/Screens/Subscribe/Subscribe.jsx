import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { PricingCard, lightColors } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import SessionStorage from "react-native-session-storage";
import Toast from "react-native-toast-message";
import { APP_API_URL } from "../../env";

const Subscribe = () => {
  const navigation = useNavigation();
  const [postCount, setPostCount] = useState(0);
  const ownerid = SessionStorage.getItem("ownerid");

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const res = await axios.get(`${APP_API_URL}/property/count/${ownerid}`);
        setPostCount(res.data.count);
      } catch (error) {
        console.error("Failed to fetch post count", error);
      }
    };

    fetchPostCount();
  }, []);

  const handleSubscription = async (plan) => {
    try {
      if (postCount === 0) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'You can post for free!'
        });
       
        navigation.navigate("add");
      } else {
        if (plan === "Free trial") {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Free trial is only available for the first post.'
          });
          return;
        }

       
        const res = await axios.post(`${APP_API_URL}/subscribe`, {
          ownerid,
          plan,
        });

        if (res.data.success) {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Subscription successful!'
          });
          
          navigation.navigate("Add");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Subscription failed. Please try again.'
          });
        }
      }
    } catch (error) {
      console.error("Subscription error", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred. Please try again.'
      });
    }
  };

  return (
    <>
      <ScrollView >
        <PricingCard
          color={lightColors.primary}
          title="Free trial"
          price="For one month"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("Free trial"),
          }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="3 month"
          price="$19"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("3 month"),
          }}
        />
        <PricingCard
          color={lightColors.secondary}
          title="6 month"
          price="$49"
          info={["1 User", "add multiple homes"]}
          button={{
            title: "GET STARTED",
            onPress: () => handleSubscription("6 month"),
          }}
        />
      </ScrollView>
      <Toast />
    </>
  );
};

export default Subscribe