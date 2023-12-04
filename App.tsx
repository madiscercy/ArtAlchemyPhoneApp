/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BeginScreen from './src/screens/BeginScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectImageScreen from './src/screens/SelectImageScreen';
import SelectStyleScreen from './src/screens/SelectStyleScreen';
import AlchemizeScreen from './src/screens/AlchemizeScreen';
import ResultScreen from './src/screens/ResultScreen';
import { RootStackParamList } from './src/navigation/NavigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);
// const persistor = persistStore(store);

const Root = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Begin" screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Begin" component={BeginScreen} />
        <Stack.Screen name="SelectImage" component={SelectImageScreen} />
        <Stack.Screen name="SelectStyle" component={SelectStyleScreen} />
        <Stack.Screen name="Alchemize" component={AlchemizeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: Colors.dark,
  };

  return Root();

}

export default App;
