import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { APP_API_URL } from '../env';

const AddComment = ({ paramkey, navigation }) => {
  const [content, setContent] = useState("");

  const handleAddComment = () => {
    axios.post(`${APP_API_URL}/comments/post`, { content })
      .then(() => {
        setContent("");
        navigation.goBack(); // Refresh or navigate back after adding a comment
      })
      .catch(err => {
        console.error(err);
      });
  };

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
