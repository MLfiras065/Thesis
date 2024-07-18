import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';
import { FontAwesome } from '@expo/vector-icons';

const AddComment = ({ propertyId }) => {
  const [content, setContent] = useState("");
  const id = SessionStorage.getItem('userid');
  console.log('user ID:', id);
  console.log("test");

  const handleAddComment = async () => {
    console.log("UserID:", id);
    console.log("PropertyID:", propertyId);
    console.log("Content:", content);

    if (id && propertyId && content.trim()) {
      try {
        const res = await axios.post(`${APP_API_URL}/comment/post/${id}/${propertyId}`, { content, userId: id, idProperty: propertyId });
        setContent('');
        Alert.alert('Comment added successfully');
        console.log(res.data, "comment");
      } catch (err) {
        console.error(err);
        Alert.alert('Error adding comment');
      }
    } else {
      Alert.alert('Please enter a comment');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <FontAwesome name="send-o" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    width: '90%',
    flexDirection: 'column',
    margin:'auto'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default AddComment;
