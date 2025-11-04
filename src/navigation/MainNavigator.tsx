import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home/HomeScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import InvestmentScreen from '../screens/Investment/InvestmentScreen';
import DepositScreen from '../screens/Wallet/DepositScreen';
import DepositHistoryScreen from '../screens/Wallet/DepositHistoryScreen';
import WithdrawalScreen from '../screens/Wallet/WithdrawakScreen';
import WithdrawalHistoryScreen from '../screens/Wallet/WithdrawalHistoryScreen';

export type MainStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Investment: undefined;
  Account: undefined;
  Deposit: undefined;
  Withdrawal: undefined;
  DepositHistory: undefined;
  WithdrawalHistory: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Wallet" component={WalletScreen}  options={{ headerShown: false }}/>
      <Stack.Screen name="Investment" component={InvestmentScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen name="DepositHistory" component={DepositHistoryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
      <Stack.Screen name="WithdrawalHistory" component={WithdrawalHistoryScreen} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
};

export default MainStack;
