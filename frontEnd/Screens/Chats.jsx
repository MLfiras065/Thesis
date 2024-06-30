import { Text, View ,FlatList,TextInput,Pressable} from 'react-native'
import React ,{useState,useEffect}from 'react'
import styles from './ChatStyles'
import { APP_API_URL } from '../env'
import SessionStorage from 'react-native-session-storage'
import {io} from 'socket.io-client';
import AllChats from './AllChats'
import axios from 'axios'


const Chats = () => {
    const userId = SessionStorage.getItem("userid");
    const ownerId = SessionStorage.getItem("ownerid");
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [socket, setSocket] = useState(null);
  
    const getMessage = () => {
      axios.get(`${APP_API_URL}/chat/getmsg/${userId}/${ownerId}`).then((res) => {
        setChatMessages(res.data);
      }).catch((err) => console.log(err));
    }
  
    const addsMessage = (message) => {
      if (socket) {
        socket.emit("send-message", message);
      }
      axios.post(`${APP_API_URL}/chat/addmsg/${userId}/${ownerId}`, { message })
        .then((res) => {
          setMessage(res.data);
          getMessage(res.data);
        })
        .catch((err) => console.log(err));
    }
  
    const handleAdd = () => {
      addsMessage(message);
    }
  
    useEffect(() => {
      const socketConnection = io("http://192.168.17.186:3000");
      setSocket(socketConnection);
  
      socketConnection.on("connect", () => {
        console.log("Socket connected.");
      });
  
      socketConnection.on("disconnect", () => {
        console.log("Socket disconnected.");
      });
  
      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
        }
      };
    }, []);
  
    useEffect(() => {
      getMessage();
    }, []);
  
    return (
        <View style={styles.messagingscreen}>
        <View
            style={[
                styles.messagingscreen,
                { paddingVertical: 15, paddingHorizontal: 10 ,color:'black'},
            ]}
        >
            {chatMessages ? (
                <FlatList
                    data={chatMessages}
                    renderItem={({ item }) => (
                        <AllChats item={item}  />
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                "there is no messages "
            )}
        </View>
    
        <View style={styles.messaginginputContainer}>
            <TextInput
                    value={message}
                style={styles.messaginginput}
                onChangeText={(value) => setMessage(value)}
            />
            <Pressable
            
                style={styles.messagingbuttonContainer}
                onPress={()=>handleAdd()}
            >
                <View>
                    <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                </View>
            </Pressable>
        </View>
    </View>
    );
  }

export default Chats

