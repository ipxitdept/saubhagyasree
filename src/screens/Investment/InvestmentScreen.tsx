import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActivateScreen from './ActivateScreen';
import UpgradeScreen from './UpgradeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import InvestmentPlans from './InvestmentPlansScreen';
import { Button } from '../../components/ui/Button';
import { useGetWalletQuery } from '../../services/type';
const InvestmentScreen = () => {
  const style = createGlobalStyles();
  const [activeTab, setActiveTab] = useState('Activate');
  const navigation = useNavigation<any>();
   const { data } = useGetWalletQuery({});
  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container, { paddingHorizontal: 20 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Icon name="wallet-outline" size={26} color="#fff" />
              <Text style={styles.walletTitle}>My Wallet</Text>
            </View>

            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}> $ {data?.data?.fund_wallet}</Text>

            <View style={styles.walletFooter}>
              <View style={styles.footerItem}>
                <Icon name="arrow-down-circle-outline" size={20} color="#fff" />
                <Text
                  style={styles.footerText}
                  onPress={() => navigation.navigate('Deposit')}
                >
                  Deposits
                </Text>
              </View>
              <View style={styles.footerItem}>
                <Icon name="arrow-up-circle-outline" size={20} color="#fff" />
                <Text
                  style={styles.footerText}
                  onPress={() => navigation.navigate('Withdrawal')}
                >
                  Withdrawals
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              borderRadius: 50,
              overflow: 'hidden',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                backgroundColor:
                  activeTab === 'Activate' ? '#005298' : '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setActiveTab('Activate')}
            >
              <Text
                style={{
                  color: activeTab === 'Activate' ? '#fff' : '#000',
                  fontWeight: '600',
                }}
              >
                Activate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                backgroundColor:
                  activeTab === 'Upgrade' ? '#005298' : '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setActiveTab('Upgrade')}
            >
              <Text
                style={{
                  color: activeTab === 'Upgrade' ? '#fff' : '#000',
                  fontWeight: '600',
                }}
              >
                Upgrade
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {activeTab === 'Activate' && <ActivateScreen />}

            {activeTab === 'Upgrade' && <UpgradeScreen />}
          </View>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Button
              title={'Self Upgrade History'}
              onPress={() => navigation.navigate('InvestmentHistory')}
              color="tercary"
            />
          </View>

          <InvestmentPlans />
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    marginHorizontal: 10,
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

export default InvestmentScreen;
