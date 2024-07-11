import React from 'react';
import { View, Text, Button } from 'react-native';

const EditPropertyScreen = ({ navigation }) => {
  const handleEditExtras = () => {
    navigation.navigate('EditExtras');
  };

  const handleEditImages = () => {
    navigation.navigate('EditImages');
  };

  const handleSave = () => {
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Edit Property</Text>
      <Button title="Edit Extras" onPress={handleEditExtras} />
      <Button title="Edit Images" onPress={handleEditImages} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default EditPropertyScreen;
