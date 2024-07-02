import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { styles } from "./ProductDeatils.styles";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useStripe } from "@stripe/stripe-react-native";
import { APP_API_URL } from "../env";
import { useRoute, useNavigation } from "@react-navigation/native";
import SessionStorage from "react-native-session-storage";
import AddComment from './AddComment';
import CommentCard from './CommentCard';
import Bottomsheet from "../Component/Bottomsheet";



const ProductDetails = ({ addToCart, deleteProduct, switchView, isOwner }) => {
  const route = useRoute();
 
  const propertyId = route.params?.propertyid;
  const userid = route.params?.userid;
  console.log("useridproperty", userid);
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [userId, setUserId] = useState(null);

  console.log("idpropertydetailes", propertyId);

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post(`${APP_API_URL}/payment/${222}`);
    const { paymentIntent } = response.data;
    const initResponse = initPaymentSheet({
      merchantDisplayName: "finalproj",
      paymentIntentClientSecret: paymentIntent,
    });
    return initResponse;
  };
  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
      alert(`Error code: ${error.code}`, error.message);
        console.error("Error presenting payment sheet:", error);
      } else {
        axios
          .get(`${APP_API_URL}/owner/booked/${userId}`)
          .then(() => {
          alert(
              "Payment Successful",
              "Your payment has been processed successfully!"
            );
          })
          .catch((error) => {
            console.error("Error processing payment:", error);
          });
      }
    } catch (error) {
      console.error("Error presenting payment sheet:", error);
    }
  };

  useEffect(() => {
    const getProperty = (id) => {
      axios
        .get(`${APP_API_URL}/property/getone/${id}`)
        .then((res) => {
          setProperty(res.data);
          SessionStorage.setItem("id",res.data.id);
          setMainImage(res.data.image);  
        })
        .catch((err) => console.log(err));
    };

    if (propertyId) {
      getProperty(propertyId);
    };
fetchPaymentSheetParams()
  }, [propertyId]);

  const openImageModal = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  if (!property) {
    return <Text>Loading...</Text>;
  }

  const addWishList = async (userid, propertyId) => {
    try {
      const res = await axios.post(
        `${APP_API_URL}/wishlist/add/${propertyId}/${userid}`,
        {
          UserId: userid,
          PropertyId: propertyId,
        }
      );
      alert("Wishlist added");

      console.log("wishlist", res.data);
      setLiked(true);
    } catch (error) {
      console.log(error);
      alert("Failed to add to wishlist");
    }
  };

  const handelWishList = () => {
    addWishList(userid, propertyId);
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: mainImage }} style={styles.image} />

        <FlatList
          data={property.additionalImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setMainImage(item)}>
              <Image source={{ uri: item }} style={styles.smallImage} />
            </TouchableOpacity>
          )}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.title}>{property.Name}</Text>
          <Text style={styles.ratingText}>⭐ {property.rating}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            <EvilIcons name="location" size={26} color="black" />{" "}
            {property.location}
          </Text>
        </View>

        <Text style={styles.description}>{property.description}</Text>
        
        {isOwner && (
          <View style={styles.buttonsContainer}>
            <Button
              title="Update Product"
              onPress={() => switchView("update", property)}
            />
            <Button
              title="Delete Product"
              onPress={() => deleteProduct(property.id)}
            />
          </View>
        )}

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              openPaymentSheet();
            }}
          >
            <Text style={styles.bookButtonText}>
              Book Now | ${property.Price}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handelWishList(property.id)}
          >
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeImageModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button title="Close" onPress={closeImageModal} />
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullScreenImage}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
     <Bottomsheet/>
    </View>
  );
};

export default ProductDetails;
