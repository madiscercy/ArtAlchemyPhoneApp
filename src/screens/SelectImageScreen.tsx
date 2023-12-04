// SelectImageScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, BackHandler, Alert} from 'react-native';
import {launchImageLibrary, MediaType} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedImage} from '../redux/actions/imageActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/NavigationTypes';
import { RootState } from '../redux/store';

type ImageState = null | {uri: string};

const SelectImageScreen = () => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => true
        );
    
        return () => backHandler.remove();
      }, []);
    
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    
  const [selectedImage, setSelectedImageLocal] = useState<ImageState>(null);
  const dispatch = useDispatch();

  const onFileSelected = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      maxWidth: 2000,
      maxHeight: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (!response.assets) {
          return;
        }
        
        console.log('response.assets[0].uri: ' + response.assets[0].uri);
        const source = { uri: response.assets[0].uri || '' };
        if (!source.uri.match(/\.(jpeg|jpg|png|gif|webp)$/)) {
          Alert.alert('Unsupported Image Format', 'Please select a JPEG, PNG, GIF, or WEBP image.');
          return;
        }
        setSelectedImageLocal(source);
        dispatch(setSelectedImage(source.uri));
      }
    });
  };

  const nextClick = () => {
    navigation.navigate('SelectStyle');
  };

  return (
    <View style={styles.uploadContainer}>
      <TouchableOpacity onPress={onFileSelected} style={styles.selectImageButton}>
        <Text style={styles.selectImageButtonText}>Select Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={selectedImage} style={styles.image} />
        </View>
      )}
      {selectedImage && (
        <TouchableOpacity onPress={nextClick} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Proceed to Next Step</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C303B', // Matching the background color with BeginScreen
  },
  selectImageButton: {
    backgroundColor: '#3D155F', // Matching the button color with BeginScreen
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20, // Space between button and image preview
  },
  selectImageButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
  imagePreview: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nextButton: {
    backgroundColor: '#3D155F', // Matching the button color with BeginScreen
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
});


export default SelectImageScreen;
