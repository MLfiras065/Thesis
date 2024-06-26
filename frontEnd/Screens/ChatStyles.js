import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  chatBubble: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  chatBubbleRight: {
    backgroundColor: '#0078fe',
    borderRadius: 15,
    padding: 10,
    marginBottom: 5,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  chatText: {
    color: '#000',
  },
  chatTextRight: {
    color: '#fff',
  },
});

export default styles;
