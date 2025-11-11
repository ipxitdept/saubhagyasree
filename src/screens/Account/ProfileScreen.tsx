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
import { Card } from '../../components/ui/Card';
import { useSnackbar } from '../../context/SnackbarProviderToast';

type ProfileFormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

const ProfileScreen = () => {
  const styles = createGlobalStyles();
  const { enqueueSnackbar } = useSnackbar();
  const profileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string().required('Pincode is required'),
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log(data);
      reset();
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (error) {}
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
          {/* Header */}
          <View style={screenStyle.header}>
            <Text style={screenStyle.headerTitle}>Edit Profile </Text>
            <Text style={screenStyle.headerSubtitle}>
              Update your personal details below
            </Text>
          </View>

          <Card style={screenStyle.card}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Name"
                  placeholder="Enter name"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Address"
                  placeholder="Enter address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="City"
                  placeholder="Enter city"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.city?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="State"
                  placeholder="Enter state"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.state?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Country"
                  placeholder="Enter country"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.country?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="pincode"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Pincode"
                  placeholder="Enter pincode"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  error={errors.pincode?.message}
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
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
});

export default ProfileScreen;
