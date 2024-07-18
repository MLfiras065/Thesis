
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';
import Toast from 'react-native-toast-message';

const AddComment = ({ propertyId }) => {
  const [content, setContent] = useState("");
  const id = SessionStorage.getItem('userid');
  console.log('User ID:', id);
  console.log("test");

  const handleAddComment = async () => {
    console.log("UserID:", id);
    console.log("PropertyID:", propertyId);
    console.log("Content:", content);

    if (id && propertyId && content.trim()) {
      try {
        const res = await axios.post(`${APP_API_URL}/comment/post/${id}/${propertyId}`, { content, userId: id, idProperty: propertyId });
        setContent('')
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Comment added successfully',
          position: 'bottom',
          bottomOffset:800,
        });
        console.log(res.data, "comment");
      } catch (err) {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to add comment',
          position: 'bottom',
        bottomOffset:800,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a comment',
        position: 'bottom',
        bottomOffset:800,
      });
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
