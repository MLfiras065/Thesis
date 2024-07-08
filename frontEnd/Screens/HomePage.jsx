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
import { APP_API_URL } from "../env";
import SessionStorage from "react-native-session-storage";

const HomePage = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
const [rated,setRated]=useState([])
  const userid = SessionStorage.getItem("userid");

  const fetchProperties = () => {
    fetch(`${APP_API_URL}/property/getAll`)
      .then((response) => response.json()
    
    )
    
      .then((data) => {
        setProperties(data);
        SessionStorage.setItem("ownerid",data[0].ownerid)
        // console.log("property",data[0].ownerid)
        console.log('prop',data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  };
const getProperty=async()=>{
  fetch(`${APP_API_URL}/property/getAll`)
  .then((response) => response.json())
  .
 
then((data) => {
const filteredData = data.filter(property => property.rating > 3);
    
    

   

 
setRated(filteredData);
  }).
catch((error) => {
console.error("Error fetching properties:", error);
setLoading(false);
  });
}

  useEffect(() => {
    fetchProperties();
    getProperty()
  }, []);

  const navigateToCategory = (category) => {
    navigation.navigate("FilteredProperties", { category });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // const displayedProperties = userRole === 'owner' ? ownerProperties : properties;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text style={styles.locationText}>Tunisie</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />
        <Ionicons
          name="heart-outline"
          size={20}
          color="#000"
          style={styles.headerIcon}
        />
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
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigateToCategory("House")}
          >
            <Text style={styles.categoryText}>
              <FontAwesome6 name="house" size={18} color="black" /> House
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigateToCategory("Apartment")}
          >
            <Text style={styles.categoryText}>
              <MaterialIcons name="apartment" size={20} color="black" />{" "}
              Apartment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigateToCategory("Traditionnel House")}
          >
            <Text style={styles.categoryText}>
              <MaterialCommunityIcons
                name="hoop-house"
                size={24}
                color="black"
              />{" "}
              Traditionnel House
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigateToCategory("Guest House")}
          >
            <Text style={styles.categoryText}>
              <MaterialCommunityIcons
                name="greenhouse"
                size={24}
                color="black"
              />{" "}
              Guest House
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.tripsSection}>
        <View style={styles.tripsHeader}>
          <Text style={styles.sectionTitle}>
            {userRole === "owner" ? "Your Properties" : "Top Guest Houses"}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AllProperties")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rated.slice(0, 3).map((property) => (
            <View key={property.id} style={styles.tripItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductsDetails", {
                    propertyid: property.id,
                    userid: userid,
                  })
                }
              >
                <Text style={styles.tripTitle}>{property.Name}</Text>
                <Image
                  style={styles.tripImage}
                  source={{ uri: property.image[0] }}
                />
                <Text style={styles.tripLocation}>
                  <MaterialIcons name="location-pin" size={18} color="grey" />
                  {property.location}
                </Text>
                <Text style={styles.tripPrice}>
                  dt {property.Price} / Visit{" "}
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="#000"
                    style={styles.headerIcon}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      {userRole !== "owner" && (
        <View style={styles.houseSection}>
          <View style={styles.tripsHeader}>
            <Text style={styles.sectionTitle}>Top Houses</Text>
            <TouchableOpacity
             
              onPress={() => navigation.navigate("AllProperties")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
          {properties.map((property) => (
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
            {/* <Text style={styles.ratingText}>⭐ {property.rating}</Text> */}
            <Text style={styles.propertyPrice}>
              dt {property.Price} / Visit
            </Text>
          </View>
            </TouchableOpacity>
        </View>
      ))}
          </ScrollView>
        </View>
      )}
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
  ratingText: {
    fontSize: 16,
    color: "#555",
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
  categories: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryItem: {
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "#00796b",
  },
  tripsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAllText: {
    color: "#A9A9A9",
  },
  tripItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 9,
    marginRight: 10,
    width: 150,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 1,
  },
  tripImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tripLocation: {
    color: "#757575",
    marginBottom: 5,
  },
  tripPrice: {
    color: "#00796b",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  houseSection: {
    marginBottom: 20,
  },
  houseItem: {
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
  houseImage: {
    width: 150,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  houseInfo: {
    flex: 1,
    justifyContent: "center",
  },
  houseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  houseLocation: {
    color: "#757575",
    marginTop: 5,
  },
  TopTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
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
    marginBottom: 35,
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

export default HomePage;





