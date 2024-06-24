import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { APP_API_URL } from '../env';


function ProfileScreen({route}) {
  const navigation = useNavigation();
  const param=route.params.email
  const [item, setItem] = useState([]);
  const [FirstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [LastName, setLastName] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
 const getEmail= async()=>{
  const res= await axios.get(`${APP_API_URL}/owner/getOwner/${param}`)
  try {
  setEmail(res.data.email)
  setFirstName(res.data[1].FirstName)
  setLastName(res.data[1].LastName)
  setItem(res.data[1])
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
 }
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  const styles = createStyles(isDarkTheme);
useEffect(()=>{
getEmail()
},[])
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <Text style={styles.name}>firstname{item.FirstName} </Text>
        <Text style={styles.email}>last name{item.LastName}</Text>
        <Text style={styles.phone}>email{item.email}</Text>
      </View>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile',{screen:"EditProfile"})}>
        <Text style={styles.optionText}>Edit profile information</Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={toggleTheme}>
        <Text style={styles.optionText}>Theme</Text>
        <Text style={styles.optionText}>{isDarkTheme ? 'Dark mode' : 'Light mode'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Contact us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Privacy policy</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (isDarkTheme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkTheme ? '#333' : '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkTheme ? '#fff' : '#000',
  },
  email: {
    fontSize: 16,
    color: isDarkTheme ? 'lightgray' : 'gray',
  },
  phone: {
    fontSize: 16,
    color: isDarkTheme ? 'lightgray' : 'gray',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: isDarkTheme ? '#555' : '#ccc',
  },
  optionText: {
    fontSize: 18,
    color: isDarkTheme ? '#fff' : '#000',
  },
});

export default ProfileScreen;
