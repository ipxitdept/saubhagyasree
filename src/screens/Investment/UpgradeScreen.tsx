import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useCreateActivationMutation } from '../../services/type';

type ActivateFormData = {
  amount: number;
  user_id: string;
};

const UpgradeScreen = () => {
  const { enqueueSnackbar } = useSnackbar();
    const [createActivate] = useCreateActivationMutation();
  const depositSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Amount must be a number')
      .required('Amount is required'),
    user_id: Yup.string().required('User Id is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ActivateFormData>({
    resolver: yupResolver(depositSchema) as any,
    mode: 'onTouched',
  });

  const onSubmit = async (data: ActivateFormData) => {
     try {
      const activateData = new FormData();
      activateData.append('uid', data?.user_id);
      activateData.append('plan', data?.amount);
      await createActivate(activateData)
        .unwrap()
        .then(() => {
          enqueueSnackbar('Upgrade Successfull', { variant: 'success' });
          reset();
        })
        .catch(err => {
          enqueueSnackbar(err?.data?.message, { variant: 'error' });
          console.log(err);
        });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  return (
     <View style={{ width: '100%' }}>
     {/* <Card style={{ width: '100%' }}> */}
      <Text style={screenStyle.title}>Upgrade Package</Text>

      <Controller
        control={control}
        name="user_id"
        render={({ field: { onChange, value } }) => (
          <Input
            label="User Id"
            placeholder="User Id"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            error={errors.user_id?.message}
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
    {/* </Card> */}
    </View>
  );
};

const screenStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
     color: '#D1D5DB',
  },

  uploadButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpgradeScreen;
