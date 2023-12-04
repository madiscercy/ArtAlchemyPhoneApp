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
            <Text>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedStyle && (
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={goToNextStep}>
            <Text>Go to Next Step</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    padding: 20,
  },
  imagePreview: {
    // Define your image preview styles
  },
  image: {
    // Define your image styles
  },
  styleButtons: {
    // Define your style buttons container styles
  },
  button: {
    // Define your button styles
  },
  nextButton: {
    // Define your next button styles
  },
  // ... other styles ...
});

export default SelectStyleScreen;
