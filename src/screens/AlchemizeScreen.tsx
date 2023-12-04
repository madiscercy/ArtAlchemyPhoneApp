// AlchemizeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Update the path as needed
import { processImage } from '../services/imageProcessingService'; // Update the path and function as needed
import { RootStackParamList } from '../navigation/NavigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const AlchemizeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);
  const selectedStyle = useSelector((state: RootState) => state.image.selectedStyle);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Assuming you have a function to retrieve the image when the component mounts
    retrieveImage();
  }, []);

  const retrieveImage = () => {
    // Implement logic to retrieve the image
  };

  const alchemize = () => {
    if (selectedImage && selectedStyle && !isLoading) {
      setIsLoading(true);
      setIsError(false);

      let imageData = selectedImage.toString();
      const base64Prefix = 'data:image/jpeg;base64,';
      const base64StartIndex = imageData.indexOf(base64Prefix) + base64Prefix.length;
      imageData = imageData.substring(base64StartIndex);

      processImage(imageData, selectedStyle)
        .then(response => {
          setIsLoading(false);
          if (response && response.newImage) {
            // Handle the response, perhaps update the Redux store
            console.log('newImage: ' + response.newImage);
            navigation.navigate('Result');
          } else {
            setIsError(true);
            console.error('newImage property not found in the response');
          }
        })
        .catch(error => {
          console.error('Error processing image:', error);
          setIsLoading(false);
          setIsError(true);
        });
    }
  };

  return (
    <View style={styles.processContainer}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      {selectedStyle && <Text>Selected Style: {selectedStyle}</Text>}
      {isLoading && <Text>Alchemizing Image... This may take a minute...</Text>}
      {isError && <Text>Sorry! An error occurred. Please try again.</Text>}
      {selectedImage && selectedStyle && (
        <TouchableOpacity onPress={alchemize} style={styles.button}>
          <Text>Alchemize</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  processContainer: {
    // other styles
  },
  imagePreview: {
    // styles for image preview
  },
  image: {
    // styles for image
  },
  button: {
    // styles for button
  },
  // ... other styles ...
});

export default AlchemizeScreen;
