import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet,TouchableOpacity,Image,Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { APP_API_URL } from "../../env";
const Search = () => {
  const [searchKey, setSearchKey] = useState('')
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const search = () => {
    try {
      const filteredData = properties.filter((property) => 
        property.Name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredProperties(filteredData);
      
    } catch (error) {
      console.error('Error while searching:', error);
    }
  };

useEffect(()=>{
   const fetchOwnerProperties = () => {
    fetch(`${APP_API_URL}/property/getAll/${1}`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }
  fetchOwnerProperties()
},[])

  return (
    <View style={styles.searchForm}>
         <View style={styles.searchContainer}>
      <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchKey}
          onChangeText={setSearchKey}
        />
        <TouchableOpacity onPress={search}>
          <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
     {filteredProperties.map((property) => (
          <View key={property.id} style={styles.propertyItem}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  propertyid: property.id,
                  userid: userid,
                })
              }
            >
              <Image
                style={styles.propertyImage}
                source={{ uri: property.image[0] }}
              />
              <View style={styles.propertyDetails}>
                <Text style={styles.propertyTitle}>{property.Name}</Text>
                <Text style={styles.propertyLocation}>
                  <MaterialIcons name="location-pin" size={18} color="grey" />
                  {property.location}
                </Text>
                <Text style={styles.propertyPrice}>
                  dt {property.Price} / Visit{" "}
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="#000"
                    style={styles.headerIcon}
                  />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
    </View>
  );
}
const styles=StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  
})

export default Search;
