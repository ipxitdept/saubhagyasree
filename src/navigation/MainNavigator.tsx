import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import EarnScreen from '../screens/Earn/EarnScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import InvestmentScreen from '../screens/Investment/InvestmentScreen';

export type MainStackParamList = {
  Home: undefined;
  Earn: undefined;
  Investment: undefined;
  Account: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Earn" component={EarnScreen} />
      <Stack.Screen name="Investment" component={InvestmentScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
