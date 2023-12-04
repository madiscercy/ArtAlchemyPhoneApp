// SelectImageScreen.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, BackHandler} from 'react-native';
import {launchImageLibrary, MediaType} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setSelectedImage} from '../redux/actions/imageActions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/NavigationTypes';

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
        const source = { uri: response.assets[0].uri || '' };
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
      <TouchableOpacity onPress={onFileSelected}>
        <Text>Select Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imagePreview}>
          <Image source={selectedImage} style={styles.image} />
        </View>
      )}
      {selectedImage && (
        <TouchableOpacity onPress={nextClick}>
          <Text>Proceed to Next Step</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    textAlign: 'center',
    margin: 20,
  },
  button: {
    // Style your button
  },
  imagePreview: {
    marginTop: 20,
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  // ... other styles ...
});

export default SelectImageScreen;
