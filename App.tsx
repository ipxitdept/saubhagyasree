/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { SnackbarProvider } from './src/context/SnackbarProviderToast';
import { store } from './src/store/store';

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
