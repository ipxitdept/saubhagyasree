import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/ui/Input';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Button } from '../../components/ui/Button';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useCreateSignupMutation } from '../../services/type';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';

type SignupFormData = {
  sponsor_id: string;
  name: string;
  mobile: number;
  email: string;
  nominee_name: string;
  password: string;
  confirm_password: string;
};
const SignupScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [createSignup] = useCreateSignupMutation();
  const dispatch = useDispatch();
  const signupSchema = Yup.object().shape({
    sponsor_id: Yup.string().required('Sponsor ID is required'),
    name: Yup.string().required('Name is required'),
    mobile: Yup.number()
      .typeError('Mobile must be a number')
      .required('Mobile number is required')
      .min(1000000000, 'Mobile number must be 10 digits')
      .max(9999999999, 'Mobile number must be 10 digits'),
    nominee_name: Yup.string().required('Nominee name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const signupData = new FormData();
      signupData.append('a_id', data?.sponsor_id);
      signupData.append('name', data?.name);
      signupData.append('email', data?.email);
      signupData.append('mobile', data?.mobile);
      signupData.append('nominee_name', data?.nominee_name);
      signupData.append('password', data?.password);
      signupData.append('confirm_password', data?.confirm_password);

      await createSignup(signupData)
        .unwrap()
        .then(res => {
          dispatch(
            setUser({
              user_id: res?.data?.login?.user?.user_id,
              name: res?.data?.login?.user?.name,
              email: res?.data?.login?.user?.email,
              token: res?.token,
            }),
          );

          reset();
          enqueueSnackbar('Signup Successfull', { variant: 'success' });
        })
        .catch((err: any) => {
          console.log(err);
          enqueueSnackbar(err?.data?.message, { variant: 'error' });
        });
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centered}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: 24,
                textAlign: 'center',
                 color: theme.colors.gray300,
              }}
            >
              Signup
            </Text>
            <Controller
              control={control}
              name="sponsor_id"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Sponsor ID"
                  placeholder="Enter Sponsor ID"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.sponsor_id?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Name"
                  placeholder="Enter Name"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="mobile"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Mobile number"
                  placeholder="Enter mobile number"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={value ? String(value) : ''}
                  onChangeText={text => {
                    const numeric = text.replace(/[^0-9]/g, '');
                    onChange(numeric ? Number(numeric) : undefined);
                  }}
                  onBlur={onBlur}
                  error={errors.mobile?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
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
                  onBlur={onBlur}
                  error={errors.nominee_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirm_password?.message}
                />
              )}
            />

            <View style={{ marginTop: 20 }}>
              <Button
                title={isSubmitting ? 'Signup in...' : 'Signup'}
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting}
                color="primary"
              />
            </View>

            <Text
              style={{
                marginTop: 15,
                textAlign: 'center',
                color: theme.colors.gray500,
              }}
            >
              Alredy have an account?{' '}
              <Text
                style={{ color: theme.colors.tercary }}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
