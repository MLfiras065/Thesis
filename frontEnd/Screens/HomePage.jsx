import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = () => {
    fetch('http://192.168.104.13:4000/api/property/getAll')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text style={styles.locationText}>Tunisie</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />
        <Ionicons name="heart-outline" size={20} color="#000" style={styles.headerIcon} />
        <Ionicons name="notifications-outline" size={20} color="#000" style={styles.headerIcon} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
        
      </View>
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryItem}><Text style={styles.categoryText}><FontAwesome6 name="house" size={18} color="black" /> House</Text></View>
          <View style={styles.categoryItem}><Text style={styles.categoryText}><MaterialIcons name="apartment" size={20} color="black" /> Apartment</Text></View>
          <View style={styles.categoryItem}><Text style={styles.categoryText}><MaterialCommunityIcons name="hoop-house" size={24} color="black" /> Traditionnel House</Text></View>
          <View style={styles.categoryItem}><Text style={styles.categoryText}><MaterialCommunityIcons name="greenhouse" size={24} color="black" /> Guest House</Text></View>
        </ScrollView>
      </View>
      <View style={styles.tripsSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>Top Guest Houses</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {properties.map((property) => (
            <View key={property.id} style={styles.tripItem}>
              <Text style={styles.tripTitle}>{property.Name}</Text>
              <Image style={styles.tripImage} source={{ uri: property.image }} />
              
              <Text style={styles.tripLocation}><MaterialIcons name="location-pin" size={18} color="grey" />{property.location}</Text>
              <Text style={styles.tripPrice}>dt {property.Price} / Visit      <Ionicons name="heart-outline" size={20} color="#000" style={styles.headerIcon} /></Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.houseSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>Top Houses</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>
        <ScrollView >
          {properties.map((property) => (
            <View key={property.id} style={styles.tripItem}>
               
             
              <Image style={styles.tripImage} source={{ uri: property.image }} /> 
              <Text style={styles.tripTitle}>{property.Name}</Text>
              
              <Text style={styles.tripPrice}>dt {property.Price} / Visit <Ionicons name="heart-outline" size={20} color="#000" style={styles.headerIcon} /></Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
  },
  headerIcon: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categories: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#00796b',
  },
  tripsSection: {
    marginBottom: 20,
  },
  tripsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seeAllText: {
    color: '#00796b',
  },
  tripItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  tripImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripLocation: {
    color: '#757575',
    marginBottom: 5,
  },
  tripPrice: {
    color: '#00796b',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseSection: {
    marginBottom: 20,
  },
  desc:{
    alignItems: 'right',
  }
});

export default HomePage;
