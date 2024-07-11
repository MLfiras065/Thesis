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
  RefreshControl,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { APP_API_URL } from "../../env";
import SessionStorage from "react-native-session-storage";

const OwnerHomePage = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const ownerId = SessionStorage.getItem("ownerid");
  const [refreshing, setRefreshing] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletingProperty, setDeletingProperty] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
  };

  useEffect(() => {
    fetchOwnerProperties();
  }, [refreshing]);

  const handleUpdateProperty = (property) => {
    setLoading(true);
    fetch(`${APP_API_URL}/property/update/${2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        setEditingProperty(null);
        fetchOwnerProperties();
      })
      .catch((error) => {
        console.error("Error updating property:", error);
        setLoading(false);
      });
  };

  const handleDeleteProperty = (propertyId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this property?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setLoading(true);
            fetch(`${APP_API_URL}/property/delet/${6}`, {
              method: "DELETE",
            })
              .then(() => {
                setLoading(false);
                fetchOwnerProperties();
              })
              .catch((error) => {
                console.error("Error deleting property:", error);
                setLoading(false);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <Text style={styles.locationText}>Tunisie</Text>
        <Ionicons name="chevron-down-outline" size={20} color="#000" />
        <Ionicons name="notifications-outline" size={20} color="#000" style={styles.headerIcon} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <Ionicons name="search-outline" size={20} color="#000" style={styles.searchIcon} />
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
                    propertyId: property.id,
                    userId: ownerId,
                  })
                }
              >
                <Image style={styles.propertyImage} source={{ uri: property.image[0] }} />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyTitle}>{property.Name}</Text>
                  <Text style={styles.propertyLocation}>
                    <MaterialIcons name="location-pin" size={18} color="grey" />
                    {property.location}
                  </Text>
                  <Text style={styles.propertyPrice}>dt {property.Price} / Visit</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setEditingProperty(property)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteProperty(property.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      {editingProperty && (
        <EditProperty
          property={editingProperty}
          onUpdate={handleUpdateProperty}
          onCancel={() => setEditingProperty(null)}
        />
      )}
    </ScrollView>
  );
};

const EditProperty = ({ property, onUpdate, onCancel }) => {
  const [name, setName] = useState(property.Name);
  const [location, setLocation] = useState(property.location);
  const [price, setPrice] = useState(property.Price.toString());

  return (
    <View style={styles.editContainer}>
      <Text style={styles.title}>Edit Property</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => onUpdate({ ...property, Name: name, location, Price: parseFloat(price) })}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const width = Dimensions.get("window").width;
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
  tripsSection: {
    marginBottom: 20,
  },
  tripsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: "#C0C0C0",
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
    fontSize: 14,
  },
  propertyPrice: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  updateButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default OwnerHomePage;