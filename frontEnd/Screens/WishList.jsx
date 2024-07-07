import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./styles.jsx";
import { APP_API_URL } from "../env.js";
import SessionStorage from "react-native-session-storage";

const Wishlist = () => {
  const userid = SessionStorage.getItem("userid");
  const [wishlist, setWishlist] = useState([]);
  const [upd, setUpd] = useState(false);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${APP_API_URL}/wishlist/get/${userid}`);

      setWishlist(response.data);
      setUpd(!upd);
      console.log("wishlist", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = (id) => {
    axios
      .delete(`${APP_API_URL}/wishlist/del/${userid}`)
      .then(() => {
        setWishlist(wishlist.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmRemove = (id) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your wishlist?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => removeFromWishlist(id) },
      ]
    );
  };

  return (
    <View>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.tripTitle}>{item.Name}</Text>
            <Image style={styles.tripImage} source={{ uri: item.image }} />
            <Text style={styles.tripLocation}>
              <MaterialIcons name="location-pin" size={18} color="grey" />
              {item.location}
            </Text>
            <Text style={styles.tripPrice}>
              dt {item.Price} / Visit{" "}
              <Ionicons
                name="heart-outline"
                size={20}
                color="#000"
                style={styles.headerIcon}
              />
            </Text>
            <TouchableOpacity onPress={() => confirmRemove(item.id)}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Wishlist;
