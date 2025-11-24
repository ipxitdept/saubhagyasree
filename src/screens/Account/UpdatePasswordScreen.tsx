import React from 'react';
import {
  View,
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
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useUpdatePasswordsMutation } from '../../services/type';
import HeaderScreen from '../Layout/HeaderScreen';

type PasswordFormData = {
  old: string;
  new: string;
  confirm_passwords: string;
};

const UpdatePasswordScreen = () => {
  const styles = createGlobalStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [updatePassword] = useUpdatePasswordsMutation();
  const passwordSchema = Yup.object().shape({
    old: Yup.string().required('Old passwords is required'),
    new: Yup.string().required('New passwords is required'),
    confirm_passwords: Yup.string()
      .oneOf([Yup.ref('new')], 'New Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await updatePassword(data)
        ?.unwrap()
        ?.then((res: any) => {
          enqueueSnackbar('Password updated successfully', {
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
          <HeaderScreen title="Update Password" showBackButton={true} />

          <View style={{ marginTop: 30 }}>
            <Controller
              control={control}
              name="old"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Old Passwords"
                  placeholder="Old Passwords"
                  autoCapitalize="none"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.old?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="new"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="New password"
                  placeholder="New password"
                  autoCapitalize="none"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.new?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_passwords"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirm_passwords?.message}
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

export default UpdatePasswordScreen;
