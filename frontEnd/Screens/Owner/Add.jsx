
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { APP_API_URL } from '../../env';

const Add = () => {
  const navigation = useNavigation();
  const [Name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [Price, setPrice] = useState('');
  const [property, setProperty] = useState([]);
  const ownerid = SessionStorage.getItem("ownerid");

  const addProperty = async () => {
    if (!Name || !description || !location || !Price) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all the fields',
        position: 'bottom',
        bottomOffset:800,
      });
      return;
    }

    try {
      const res = await axios.post(`${APP_API_URL}/property/post/${ownerid}`, {
        Name: Name,
        Price: Price,
        description: description,
        location: location
      });
      console.log("post prop", res);
      setProperty(res.data);
      console.log("data", res.data);
      console.log('id', res.data.id);
      navigation.navigate('Extra', { propertyid: res.data.id });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while adding the property',
        position: 'bottom',
        bottomOffset:800,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={Name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter product description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter the location"
            multiline
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Price</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={Price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={addProperty}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  descriptionInput: {
    height: 100,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  dollarSign: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  priceInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Add;

