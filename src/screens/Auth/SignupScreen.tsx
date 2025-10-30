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

type SignupFormData = {
  sponsor_id: string;
  name: string;
  mobile: number;
//   email: string;
//   nominee_name: string;
//   password: string;
//   confirm_password: string;
};
const SignupScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const signupSchema = Yup.object().shape({
    sponsor_id: Yup.string().required('Sponsor id is required'),
    name: Yup.string().required('name id is required'),
    mobile: Yup.number()
      .typeError('Mobile must be a number')
      .required('Mobile number is required')
      .min(1000000000, 'Mobile number must be 10 digits')
      .max(9999999999, 'Mobile number must be 10 digits'),
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
