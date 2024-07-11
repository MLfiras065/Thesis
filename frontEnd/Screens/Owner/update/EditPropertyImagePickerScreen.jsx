import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const EditPropertyImagePickerScreen = ({ navigation }) => {
  const [images, setImages] = useState('');

  const handleSaveImages = () => {
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Enter images"
        value={images}
        onChangeText={setImages}
        style={{ borderWidth: 1, padding: 10, width: '80%', marginBottom: 20 }}
      />
      <Button title="Save Images" onPress={handleSaveImages} />
    </View>
  );
};

export default EditPropertyImagePickerScreen;
