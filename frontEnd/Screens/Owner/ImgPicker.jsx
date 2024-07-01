import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const Photo = () => {
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const navigation = useNavigation();

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = result.assets[0].uri;
      setImageUrls(updatedUrls);
      alert('Image added');
    }
  };

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 24, marginTop: 80, fontSize: 45, fontWeight: 'bold' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Pick your photos and videos</Text>
        <View style={{ marginTop: 20, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 10 }}>
            {imageUrls.slice(0, 3).map((url, index) => (
              <TouchableOpacity
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}
                key={index}
                onPress={() => pickImage(index)}
              >
                {url ? (
                  <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <EvilIcons name="image" size={24} color="black" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 20, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 10 }}>
            {imageUrls.slice(3).map((url, index) => (
              <TouchableOpacity
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}
                key={index}
                onPress={() => pickImage(index + 3)}
              >
                {url ? (
                  <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <EvilIcons name="image" size={24} color="black" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text>Add picture of yourself</Text>
          <TouchableOpacity activeOpacity={0.8} style={{ marginTop: 40, marginLeft: 'auto' }}>
            <AntDesign name="rightcircleo" size={24} color="#900C3F" style={{ alignSelf: 'center', marginTop: 20, marginRight: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Photo;

const styles = StyleSheet.create({});
