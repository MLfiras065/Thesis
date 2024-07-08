import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location"
const Map = () => {
  const [placeName, setPlaceName] = useState('');
  const [location, setLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const handleSearch =() => {
 
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${"tunis"}&key=${"AIzaSyDYm4cfAj3Lrk6HqMJZHGeB1JevFbEC55o"}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ latitude:lat , longitude:lng});
          console.log("map",data.results);
        }
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  };

  const handleMapReady = () => {
    setMapReady(true);
  };
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);
  return (
    <View style={styles.container}>
         {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
          )}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a place name"
          value={placeName}
          onChangeText={setPlaceName}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
});

export default Map;
