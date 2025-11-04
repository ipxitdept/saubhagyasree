import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import InvestmentScreen from '../screens/Investment/InvestmentScreen';
import DepositScreen from '../screens/Wallet/DepositScreen';

export type MainStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Investment: undefined;
  Account: undefined;
  Deposit: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Investment" component={InvestmentScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
