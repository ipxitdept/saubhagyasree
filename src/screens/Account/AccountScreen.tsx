import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
const AccountScreen = () => {
  const styles = createGlobalStyles();
  return (
    <>
      <HelmetScreen>
        <SafeAreaView style={styles.container}></SafeAreaView>
      </HelmetScreen>
    </>
  );
};

export default AccountScreen;
