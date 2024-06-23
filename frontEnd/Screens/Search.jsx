import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons'; 

const Search = (props) => {
    const [key, setKey] = useState('');

    const filter = (searchKey) => {
        const lowercaseSearchKey = searchKey.toLowerCase();
        const filteredData = props.data.filter((item) => {
            return item.name.toLowerCase().includes(lowercaseSearchKey);
        });
        props.setData(filteredData);
    };

    return (
        <View style={styles.searchForm}>
            <EvilIcons name="search" size={24} color="gray" />
            <TextInput 
                value={key} 
                onChangeText={setKey} 
                placeholder="Search" 
                style={styles.search} 
                placeholderTextColor="#888"
                onSubmitEditing={() => filter(key)} // Filter on enter key press
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchForm: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
    },
    search: {
        height: 40,
        flex: 1,
        borderRadius: 20,
        paddingLeft: 10,
        backgroundColor: '#f2f2f2',
        borderWidth: 0,
        marginLeft: 5,
    },
});

export default Search;
