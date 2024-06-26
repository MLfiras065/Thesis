import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_API_URL } from '../env';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AddComment from './AddComment';

const CommentCard = ({ navigation, route }) => {
  const paramkey = route.params.post;
  const [comments, setComments] = useState([]);

  const getComments = () => {
    axios.get(`${APP_API_URL}/comments/getAll`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View>
      <FlatList
        style={styles.root}
        data={comments}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <Text style={styles.name}>{item.content}</Text>
                <Text style={styles.time}>9:58 am</Text>
              </View>
            </View>
          </View>
        )}
      />
      <AddComment paramkey={paramkey} navigation={navigation} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommentCard;
