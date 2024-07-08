import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    featureBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    label: {
        fontSize: 18,
        color: '#333',
    },
    buttonGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    adjustButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    adjustButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    value: {
        fontSize: 18,
        color: '#555',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;
