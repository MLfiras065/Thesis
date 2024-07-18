import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import SessionStorage from 'react-native-session-storage';
import { io } from 'socket.io-client';
import axios from 'axios';
import styles from './OwnerChatStyle';
import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import { APP_API_URL } from '../../env';
import { useRoute } from '@react-navigation/native';
const OwnerChats = () => {
    const route = useRoute();
    const { userid } = route.params;
    const [ownerId, setOwnerId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const fetchOwnerId = async () => {
            const id = await SessionStorage.getItem('ownerid');
            setOwnerId(id);
        };

        fetchOwnerId();
    }, []);

    useEffect(() => {
        if (!ownerId) return;

        const getMessage = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userid}/${ownerId}`);
                const formattedMessages = res.data.map(msg => ({
                   
                    _id: msg.id,
                    text: msg.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: msg.senderId,
                        name: msg.FirstName,
                        avatar: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
                    }
                }));
                setMessages(formattedMessages);
              console.log("msg",formattedMessages);
            } catch (err) {
                console.log(err);
            }
        };

        getMessage();
    }, [userid, ownerId]);
// console.log(msg.Owner.FirstName);
    useEffect(() => {
        const socketConnection = io();
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
                    name: message.FirstName,
                    // avatar: 'https://placeimg.com/140/140/any'
                }
            }));
        });

        return () => {
            if (socketConnection) {
                socketConnection.disconnect()
            }
        };
    }, []);

    const handleSend = useCallback(async (messages = []) => {
        const newMessage = messages[0];  
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsgO/${ownerId}/${userid}`, {
                message: newMessage.text,
                senderId: ownerId
            });

            if (socket) {
                socket.emit("send-message", newMessage);
            }
        } catch (err) {
            console.log(err);
        }
    }, [userid, ownerId, socket]);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    // left: {
                    //     backgroundColor: props.currentMessage.user._id !== ownerId ? '#0078fe' : '#f0f0f0',
                    //     alignSelf: 'flex-start',
                    // },
                    right: {
                        backgroundColor: props.currentMessage.user._id === ownerId ? '#0078fe' : '#f0f0f0',
                        alignSelf: 'flex-end',
                    }
                }}
                textStyle={{
                    // left: {
                    //     color: props.currentMessage.user._id !== userid ? '#fff' : '#000',
                    // },
                    right: {
                        color: props.currentMessage.user._id === ownerId ? '#fff' : '#000',
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
                    _id: ownerId,
                    name: "firas",
                    // avatar: 'https://placeimg.com/140/140/any'
                }}
                renderBubble={renderBubble}
                inverted={false}
                
            />
        </View>
    );
};

export default OwnerChats;
