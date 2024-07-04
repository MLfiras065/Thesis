import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';

const Photo = () => {
  const navigation = useNavigation();
  const ownerid=SessionStorage.getItem('ownerId')
  const [image, setImage] = useState(['', '', '', '', '', '']);
  const [Category, setcategory] = useState('');
  const [OwnershpImg,setOwnershpImg]=useState("")
  const [Extra,setExtra]=useState("")
  const [Location,setLocation]=useState("")
  const [Property,setProperty]=useState([])

const addProperty =({Name,Price,image,description,category,ownershpImg,extra,location})=>{
  const  res =axios.post(`${APP_API_URL}/property/post/${1}`,{Name:Name,Price:Price,image:image,description:description,category:category,ownershpImg:ownershpImg,extra:extra,location:location})
  try {
   
    setOwnershpImg(res.data.OwnershpImg)
    setExtra(res.data.Extra)
    setLocation(res.data.Location)
SessionStorage.getItem('productData')
   setProperty(res.data) 
  } catch (error) {
    console.error(error)
  }
}
  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUrls = [...image];
      updatedUrls[index] = result.assets[0].uri;
      setImage(updatedUrls);
      alert('Image added');
    }
  };
const handelAdd=()=>{
  addProperty()
}
  return (
    <SafeAreaView>
      <View style={{ marginLeft: 24, marginTop: 80, fontSize: 45, fontWeight: 'bold' }}>
        <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Pick your photos and videos</Text>
        <View style={{ marginTop: 20, marginRight: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginRight: 10 }}>
            {image.slice(0, 3).map((url, index) => (
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
            {image.slice(3).map((url, index) => (
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
          <TouchableOpacity style={styles.addButton} onPress={handelAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Photo;

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
    backgroundColor: "#800020",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 35,
    marginTop: 150,
    shadowOpacity: 0.2,
    shadowRadius: 5,
   
 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
  },
});
