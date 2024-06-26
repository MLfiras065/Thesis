import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Wishlist from './src/components/Wishlist';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Wishlist />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
