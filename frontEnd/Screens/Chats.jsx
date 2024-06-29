import { Text, View ,FlatList,TextInput,Pressable} from 'react-native'
import React ,{useState,useEffect}from 'react'
import styles from './ChatStyles'
import { APP_API_URL } from '../env'
import SessionStorage from 'react-native-session-storage'
import {io} from 'socket.io-client';
import AllChats from './AllChats'
import axios from 'axios'


const Chats = () => {
    const userId=SessionStorage.getItem("userid")
    const ownerId=SessionStorage.getItem("ownerid")
    const [message,setMessage]=useState([])
  const [socket,setSocket]=useState()
  const [chatMessages, setChatMessages] = useState([]);
  console.log("testttt",message);
  
  const getMessage=()=> {
    
      axios.get(`${APP_API_URL}/chat/getmsg/${1}/${1}`).then((res)=>{
          setChatMessages(res.data)
          console.log("res=>",res.data);
      }).catch((err)=>{console.log(err)
      })
  }

  const addsMessage=(message)=>{
      console.log(socket,"socket");
      socket.emit("get-users", message)
      let x=socket.emit('get-users',message)
      console.log("x=>",x);
axios.post(`${APP_API_URL}/chat/addmsg/${1}/${1}`,{
  message:message,
  })
  .then((res)=>{
      setMessage(res.data)

  })
.catch((err)=>{
  console.log(err);
})
  }
  const handleAdd=()=>{
      addsMessage(message)
  }

  const handleNewMessage = () => {
      const hour =
          new Date().getHours() < 10
              ? `0${new Date().getHours()}`
              : `${new Date().getHours()}`;

      const mins =
          new Date().getMinutes() < 10
              ? `0${new Date().getMinutes()}`
              : `${new Date().getMinutes()}`;

      console.log({
          message,
      
          timestamp: { hour, mins },
      });
  };
  useEffect(() => {
    
    const socketConnection = io("http://192.168.17.186:3000");
    
    socketConnection.on("connect", () => {
      console.log("Socket connected.");
      setSocket(socketConnection); 
    });

 
    // return () => {
    //   if (socketConnection) {
    //     socketConnection.disconnect();
    //   }
    // }

  }, []); 

  useEffect(() => {
    
      getMessage();
    
  }, [])
  console.log("chatmessa",chatMessages)
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
  )
}

export default Chats

