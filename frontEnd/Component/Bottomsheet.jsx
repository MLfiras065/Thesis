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
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Comments </Text>
            <ScrollView>
            <CommentCard />
            <AddComment propertyId={propertyId} userId={userId} />
                </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
     </BottomSheetModalProvider>
  );
};
export default Bottomsheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});