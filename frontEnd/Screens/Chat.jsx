import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import { View } from 'react-native';
import styles from './ChatStyles.jsx';
import { APP_API_URL } from '../env.js';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${APP_API_URL}/messages`)
      .then((response) => response.json())
      .then((data) => {
        const formattedMessages = data.map((msg) => ({
          _id: msg.id,
          text: msg.message,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.user,
            name: msg.user,
          },
        }));
        setMessages(formattedMessages.reverse());
      });

    socket.on('chat message', (msg) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: msg.id,
          text: msg.message,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.user,
            name: msg.user,
          },
        })
      );
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    const message = messages[0];
    socket.emit('chat message', {
      user: message.user._id,
      message: message.text,
    });
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: styles.chatBubble,
          right: styles.chatBubbleRight,
        }}
        textStyle={{
          left: styles.chatText,
          right: styles.chatTextRight,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1, name: 'User' }}
        renderBubble={renderBubble}
      />
    </View>
  );
};

export default Chat;
