import React from 'react';
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
import { Card } from '../../components/ui/Card';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useCreateWithdrawRequestMutation } from '../../services/type';
import { Select } from '../../components/ui/Select';

type WithdrawalFormData = {
  amount: number;
  remarks: string;
   req_type: string;
};

const WithdrawalScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [createWithdrawal] = useCreateWithdrawRequestMutation();
  const depositSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required'),
    remarks: Yup.string().required('Remarks is required'),
     req_type: Yup.string().required('Request type is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WithdrawalFormData>({
    resolver: yupResolver(depositSchema) as any,
    mode: 'onTouched',
  });

  const onSubmit = async (data: WithdrawalFormData) => {
    try { 
      const walletReq = new FormData();
      walletReq.append('req_bal', data?.amount )
       walletReq.append('remarks',data?.remarks )
        walletReq.append('req_type', data?.req_type )
      await createWithdrawal(walletReq)
        ?.unwrap()
        ?.then((res: any) => {
          enqueueSnackbar('Withdrawal request submitted successfully', {
            variant: 'success',
          });
          reset();
          navigation.navigate('WithdrawalHistory');
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* <Card> */}
            {/* <View style={styles.centered}></View> */}

            <Text style={screenStyle.title}>Withdrawal Request</Text>
            
             <Controller
                  control={control}
                  name="req_type"
                  
                  render={({ field: { onChange, value } }) => (
                    <Select
                    
                      label="Request Type"
                      value={value}
                      onChange={onChange}
                      options={[
                        { label: 'Select Request type', value: '' },
                        { label: 'Profit', value: 'Profit' },
                        { label: 'Capital', value: 'Capital' },
                      ]}
                      
                      error={errors.req_type?.message}
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

            <Controller
              control={control}
              name="remarks"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Remarks"
                  placeholder="Remarks"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.remarks?.message}
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
          {/* </Card> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenStyle = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
      color: '#D1D5DB',
  },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 4 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: { height: 50, width: '100%' },
  uploadButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
});

export default WithdrawalScreen;
