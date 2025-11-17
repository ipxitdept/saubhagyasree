import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useUpdatePaymentMutation } from '../../services/type';

type PaymentFormData = {
  paytm: string;
  phonepe: string;
  upi: string;
  googlepe: string;
  crypto_address: string;
};

const PaymentOptionScreen = (data: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updatePayment] = useUpdatePaymentMutation();

  const paymentSchema = Yup.object().shape({
    paytm: Yup.string(),
    phonepe: Yup.string(),
    upi: Yup.string(),
    googlepe: Yup.string(),
    crypto_address: Yup.string(),
  });

  const defaultPayment = {
    paytm: '',
    phonepe: '',
    upi: '',
    googlepe: '',
    crypto_address: '',
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormData>({
    resolver: yupResolver(paymentSchema) as any,
    mode: 'onTouched',
    defaultValues: defaultPayment,
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        paytm: data.data.paytm || '',
        phonepe: data.data.phonepe || '',
        upi: data.data.upino || '',
        googlepe: data.data.tez || '',
        crypto_address: data.data.tron_address || '',
      });
    }
  }, [data, reset]);
  const onSubmit = async (payData: PaymentFormData) => {
    try {
      await updatePayment({
        paytm: payData?.paytm,
        phonepe: payData?.phonepe,
        upino: payData?.upi,
        tez: payData?.googlepe,
        tron_address: payData?.crypto_address,
      })
        .unwrap()
        .then(res => {
          reset();
          enqueueSnackbar('Payment details updated successfully', {
            variant: 'success',
          });
        })
        .catch(err => {
          enqueueSnackbar(err?.data?.message, { variant: 'error' });
        });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 30,
          //   paddingHorizontal: 20,
        }}
      >
        <Card style={screenStyle.card}>
          <Controller
            control={control}
            name="paytm"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Paytm"
                placeholder="Paytm"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.paytm?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phonepe"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Phone Pe"
                placeholder="Phone Pe"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.phonepe?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="upi"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Bhim UPI"
                placeholder="Bhim UPI"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.upi?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="googlepe"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Google Pe"
                placeholder="Google Pe"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.googlepe?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="crypto_address"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Crypto Address"
                placeholder="Crypto Address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                error={errors.crypto_address?.message}
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
      </ScrollView>
    </KeyboardAvoidingView>
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

export default PaymentOptionScreen;
