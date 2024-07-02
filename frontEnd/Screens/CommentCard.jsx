import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APP_API_URL } from '../env';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AddComment from './AddComment';
import { useNavigation,useRoute } from '@react-navigation/native';


const CommentCard = () => {
  // const navigation=useNavigation()
  const route = useRoute()
  const propertyId = route.params?.propertyid;
  const [comments, setComments] = useState([]);
  const [FirstName,setFirstName] = useState("")
  const getComments = () => {
    axios.get(`${APP_API_URL}/comment/getAll/${propertyId}`)
      .then(res => {
        setComments(res.data);
        console.log('res',res.data[0].user.FirstName);
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
                <Text style={styles.name}> {item.user.FirstName}</Text>
                <Text style={styles.name}>{item.content}</Text>
                <Text style={styles.time}>9:58 am</Text>
              </View>
            </View>
          </View>
        )}
      />
      {/* <AddComment  /> */}
      
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
