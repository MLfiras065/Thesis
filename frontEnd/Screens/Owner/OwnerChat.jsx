import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from './OwnerChatStyle';
import { APP_API_URL } from '../../env';

const Chats = () => {
    const userId = SessionStorage.getItem("userid");
    const ownerId = SessionStorage.getItem("ownerid");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userId}/${ownerId}`);
                const formattedMessages = res.data.map(msg => ({
                    _id: messages.id,
                    text: messages.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: messages.senderId,
                        name: messages.FirstName,
                        avatar: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
                    }
                }));
                setMessages(formattedMessages);
                console.log("msg",msg);
            } catch (err) {
                console.log(err);
            }
        };

        getMessage();
    }, [userId, ownerId]);

    useEffect(() => {
        const socketConnection = io("http://192.168.11.174:3000");
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
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsg/${userId}/${ownerId}`, {
                message: newMessage.text
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
                    _id: userId,
                    name: "user.FirstName",
                    avatar: 'https://placeimg.com/140/140/any'
                }}
                inverted={false}
                
            />
        </View>
    );
};

export default Chats;
