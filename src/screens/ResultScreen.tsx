import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const ResultScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const originalImage = useSelector((state: RootState) => state.image.selectedImage);
  const newImageUrl = useSelector((state: RootState) => state.image.newImageUrl);

  const saveImage = async () => {
    if (newImageUrl) {
      try {
        await CameraRoll.save(newImageUrl, { type: 'photo' });
        Alert.alert('Image Saved', 'Your image has been saved to the Photos.');
      } catch (error) {
        console.error('Error saving image:', error);
        Alert.alert('Error', 'Failed to save image.');
      }
    } else {
      Alert.alert('Error', 'No image to save.');
    }
  };

  const restartProcess = () => {
    navigation.navigate('Begin');
  };

  return (
    <View style={styles.resultsContainer}>
      <View style={styles.imageContainer}>
        {originalImage && <Image source={{ uri: originalImage }} style={styles.image} />}
        {newImageUrl && <Image source={{ uri: newImageUrl }} style={styles.image} />}
      </View>

      <TouchableOpacity onPress={saveImage} style={styles.button}>
        <Text style={styles.buttonText}>Save Alchemized Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={restartProcess} style={styles.button}>
        <Text style={styles.buttonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    backgroundColor: '#2C303B', // Matching the background color with AlchemizeScreen
    alignItems: 'center', // Centering content horizontally
    justifyContent: 'center', // Centering content vertically
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30, // Space below the images before the button
  },
  image: {
    width: 150, // Adjust size as needed
    height: 150,
    borderRadius: 30,
    resizeMode: 'contain',
    marginHorizontal: 10, // Space between the two images
  },
  button: {
    backgroundColor: '#3D155F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10, // Ensure the button is centered
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
});



export default ResultScreen;
