import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { styles } from './ProductDeatils.styles'; 
import { AntDesign } from '@expo/vector-icons'; 

const ProductDetails = ({ addToCart, deleteProduct, switchView, isOwner }) => {
  const product = {
    id: 1,
    name: 'RedFish Lake',
    description: 'A pool house is a free-standing structure that exists separate and apart from your home, and is located within close proximity to your pool. Although the fact that “house” is part of this structures name, dont be confuseda pool house is not intended as a living or guest quarter....',
    imgurl: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsah7c9evnal289z5fig/IMG%20Worlds%20of%20Adventure%20Admission%20Ticket%20in%20Dubai%20-%20Klook.jpg',
    additionalImages: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/df/66/c8/caption.jpg?w=1200&h=-1&s=1',
      'https://t3.ftcdn.net/jpg/01/35/13/46/360_F_135134679_Y85F9czGygCPbFymDgRqtBHIURhsPVbn.jpg',
      'https://images.photowall.com/products/57404/london-1.jpg?h=699&q=85',
      "https://media.istockphoto.com/id/637710754/photo/aerial-view-of-london-and-the-river-thames.jpg?s=612x612&w=0&k=20&c=UOe0zHdKQ99-EHi-2l54hLwDA5VNqJv_vKmYEDAK9xw=",
      "https://i.natgeofe.com/n/99790646-c5a4-4637-8f10-1d1c41ce3705/london_travel_3x4.jpg",
      "https://burst.shopifycdn.com/photos/london-uk.jpg?width=1000&format=pjpg&exif=0&iptc=0",
      "https://a.cdn-hotels.com/gdcs/production153/d1371/e6c1f55e-51ac-41d5-8c63-2d0c63faf59e.jpg",
      "https://www.totalhabitat.com/uploads/2/2/4/4/22443352/img-0006_orig.jpeg",
      "https://media.licdn.com/dms/image/C4D22AQF4HdCT2aHfiA/feedshare-shrink_800/0/1576509016630?e=2147483647&v=beta&t=GKSr1EZ_jLsu1VKEZt7erzuWueQ0-NjbdCq2fWaGvPQ",
    ],
    location: "idaho",
    rating: 4.5,
    price: 100, 
  };

  const [mainImage, setMainImage] = useState(product.imgurl);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false); 

  const openImageModal = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: mainImage }} style={styles.image} />

        <FlatList
          data={product.additionalImages}
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
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.ratingText}>⭐ {product.rating}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationText}><EvilIcons name="location" size={26} color="black" /> {product.location}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        {isOwner && (
          <View style={styles.buttonsContainer}>
            <Button title="Update Product" onPress={() => switchView('update', product)} />
            <Button title="Delete Product" onPress={() => deleteProduct(product.id)} />
          </View>
        )}

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => addToCart({ name: product.name, price: product.price, imgurl: product.imgurl })}
          >
            <Text style={styles.bookButtonText}>Book Now | ${product.price}</Text>
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
