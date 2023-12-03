// BeginScreen.tsx

import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setStep } from '../redux/actions/stepActions';

const BeginScreen = () => {
  const dispatch = useDispatch();

  const beginClick = () => {
    dispatch(setStep(2));
  };

  return (
    <View style={styles.beginContainer}>
      <View style={styles.welcomeText}>
        <Text style={styles.header}>Welcome to Art Alchemy</Text>
        <Text style={styles.paragraph}>
          Embark on a mystical journey of transformation, where your photos turn
          into magical art. Select your path and let the alchemy begin.
        </Text>
        <TouchableOpacity style={styles.beginButton} onPress={beginClick}>
          <Text style={styles.buttonText}>Begin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  beginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontFamily: 'Cinzel',
    color: '#D4AF37',
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#D4AF37',
    marginBottom: 20,
  },
  beginButton: {
    backgroundColor: '#3D155F',
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export default BeginScreen;
