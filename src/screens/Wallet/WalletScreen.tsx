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
import { useGetWalletQuery } from '../../services/type';

const WalletScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { data } = useGetWalletQuery({});

  const handleFundHistory = (history: string) => {
    navigation.navigate('P2pHistory', { slug: history });
  };

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container]}>
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
            <Text style={styles.balanceAmount}>
              $ {data?.data?.fund_wallet}
            </Text>

            <View style={styles.walletFooter}>
              <View style={styles.footerItem}>
                <Icon name="arrow-down-circle-outline" size={20} color="#fff" />
                <Text style={styles.footerText}>Deposits</Text>
              </View>
              <View style={styles.footerItem}>
                <Icon name="arrow-up-circle-outline" size={20} color="#fff" />
                <Text style={styles.footerText}>Withdrawals</Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Deposit"
                  color="green"
                  onPress={() => navigation.navigate('Deposit')}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Withdraw"
                  color="red"
                  onPress={() => navigation.navigate('Withdrawal')}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Deposit History"
                  color="primary"
                  onPress={() => navigation.navigate('DepositHistory')}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  title="Withdrawal History"
                  color="tercary"
                  onPress={() => navigation.navigate('WithdrawalHistory')}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.buttonWrapper}>
                <Button
                  title="P2P"
                  color="tercary"
                  onPress={() => navigation.navigate('P2p')}
                />
              </View>

              <View style={styles.buttonWrapper}>
                <Button
                  title="P2P History"
                  color="primary"
                  onPress={() => handleFundHistory('Activation-Fund')}
                />
              </View>
            </View>
          </View>

          {/* 💡 Info Section */}
          <View style={styles.infoBox}>
            <Icon name="information-circle-outline" size={22} color="#007bff" />
            <Text style={styles.infoText}>
              Your wallet balance includes all your earnings and available
              funds.
            </Text>
          </View>
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

export default WalletScreen;
