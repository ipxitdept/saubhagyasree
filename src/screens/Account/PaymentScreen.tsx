import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Card } from '../../components/ui/Card';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import {
  useGetUserDetailsQuery,
  useUpdateUserBankMutation,
} from '../../services/type';
import PaymentOptionScreen from './PaymentOptionScreen';

type BankFormData = {
  ac_name: string;
  ac_number: string;
  ifsc: string;
  bank: string;
  nominee_name: string;
  nominee_relation: string;
};

const PaymentScreen = () => {
  const styles = createGlobalStyles();
  const [activeTab, setActiveTab] = useState('Bank');
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGetUserDetailsQuery({});

  const [updateBank] = useUpdateUserBankMutation();
  const bankSchema = Yup.object().shape({
    ac_name: Yup.string().required('Account Holder Name is required'),
    ac_number: Yup.string().required('Account number is required'),
    ifsc: Yup.string().required('Ifsc code is required'),
    bank: Yup.string().required('Bank name is required'),
    nominee_name: Yup.string().required('Nominee name is required'),
    nominee_relation: Yup.string().required('Nominee relation is required'),
  });

  const defaultPayment = {
    ac_name: '',
    ac_number: '',
    ifsc: '',
    bank: '',
    nominee_name: '',
    nominee_relation: '',
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BankFormData>({
    resolver: yupResolver(bankSchema),
    mode: 'onTouched',
    defaultValues: defaultPayment,
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        ac_name: data.data.ac_holder_name || '',
        ac_number: data.data.ac_no || '',
        ifsc: data.data.ifsc_code || '',
        bank: data.data.bank_name || '',
        nominee_name: data.data.nominee_name || '',
        nominee_relation: data.data.nominee_relation || '',
      });
    }
  }, [data, reset]);
  const onSubmit = async (data: BankFormData) => {
    try {
      await updateBank({
        a_name: data?.ac_name,
        ac_no: data?.ac_number,
        ifsc: data?.ifsc,
        bank: data?.bank,
        n_name: data?.nominee_name,
        n_relation: data?.nominee_relation,
      })
        .unwrap()
        .then((res) => {
           console.log(res);
          reset();
          enqueueSnackbar('Bank details updated successfully', {
            variant: 'success',
          });
        })
        .catch(err => {
          console.log(err);
          enqueueSnackbar(err?.data?.message, { variant: 'error' });
        });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={screenStyle.header}>
            <Text style={screenStyle.headerTitle}>Edit Payment Details </Text>
            <Text style={screenStyle.headerSubtitle}>
              Update your payment details below
            </Text>
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
                backgroundColor: activeTab === 'Bank' ? '#005298' : '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setActiveTab('Bank')}
            >
              <Text
                style={{
                  color: activeTab === 'Bank' ? '#fff' : '#000',
                  fontWeight: '600',
                }}
              >
                Bank
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingVertical: 12,
                backgroundColor:
                  activeTab === 'Payment' ? '#005298' : '#E0E0E0',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setActiveTab('Payment')}
            >
              <Text
                style={{
                  color: activeTab === 'Payment' ? '#fff' : '#000',
                  fontWeight: '600',
                }}
              >
                Payment
              </Text>
            </TouchableOpacity>
          </View>
          <View
            // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {activeTab === 'Bank' && (
              <>
                <Card style={screenStyle.card}>
                  <Controller
                    control={control}
                    name="ac_name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Account Holder Name"
                        placeholder="Enter Account Holder name"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.ac_name?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="ac_number"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Account Number"
                        placeholder="Enter Account Number"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.ac_number?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="ifsc"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="IFSC Code"
                        placeholder="Enter ifsc code"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.ifsc?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="bank"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Bank"
                        placeholder="Enter bank name"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.bank?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="nominee_name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Nominee Name"
                        placeholder="Enter Nominee Name"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.nominee_name?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="nominee_relation"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        label="Nominee Relation"
                        placeholder="Enter Nominee Relation"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                        error={errors.nominee_relation?.message}
                      />
                    )}
                  />

                  <View style={{ marginTop: 20 }}>
                    <Button
                      title={isSubmitting ? 'Submitting...' : 'Submit'}
                      onPress={handleSubmit(onSubmit)}
                      loading={isSubmitting}
                      color="green"
                    />
                  </View>
                </Card>
              </>
            )}

            {activeTab === 'Payment' && <PaymentOptionScreen data={data?.data} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenStyle = StyleSheet.create({
  header: {
    marginBottom: 20,
    backgroundColor: '#005298',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#f1f1f1',
    marginTop: 6,
  },
  card: {
     width: '100%', 
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#1C1C1C',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});

export default PaymentScreen;
