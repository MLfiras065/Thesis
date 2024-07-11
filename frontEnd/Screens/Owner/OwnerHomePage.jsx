import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
const width = Dimensions.get('window').width;
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
    marginLeft: 10,
  },
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
  categories: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  tripsSection: {
    marginBottom: 20,
  },
  tripsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: "#C0C0C0",
  },
  tripItem: {
    marginRight: 10,
  },
  tripImage: {
    width: width * 0.7,
    height: 200,
    borderRadius: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  tripLocation: {
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
  },
  tripPrice: {
    color:"#4d8790",
    marginTop: 5,
    fontSize: 14,
  },
  propertyItem: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  propertyImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
  },
  propertyDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  propertyLocation: {
    flexDirection: "row",
    alignItems: "center",
    color: "grey",
  },
  propertyPrice: {
    fontSize: 14,
    color:"#4d8790"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OwnerHomePage;