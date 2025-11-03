import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
import { Button } from '../../components/ui/Button';
import { useSnackbar } from '../../context/SnackbarProviderToast';

export const HomeScreen = () => {
  const styles = createGlobalStyles();
    const { enqueueSnackbar } = useSnackbar();
   const handleClick = ()=>{
   
   }
  return (
    <>
      <HelmetScreen>
        <SafeAreaView style={styles.container}>
          <Button title='Click me' color='primary' onPress={()=>handleClick()} /> 
        </SafeAreaView>
      </HelmetScreen>

    </>
  );
};
