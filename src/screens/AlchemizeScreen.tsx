// AlchemizeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Update the path as needed
import { processImage } from '../services/imageProcessingService'; // Update the path and function as needed
import { RootStackParamList } from '../navigation/NavigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { setNewImage } from '../redux/actions/imageActions';


const AlchemizeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  console.log('AlchemizeScreen');
  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);
  const selectedStyle = useSelector((state: RootState) => state.image.selectedStyle);
  console.log('selectedImage: ' + selectedImage);
  console.log('selectedStyle: ' + selectedStyle);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Assuming you have a function to retrieve the image when the component mounts
    retrieveImage();
  }, []);

  const retrieveImage = () => {
    // Implement logic to retrieve the image
  };

  const alchemize = async () => {
    if (selectedImage && selectedStyle && !isLoading) {
      setIsLoading(true);
      setIsError(false);
  
      try {
        // Convert image file to base64
        const base64String = await RNFS.readFile(selectedImage, 'base64');
  
        // Now, you can send this base64String to your image processing service
        const response = await processImage(base64String, selectedStyle);
  
        if (response && response.newImage) {
          // Handle the response
         
          dispatch(setNewImage(response.newImage))
          navigation.navigate('Result');
        } else {
          setIsError(true);
          console.error('newImage property not found in the response');
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.processContainer}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      {selectedStyle && <Text style={styles.selectedStyleText}>Selected Style: {selectedStyle}</Text>}
      {isLoading && <Text style={styles.loadingText}>Alchemizing Image... This may take a minute...</Text>}
      {isError && <Text style={styles.errorText}>Sorry, an issue occurred while alchemizing. Please try again.</Text>}
      {selectedImage && selectedStyle && (
        <TouchableOpacity onPress={alchemize} style={styles.button}>
          <Text style={styles.buttonText}>Alchemize</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  processContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C303B', // Matching the background color with other screens
  },
  imagePreview: {
    width: 300,
    height: 300,
    overflow: 'hidden',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectedStyleText: {
    color: '#FFFFFF', // White text color
    fontSize: 18,
    marginBottom: 20,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  errorText: {
    color: '#FF0000', // Red color for errors
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3D155F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
});


export default AlchemizeScreen;
