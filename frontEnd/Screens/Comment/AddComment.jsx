
import React, { useState  } from 'react';
import { View, TextInput, StyleSheet,  TouchableOpacity,Button } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../../env';
import SessionStorage from 'react-native-session-storage';
import Toast from 'react-native-toast-message';
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
      <Button title="Add Comment" onPress={handleAddComment}  />
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
