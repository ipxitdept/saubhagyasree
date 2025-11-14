import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { useCreateFundRequestMutation } from '../../services/type';
import { useSnackbar } from '../../context/SnackbarProviderToast';

type DepositFormData = {
  amount: number;
  payment_type: string;
  remarks: string;
};

const DepositScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [createFundRequest] = useCreateFundRequestMutation();
  const depositSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required'),
    payment_type: Yup.string().required('Payment type is required'),
    remarks: Yup.string().required('UTR NO is required'),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepositFormData>({
    resolver: yupResolver(depositSchema) as any,
    mode: 'onTouched',
  });

  const onSubmit = async (data: DepositFormData) => {
    try {
      await createFundRequest({
        remarks: data?.remarks,
        amount: data?.amount,
        type: data?.payment_type,
      })
        ?.unwrap()
        ?.then((res: any) => {
          enqueueSnackbar('Fund request submitted successfully', {
            variant: 'success',
          });
          reset();
          navigation.navigate('DepositHistory');
        })
        .catch((err: any) => {
          enqueueSnackbar(err?.message, { variant: 'error' });
          console.log(err);
        });
    } catch (error) {
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
          contentContainerStyle={screenStyle.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={screenStyle.header}>
            <Text style={screenStyle.headerTitle}>Fund Request</Text>
            <Text style={screenStyle.headerSubtitle}>
              Fill in the details below to deposit funds
            </Text>
          </View>

          {/* Form Card */}
          {/* <Card style={screenStyle.card}> */}
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

            <Controller
              control={control}
              name="payment_type"
              
              render={({ field: { onChange, value } }) => (
                <Select
               
                  label="Payment Type"
                  value={value}
                  onChange={onChange}
                  options={[
                    { label: 'Select payment type', value: '' },
                    { label: 'IMPS', value: 'IMPS' },
                    { label: 'UPI', value: 'UPI' },
                    { label: 'RTGS', value: 'RTGS' },
                    { label: 'CHEQUE', value: 'CHEQUE' },
                    { label: 'OTHERS', value: 'OTHERS' },
                  ]}
                  
                  error={errors.payment_type?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="remarks"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="UTR NO."
                  placeholder="Enter UTR NO"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.remarks?.message}
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
          {/* </Card> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenStyle = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    backgroundColor: '#4e73df',
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
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});

export default DepositScreen;
