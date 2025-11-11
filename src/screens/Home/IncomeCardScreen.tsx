import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IncomeCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
}

const IncomeCardScreen: React.FC<IncomeCardProps> = ({ title, amount, icon, color }) => {
  return (
    <View style={styles.incomeCard}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.incomeTitle} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[styles.incomeAmount, { color }]}>
         {amount.toLocaleString()}
      </Text>
    </View>
  );
};

export default IncomeCardScreen;

const styles = StyleSheet.create({
  incomeCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  incomeTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 6,
  },
  incomeAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
