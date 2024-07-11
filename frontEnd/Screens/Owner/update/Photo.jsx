import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { APP_API_URL } from '../../env';

const Photo = () => {
  const route = useRoute();
  const { propertyId } = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImages([...images, result.base64]);
    }
  };

  const uploadImages = async () => {
    try {
      const res = await axios.put(`${APP_API_URL}/property/images/${propertyId}`, {
        images,
      });
      
      console.log('Images uploaded successfully:', res.data);
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Error uploading images:', error);
      // Handle error uploading images
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />
        ))}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImages}>
        <Text style={styles.uploadButtonText}>Upload Images</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Photo;
