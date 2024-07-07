import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,Text } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../env';
import SessionStorage from 'react-native-session-storage';

const AddComment = ({ propertyId }) => {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);
  const id =  SessionStorage.getItem('userid');
  console.log('Fetched user ID:', id);

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       setUserId(id);
  //     } catch (error) {
  //       console.error('Error fetching user ID:', error);
  //     }
  //   };
  //   fetchUserId();
  // }, []);

  const handleAddComment = async () => {
    console.log("UserID:", id);
    console.log("PropertyID:", propertyId);
    console.log("Content:", content);

    if (id && propertyId && content.trim()) {
      try {
        const res = await axios.post(`${APP_API_URL}/comment/post/${id}/${propertyId}`, { content, userId:id, idProperty: propertyId });
        setContent('');  // Reset the content input field
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

  // if (userId === null) {
  //   return <View><Text>Loading...</Text></View>; 
  // }

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
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
});

export default AddComment;
