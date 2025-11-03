/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { SnackbarProvider } from './src/context/SnackbarProviderToast';
import { store } from './src/store/store';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <SafeAreaProvider>
          <AppNavigator />
          <Toast />
        </SafeAreaProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
