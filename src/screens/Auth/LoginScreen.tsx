import React from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { theme } from '../../theme';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import { useCreateLoginMutation } from '../../services/type';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';

type LoginFormData = {
  user_id: string;
  password: string;
};

const LoginScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [createLogin, { isLoading }] = useCreateLoginMutation();
  const loginSchema = Yup.object().shape({
    user_id: Yup.string().required('User Id is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await createLogin(data)
        .unwrap()
        .then(res => {
          dispatch(
            setUser({
              user_id: res?.data?.user?.user_id,
              name: res?.data?.user?.name,
              email: res?.data?.user?.email,
              token: res?.data?.token,
            }),
          );
          reset();
          enqueueSnackbar('Login Successfull', { variant: 'success' });
        })
        .catch((errors: any) => {
          console.log(errors);
          enqueueSnackbar(errors?.data?.message, { variant: 'error' });
        });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error, { variant: 'error' });
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
              }}
            >
              Login
            </Text>

            <Controller
              control={control}
              name="user_id"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="User ID"
                  placeholder="Enter your user id"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.user_id?.message}
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

            <View style={{ marginTop: 20 }}>
              <Button
                title={isSubmitting ? 'Logging in...' : 'Login'}
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
              Don’t have an account?{' '}
              <Text
                style={{ color: theme.colors.tercary }}
                onPress={() => navigation.navigate('Signup')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
