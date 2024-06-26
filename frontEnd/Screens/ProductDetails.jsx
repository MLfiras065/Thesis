import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, TouchableOpacity, FlatList, Modal, ScrollView ,Alert} from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { styles } from './ProductDeatils.styles'; 
import { AntDesign } from '@expo/vector-icons'; 
import axios from "axios";
import { Provider } from "../Component/Auth";
import { useStripe } from '@stripe/stripe-react-native';
import { APP_API_URL } from '../env';
import { useRoute,useNavigation } from '@react-navigation/native';

const ProductDetails = ({ addToCart, deleteProduct, switchView, isOwner }) => {
  const route = useRoute();
  const propertyId = route.params?.propertyid;
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false); 
  const [amount, setAmount] = useState(0);
  const [isPaymentSheetInitialized, setIsPaymentSheetInitialized] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
      const getUserId = async () => {
          const id = await SessionStorage.getItem("userid");
          setUserId(id);
      };
      getUserId();
  }, []);

  const fetchPaymentSheetParams = async () => {
    try {
        const response = await axios.post(`${APP_API_URL}/payment/${propertyId}`);
        const { paymentIntent } = response.data;
        const { error } = await initPaymentSheet({
            merchantDisplayName: "finalproj",
            paymentIntentClientSecret: paymentIntent,
        });

        if (!error) {
            setIsPaymentSheetInitialized(true);
            setAmount(response.data.amount);
        } else {
            console.error('Error initializing payment sheet:', error);
        }
    } catch (error) {
        console.error('Error fetching payment sheet params:', error);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log('Success', 'Your order is confirmed!');
    }
  };
  useEffect(() => {
    if (userId) {
        fetchPaymentSheetParams();
    }
  }, [userId]);

  useEffect(() => {
    const getProperty = (id) => {
      axios.get(`${APP_API_URL}/property/getone/${id}`)
        .then((res) => {
          setProperty(res.data);
          setMainImage(res.data.image);  
        })
        .catch((err) => console.log(err));
    };

    if (propertyId) {
      getProperty(propertyId);
    }
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


  return (
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Text style={styles.title}>{property.Name}</Text>
          <Text style={styles.ratingText}>⭐ {property.rating}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}><EvilIcons name="location" size={26} color="black" /> {property.location}</Text>
        </View>

        <Text style={styles.description}>{property.description}</Text>

        {isOwner && (
          <View style={styles.buttonsContainer}>
            <Button title="Update Product" onPress={() => switchView('update', property)} />
            <Button title="Delete Product" onPress={() => deleteProduct(property.id)} />
          </View>
        )}

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => { openPaymentSheet() }}
          >
            <Text style={styles.bookButtonText}>Book Now | ${property.Price}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => setLiked(!liked)}
          >
            <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "red" : "black"} />
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
                <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
              )}
            </View>
          </View> 
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
