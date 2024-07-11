import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const EditPropertyExtrasScreen = ({ navigation }) => {
  const [extra, setExtra] = useState('');

  const handleSaveExtras = () => {
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Enter extras"
        value={extra}
        onChangeText={setExtra}
        style={{ borderWidth: 1, padding: 10, width: '80%', marginBottom: 20 }}
      />
      <Button title="Save Extras" onPress={handleSaveExtras} />
    </View>
  );
};

export default EditPropertyExtrasScreen;
