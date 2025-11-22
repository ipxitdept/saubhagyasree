import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

interface IncomeCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  onClick?: () => void;
  textColor?: string;
  titleColor?: string;
  color1?: string;
  color2?: string;
}

const IncomeCardScreen: React.FC<IncomeCardProps> = ({
  title,
  amount,
  icon,
  color,
  textColor = '#6bdbef',
  titleColor =  '#FFFFFF',
  color1 = '#571266',
  color2 = '#ec5db9',
  onClick,
}) => {
  const mode = 'dark';
  const current = theme[mode as 'light' | 'dark'];

  return (
    <LinearGradient colors={[color1, color2]} style={styles.incomeCard}>
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={0.8}
        style={styles.centerContent} 
      >
        <View style={[styles.iconCircle, { backgroundColor: color + '25' }]}>
          <Ionicons name={icon} size={28} color={color} />
        </View>

        <Text style={[styles.incomeTitle, { color:titleColor }]}>
          {title}
        </Text>

        <Text style={[styles.incomeAmount, { color:textColor }]}>
          {amount?.toLocaleString()}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default IncomeCardScreen;

const styles = StyleSheet.create({
  incomeCard: {
    width: '48%',
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

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
    textAlign: 'center',
    paddingHorizontal: 6,
  },

  incomeAmount: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
