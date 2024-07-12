import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { APP_API_URL } from '../../../env';

const ExtraFeatures = () => {
  const route = useRoute();
  // const { propertyId } = route.params;
  const navigation = useNavigation();
  const [Bedroom, setBedroom] = useState(0);
  const [Bathroom, setBathroom] = useState(0);
  const [Person, setPerson] = useState(0);
  const [Ac, setAc] = useState('');
  const [Pool, setPool] = useState('');

  const updateExtraFeatures = async () => {
    try {
      const res = await axios.put(`${APP_API_URL}/property/extra/${5}`, {
        Bedroom,
        Bathroom,
        Person,
        Ac,
        Pool,
      });
    
      console.log('Extra features updated successfully:', res.data);
      navigation.navigate('EditImage');
    } catch (error) {
      console.error('Error updating extra features:', error);
    
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Bedroom</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of bedrooms"
            keyboardType="numeric"
            value={Bedroom.toString()}
            onChangeText={(text) => setBedroom(Number(text))}
          />

          <Text style={styles.label}>Bathroom</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of bathrooms"
            keyboardType="numeric"
            value={Bathroom.toString()}
            onChangeText={(text) => setBathroom(Number(text))}
          />

          <Text style={styles.label}>Person</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter capacity of persons"
            keyboardType="numeric"
            value={Person.toString()}
            onChangeText={(text) => setPerson(Number(text))}
          />

          <Text style={styles.label}>AC</Text>
          <TextInput
            style={styles.input}
            placeholder="Yes or No"
            value={Ac}
            onChangeText={setAc}
          />

          <Text style={styles.label}>Pool</Text>
          <TextInput
            style={styles.input}
            placeholder="Yes or No"
            value={Pool}
            onChangeText={setPool}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={updateExtraFeatures}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
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

export default ExtraFeatures;
