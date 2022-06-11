/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';

import ProfileUpdate from './app/screens/profileSection/ProfileUpdate';

const App = () => {
  return (
    <ToastProvider placement={'bottom'} duration={2000} animationType="zoom-in">
      <ProfileUpdate />
    </ToastProvider>
  );
};

export default App;
