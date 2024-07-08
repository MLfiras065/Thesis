import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';
// import styles from "./ExtraFeatues.styles"
import axios from 'axios';
import { APP_API_URL } from '../../env';

const ExtraFeatures = () => {
    const route=useRoute()
    const {propertyid}=route.params
    const navigation = useNavigation();
    const [Bedroom,setBedroom]=useState(0)
    const[Bathroom,setBathroom]=useState(0)
    const [person,setPerson]=useState(0)
    const [Ac,setAc]=useState('')
    const[Pool,setPool]=useState('')
    const [features, setFeatures] = useState({bedroom:Bedroom,bathroom:Bathroom,person:person,Ac:Ac,pool:Pool});
    const [extra,setExtra]=useState([])
const addExtra=()=>{
    try {
       const res= axios.put(`${APP_API_URL}/property/extra/${propertyid}`,{Bedroom:Bedroom,Bathroom:Bathroom,person:person,Ac:Ac,Pool:Pool})
        setExtra(res.data)

        console.log("data",res.data);
    } catch (error) {
        console.log('err',error)
    }
}
    // const incrementFeature = (feature) => {
    //     setFeatures((prevFeatures) => ({
    //         ...prevFeatures,
    //         [feature]: prevFeatures[feature] + 1,
    //     }));
    // };

    // const decrementFeature = (feature) => {
    //     setFeatures((prevFeatures) => ({
    //         ...prevFeatures,
    //         [feature]: prevFeatures[feature] > 0 ? prevFeatures[feature] - 1 : 0,
    //     }));
    // };
const handleExtra=()=>{
    addExtra()
    navigation.navigate('img',{propertyid})
}
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.label}>bedroom</Text>
            <TextInput
              style={styles.input}
              placeholder="bedroom"
               keyboardType="numeric"
              value={Bedroom}
              onChangeText={setBedroom}
            />
  
            <Text style={styles.label}>bathroom</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="bathroom"
             keyboardType="numeric"
              value={Bathroom}
              onChangeText={setBathroom}
            />
  
            <Text style={styles.label}>person</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="person"
              
               keyboardType="numeric"
              value={person}
              onChangeText={setPerson}
            />
  
            <Text style={styles.label}>Ac</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                keyboardType="numeric"
                value={Ac}
                onChangeText={setAc}
              />
            </View>  
            <Text style={styles.label}>Ac</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                keyboardType="numeric"
                value={Pool}
                onChangeText={setPool}
              />
            </View>
          </View>
  
          <TouchableOpacity style={styles.button} onPress={()=>{handleExtra()}}>
                  <Text style={styles.buttonText}>Next</Text>
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
  
export default ExtraFeatures;
