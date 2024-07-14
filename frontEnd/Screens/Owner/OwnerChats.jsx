import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from './OwnerChatStyle';
import { APP_API_URL } from '../../env';
import { useRoute } from '@react-navigation/native';
const OwnerChats = () => {
    route=useRoute()
    const   {iduser}=route.params
    console.log("route",route.params)
    const userId = SessionStorage.getItem("userid");
    const ownerId = SessionStorage.getItem("ownerid");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/chat/getmsg/${2}/${1}`);
                console.log("res",res.data);
                const formattedMessages = res.data.map(msg => ({
                    _id: messages.id,
                    text: msg.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: messages.senderId,
                        name: "owner",
                        avatar: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
                    }
                }));
                setMessages(formattedMessages);
                // console.log("msg",msg);
            } catch (err) {
                console.log(err);
            }
        };

        getMessage();
    }, [userId, ownerId]);

    useEffect(() => {
        const socketConnection = io("http://192.168.103.5:3000");
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
                text: message.message,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.senderId,
                    name: message.senderName,
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
        const newMessage = messages[0];
        console.log(newMessage);
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsg/${2}/${1}`, {
                message: newMessage[0].text
            });

            if (socket) {
                socket.emit("send-message", newMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }, [userId, ownerId, socket]);

    return (
        <View style={styles.messagingscreen}>
            <GiftedChat
                messages={messages}
                onSend={handleSend}
                user={{
                    _id: ownerId,
                    name: "owner.FirstName",
                    avatar: 'https://placeimg.com/140/140/any'
                }}
                inverted={false}
                
            />
        </View>
    );
};

export default OwnerChats;
