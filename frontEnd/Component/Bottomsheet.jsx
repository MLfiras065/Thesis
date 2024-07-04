import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button ,ScrollView} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CommentCard from "../Screens/CommentCard"
import AddComment from "../Screens/AddComment"
import { useRoute } from '@react-navigation/native';
const Bottomsheet= () => {
  const route = useRoute();
 
  const propertyId = route.params?.propertyid;
  const userId = route.params?.userid;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%',"100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Comments"
          color="#008080"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <ScrollView>

          <BottomSheetView >
            <Text>Comments </Text>
            
            <CommentCard  />              
            <AddComment propertyId={propertyId} userId={userId} />
             
          </BottomSheetView>
          </ScrollView>
        </BottomSheetModal>
      </View>
     </BottomSheetModalProvider>
  );
};
export default Bottomsheet
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    display:"flex"
  },
  containerCard: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#ececec',
    marginVertical: 10,
  },
  time: {
    fontSize: 12,
    color: '#6c757d',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
});
