import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../store/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from '../../context/SnackbarProviderToast';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AccountScreen = () => {
  const styles = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.user);
  const referralLink = user?.user_id;
  const dispatch = useDispatch();
  const copyReferralLink = () => {
    Clipboard.setString(referralLink);
    Alert.alert('Copied!', 'Referral code has been copied.');
  };

  const handleLogout = () => {
    enqueueSnackbar('Logout Successfull', { variant: 'success' });
    dispatch(logout());
  };

  return (
    <HelmetScreen>
      <SafeAreaView style={styles.container}>
        <View style={screenStyle.profileCard}>
          <View style={screenStyle.avatar}>
            <Icon name="person-circle-outline" size={80} color="#4A90E2" />
          </View>
          <Text style={screenStyle.name}>{user?.name}</Text>
          <Text style={screenStyle.email}>{user?.email}</Text>

          <View style={screenStyle.infoRow}>
            <Text style={screenStyle.infoLabel}>Wallet Balance:</Text>
            <Text style={screenStyle.infoValue}>$150,000</Text>
          </View>

          <View style={screenStyle.infoRow}>
            <Text style={screenStyle.infoLabel}>Referral Code:</Text>
            <Text style={screenStyle.infoValue}>{user?.user_id}</Text>
          </View>

          <View style={screenStyle.buttonContainer}>
            <Button
              title="Update Profile"
              onPress={() => navigation.navigate('Profile')}
              color="primary"
            />
            <View style={{ height: 10 }} />
            <Button
              title="Update Payment Info"
              onPress={() => navigation.navigate('Payment')}
              color="blue"
            />
            <View style={{ height: 10 }} />
            <Button
              title="Copy Referral Code"
              onPress={copyReferralLink}
              color="tercary"
            />
            <View style={{ height: 10 }} />
            <Button title="Logout" onPress={handleLogout} color="red" />
          </View>
        </View>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const screenStyle = StyleSheet.create({
  profileCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});

export default AccountScreen;
