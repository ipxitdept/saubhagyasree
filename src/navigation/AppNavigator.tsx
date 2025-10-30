import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useAuth } from '../context/AuthContext';
import { enableScreens } from 'react-native-screens';
enableScreens(true);
const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppNavigator;
