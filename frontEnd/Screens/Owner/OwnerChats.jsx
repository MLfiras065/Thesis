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
    route=useRoute()
    const {userid}=route.params
    console.log("idUser",route.params)
    const ownerId = SessionStorage.getItem("ownerid");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get(`${APP_API_URL}/chat/getmsg/${userid}/${ownerId}`);
                console.log("res",res.data);
                const formattedMessages = res.data.map(msg => ({
                    _id: msg.id,
                    text: msg.message,
                    createdAt: new Date(msg.createdAt),
                    user: {
                        _id: ownerId,
                        name: msg.FirstName,
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
    }, [userid, ownerId]);

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
                text: message.message,
                createdAt: new Date(message.createdAt),
                user: {
                    _id: message.firstName,
                    name: message.FirstName,
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
        console.log("message add",messages);
        const newMessage = messages;
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage));

        try {
            await axios.post(`${APP_API_URL}/chat/addmsg/${ownerId}/${userid}`, {
                message: newMessage.text,
                sender:newMessage.ownerId
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
                    left: {
                        backgroundColor: props.currentMessage.user._id === userid ? '#0078fe' : '#f0f0f0',
                        alignSelf: 'flex-start',
                    },
                    right: {
                        backgroundColor: props.currentMessage.user._id === ownerId ? '#f0f0f0' : '#0078fe',
                        alignSelf: 'flex-end',
                    }
                }}
                textStyle={{
                    left: {
                        color: props.currentMessage.user._id === userid ? '#fff' : '#000',
                    },
                    right: {
                        color: props.currentMessage.user._id === ownerId ? '#000' : '#fff',
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
                    avatar: 'https://placeimg.com/140/140/any'
                }}
                renderBubble={renderBubble}
                inverted={false}
                
            />
        </View>
    );
};

export default OwnerChats;
