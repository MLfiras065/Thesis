import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
  const navigation = useNavigation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true); // Initial state for notifications

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  const styles = createStyles(isDarkTheme);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <Text style={styles.name}>Leo</Text>
        <Text style={styles.email}>Leo@gmail.com</Text>
        <Text style={styles.phone}>+45 234 567 89</Text>
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
