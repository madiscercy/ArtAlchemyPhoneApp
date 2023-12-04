// SelectStyleScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store'; // Update the path as needed
import { setSelectedStyle } from '../redux/actions/imageActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/NavigationTypes';

const artStyles = [
    'Impressionism',
    'Cubism',
    'Surrealism',
    'Expressionism',
    'Abstract',
    'Minimalism',
    'Futurism',
    'Art Nouveau',
    'Baroque',
    'Neo-Classicism',
  ];

const SelectStyleScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);
  console.log(selectedImage)
  const [selectedStyle, setSelectedStyleLocal] = useState<string | null>(null);
  const dispatch = useDispatch();

  const selectStyle = (style: string) => {
    setSelectedStyleLocal(style);
    dispatch(setSelectedStyle(style));
  };

  const goToNextStep = () => {
    if (selectedStyle) {
      navigation.navigate('Alchemize');
    }
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      <View style={styles.styleButtons}>
        {artStyles.map((style, index) => (
          <TouchableOpacity key={index} onPress={() => selectStyle(style)} style={styles.button}>
            <Text style={styles.buttonText}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedStyle && (
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={goToNextStep}>
            <Text style={styles.nextButtonText}>Go to Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C303B', // Matching background color with BeginScreen
    padding: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 30, // Making the image circular
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  styleButtons: {
    flexDirection: 'row', // Arranging buttons in a row
    flexWrap: 'wrap', // Allowing wrapping for multiple items
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3D155F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
  nextButton: {
    backgroundColor: '#3D155F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
});


export default SelectStyleScreen;
