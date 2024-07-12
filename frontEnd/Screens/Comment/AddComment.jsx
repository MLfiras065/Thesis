import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';

const AddComment = ({ propertyId }) => {
  const [content, setContent] = useState("");
  const id =  SessionStorage.getItem('userid');
  console.log(' user ID:', id);
  console.log("test");

  const handleAddComment = async () => {
    console.log("UserID:", id);
    console.log("PropertyID:", propertyId);
    console.log("Content:", content);

    if (id && propertyId && content.trim()) {
      try {
        const res = await axios.post(`${APP_API_URL}/comment/post/${id}/${propertyId}`, { content, userId:id, idProperty: propertyId });
        setContent('')
        Alert.alert('Comment added successfully');
        console.log(res.data, "comment");
      } catch (err) {
        console.error(err);
        Alert.alert('Error adding comment');
      }
    } else {
      Alert.alert('Please enter a comment');
    }
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Add Comment" onPress={handleAddComment} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    width: '100%',
    flexDirection: 'column',
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
export default AddComment;
