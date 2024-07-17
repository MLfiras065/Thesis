import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
import { APP_API_URL } from '../../env';
import styles from './ChatStyles';
import { useRoute } from '@react-navigation/native';

const Chats = ({}) => {
    route=useRoute()
 const   {idOwner}=route.params
 console.log("route",route.params);
    const userId = SessionStorage.getItem("userid");
    console.log("userid",userId);
    const ownerId = SessionStorage.getItem("ownerid");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const getMessage = async () => {
        try {
            console.log("uesrid ownerid ",userId,idOwner);
            const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userId}/${idOwner}`);
            console.log("getmsg",res.data);
            const formattedMessages = res.data.map(msg => ({
                _id:msg.id,
                text:msg.message,

                user: {
                    id: userId,
                    name:"firas",
                    avatar: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
                },
                createdAt: new Date(msg.createdAt)
            }));
            setMessages(formattedMessages);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        
        getMessage();
    }, [userId, ownerId]);
    
    console.log("msg",messages);
    useEffect(() => {
        const socketConnection = io("http://192.168.139.186:3000");
        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("Socket connected.");
        });

        socketConnection.on("disconnect", () => {
            console.log("Socket disconnected.");
        });

        socketConnection.on("receive-message", message => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, {
                _id: message.id,
                text: message[1].message,
                createdAt: new Date(messages.createdAt),
                user: {
                    id: message[1].FirstName,
                    name:"firas",
                    avatar: 'https://placeimg.com/140/140/any'
                }
            }));
        });

        return () => {
            if (socketConnection) {
                socketConnection.disconnect();
            }
        };
    }, []);

    const handleSend = useCallback(async (messages = []) => {
        console.log("messages",messages);
        const newMessage = messages;
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsg/${userId}/${idOwner}`, {
                message: newMessage[0].text,
                sender:newMessage[0].userId
            });

            if (socket) {
                socket.emit("send-message", newMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }, [userId, idOwner, socket]);
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                        alignSelf: 'flex-start',
                    },
                    right: {
                        backgroundColor: '#0078fe',
                        alignSelf: 'flex-end',
                    }
                }}
                textStyle={{
                    left: {
                        color: '#000',
                    },
                    right: {
                        color: '#fff',
                    }
                }}
            />
        );
    };
    return (
        <View style={styles.messagingscreen}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{
                    _id: 10,
                    name: "user.FirstName",
                    // avatar: 'https://placeimg.com/140/140/any'
                }}
                inverted={false}
                renderBubble={renderBubble}
                
            />
        </View>
    );
};

export default Chats;
