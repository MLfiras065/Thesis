import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";

const OwnerHomePage = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerid = SessionStorage.getItem("ownerid");

  const fetchOwnerProperties = () => {
    fetch(`${APP_API_URL}/property/getAll/${ownerid}`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOwnerProperties();
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
        
        <Ionicons
          name="notifications-outline"
          size={20}
          color="#000"
          style={styles.headerIcon}
        />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Ionicons
          name="search-outline"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.tripsSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>Your Properties</Text>
          <TouchableOpacity onPress={() => navigation.navigate("add")}>
            <Text style={styles.seeAllText}>Add New Property</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {properties.map((property) => (
            <View key={property.id} style={styles.propertyItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductsDetails", {
                    propertyid: property.id,
                    userid: ownerid,
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
                    <MaterialIcons
                      name="location-pin"
                      size={18}
                      color="grey"
                    />
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}>
                    dt {property.Price} / Visit{" "}
                    
                  </Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
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
  tripsSection: {
    marginBottom: 20,
  },
  tripsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#A9A9A9",
  },
  propertyItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 1,
  },
  propertyImage: {
    width: 150,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    color: "#757575",
    marginBottom: 5,
  },
  propertyPrice: {
    color: "#00796b",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});

export default OwnerHomePage;
