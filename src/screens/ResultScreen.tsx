// ResultScreen.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Update the path as needed
import { RootStackParamList } from '../navigation/NavigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { reset } from '../redux/actions/imageActions'; // Action to reset the image selection

const ResultScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const originalImage = useSelector((state: RootState) => state.image.selectedImage);
  const newImageUrl = useSelector((state: RootState) => state.image.newImageUrl);
  const dispatch = useDispatch();

  const restartProcess = () => {
    navigation.navigate('Begin');
  };

  return (
    <ScrollView style={styles.resultsContainer}>
      <View style={styles.imageContainer}>
        {originalImage && <Image source={{ uri: originalImage }} style={styles.image} />}
        {newImageUrl && <Image source={{ uri: newImageUrl }} style={styles.image} />}
      </View>

      <TouchableOpacity onPress={restartProcess} style={styles.button}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    // Other styles
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row', // Adjusted for React Native
    justifyContent: 'space-around',
    marginVertical: 20,
    // Other styles
  },
  image: {
    maxWidth: 400,
    maxHeight: 400,
    marginHorizontal: 10,
    // Other styles
  },
  button: {
    backgroundColor: '#3D155F',
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 8,
    // Other styles
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    // Other styles
  },
  // ... other styles ...
});

export default ResultScreen;
