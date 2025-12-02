import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { useCreateP2aMutation, useGetWalletQuery } from '../../services/type';
import HeaderScreen from '../Layout/HeaderScreen';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../components/ui/Input';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type P2pFormData = {
  user: string;
  amount: number;
};

const ProfitToActivationScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { data } = useGetWalletQuery({});
  const { enqueueSnackbar } = useSnackbar();
  const [createP2a] = useCreateP2aMutation();
  const user = useSelector((state: RootState) => state.user);
  const p2pSchema = Yup.object().shape({
    user: Yup.string(),
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .min(10, 'Amount must be at least 10'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<P2pFormData>({
    resolver: yupResolver(p2pSchema) as any,
    mode: 'onTouched',
  });

  const onSubmit = async (data: P2pFormData) => {
    try {
      const p2p = new FormData();
      //   p2p.append('user', data?.user);
      p2p.append('amount', data?.amount);
      await createP2a(p2p)
        ?.unwrap()
        ?.then((res: any) => {
          enqueueSnackbar(res?.message, {
            variant: 'success',
          });
          reset();
        })
        .catch((err: any) => {
          enqueueSnackbar(err?.data?.message, { variant: 'error' });
          console.log(err);
        });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <HeaderScreen title="P2A" showBackButton={true} />

          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <Icon name="wallet-outline" size={26} color="#fff" />
              <Text style={styles.walletTitle}>My Wallet</Text>
            </View>

            <Text style={styles.balanceLabel}>Net Balance</Text>
            <Text style={styles.balanceAmount}>
              $ {data?.data?.income_wallet}
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

          <View style={{ marginTop: 30 }}>
            <Controller
              control={control}
              name="user"
              render={({ field: { onChange, value } }) => (
                <Input
                  readOnly
                  label="User Id"
                  placeholder="User Id"
                  autoCapitalize="none"
                  value={user?.user_id}
                  onChangeText={onChange}
                  error={errors.user?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={value ? String(value) : ''}
                  onChangeText={text => {
                    const numeric = text.replace(/[^0-9]/g, '');
                    onChange(numeric ? Number(numeric) : undefined);
                  }}
                  onBlur={onBlur}
                  error={errors.amount?.message}
                />
              )}
            />
            <View style={{ marginTop: 10 }}>
              <Button
                title={isSubmitting ? 'Submitting...' : 'Submit'}
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                color="green"
              />
            </View>
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

export default ProfitToActivationScreen;
