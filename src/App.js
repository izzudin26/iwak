import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Router from './router';
import {LogBox} from 'react-native';
import reducer from './state';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const store = createStore(reducer);

const MyTheme = {
  colors: {
    background: '#fff',
    card: '#fff',
  },
};

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
