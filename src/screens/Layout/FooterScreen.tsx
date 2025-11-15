import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const FooterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.item}
      >
        <Icon name="home-outline" size={22} color="#007bff" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Wallet')}
        style={styles.item}
      >
        <Icon name="cash-outline" size={22} color="#fff" />
        <Text style={styles.label}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Reward')}
        style={styles.item}
      >
        <Icon name="gift-outline" size={22} color="#fff" />
        <Text style={styles.label}>Reward</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Investment')}
        style={styles.item}
      >
        <Icon name="bar-chart-outline" size={22} color="#fff" />
        <Text style={styles.label}>Investment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={styles.item}
      >
        <Icon name="person-outline" size={22} color="#fff" />
        <Text style={styles.label}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#121212',
    paddingVertical: 20,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
});

export default FooterScreen;
