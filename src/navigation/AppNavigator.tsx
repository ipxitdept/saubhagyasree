import React from 'react';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { enableScreens } from 'react-native-screens';
import { useSelector } from 'react-redux';
import { RootState } from './../store/store';
import { NavigationContainer } from '@react-navigation/native';

enableScreens(true);
const AppNavigator = () => {
  const token = useSelector((state: RootState) => state.user.token);
  return <>
   <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  </>;
};

export default AppNavigator;
