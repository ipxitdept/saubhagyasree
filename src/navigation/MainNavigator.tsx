import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Home/HomeScreen';


export type MainStackParamList = {
  Home: undefined;
  // Details: { itemId: number; name: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
