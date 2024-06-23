import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './styles.js';

const Wishlist = () => {
    const [userId, setUserId] = useState(1); 
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = () => {
        axios.get(`http://localhost:3000/wishlist/${userId}`)
            .then(response => {
                setWishlist(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const addToWishlist = () => {
        axios.post('http://localhost:3000/wishlist', {
            userId,
            productId,
            productName,
        })
        .then(response => {
            setWishlist([...wishlist, response.data]);
            setProductId('');
            setProductName('');
        })
        .catch(error => {
            console.error(error);
        });
    };

    const removeFromWishlist = (id) => {
        axios.delete(`http://localhost:3000/wishlist/${id}`)
        .then(() => {
            setWishlist(wishlist.filter(item => item.id !== id));
        })
        .catch(error => {
            console.error(error);
        });
    };

    const confirmRemove = (id) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your wishlist?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => removeFromWishlist(id) }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wishlist</Text>
            <TextInput
                style={styles.input}
                placeholder="Product ID"
                value={productId}
                onChangeText={setProductId}
            />
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
            />
            <TouchableOpacity style={styles.addButton} onPress={addToWishlist}>
                <Text style={styles.addButtonText}>Add to Wishlist</Text>
            </TouchableOpacity>

            <FlatList
                data={wishlist}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.wishlistItem}>
                        <Text style={styles.wishlistItemText}>{item.productName}</Text>
                        <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemove(item.id)}>
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default Wishlist;
