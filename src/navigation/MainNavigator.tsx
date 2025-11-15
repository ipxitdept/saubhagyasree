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
import ProfileScreen from '../screens/Account/ProfileScreen';
import PaymentScreen from '../screens/Account/PaymentScreen';
import InvestmentHistoryScreen from '../screens/Investment/InvestmentHistoryScreen';
import RewardScreen from '../screens/reward/RewardScreen';
import LevelScreen from '../screens/Account/LevelScreen';
import LevelMemberScreen from '../screens/Account/LevelMemberScreen';

export type MainStackParamList = {
  Home: undefined;
  Wallet: undefined;
  Investment: undefined;
  Account: undefined;
  Deposit: undefined;
  Withdrawal: undefined;
  DepositHistory: undefined;
  WithdrawalHistory: undefined;
  Profile: undefined;
  Payment: undefined;
  Reward: undefined;
  InvestmentHistory: undefined;
  Level: undefined;
  LevelMember: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Investment"
        component={InvestmentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reward"
        component={RewardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Level"
        component={LevelScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LevelMember"
        component={LevelMemberScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Deposit" component={DepositScreen} />
      <Stack.Screen
        name="DepositHistory"
        component={DepositHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
      <Stack.Screen
        name="WithdrawalHistory"
        component={WithdrawalHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvestmentHistory"
        component={InvestmentHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
