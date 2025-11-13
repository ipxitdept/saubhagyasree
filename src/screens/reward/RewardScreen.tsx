import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

const RewardScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container, { backgroundColor: '#f3f5f9' }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          
         
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginHorizontal: 16,
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#04582aff',
    overflow: 'hidden',
    elevation: 6,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  walletTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  balanceLabel: {
    color: '#f1f1f1',
    fontSize: 14,
    marginTop: 10,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  walletFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  buttonContainer: {
    marginTop: 25,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '48%',
    marginVertical: 8,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f1ff',
    borderRadius: 10,
    padding: 12,
    marginTop: 20,
    marginHorizontal: 16,
  },
  infoText: {
    color: '#333',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});

export default RewardScreen;
