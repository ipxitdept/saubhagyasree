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

type LoginFormData = {
  user_id: string;
  password: string;
};

  const LoginScreen = () => {
  const styles = createGlobalStyles();
   const navigation =useNavigation<any>();
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

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Alert.alert('Success', `Welcome back, ${data.email.split('@')[0]}!`);
    reset();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <Text style={{ color: theme.colors.tercary }} onPress={() => navigation.navigate('Signup')}>Sign Up</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
