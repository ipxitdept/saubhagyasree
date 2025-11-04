import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

const WalletScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();
  return (
    <>
      <HelmetScreen>
        <SafeAreaView style={style.container}>
          <View style={styles.card}>
            <Icon
              name={'cash-outline'}
              size={30}
              color="#333"
              style={styles.icon}
            />
            <View>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.amount}>$ 150000</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Deposit"
                color="green"
                onPress={() => navigation.navigate('Deposit')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Withdrawal"
                color="red"
                onPress={() => navigation.navigate('Investment')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Deposit History"
                color="primary"
                onPress={() => navigation.navigate('Investment')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Withdrawal History"
                color="tercary"
                onPress={() => navigation.navigate('Investment')}
              />
            </View>
          </View>
        </SafeAreaView>
      </HelmetScreen>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonWrapper: {
    marginVertical: 5, 
  },
});

export default WalletScreen;
