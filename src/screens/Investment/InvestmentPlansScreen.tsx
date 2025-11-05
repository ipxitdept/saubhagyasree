import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const plans = [
  {
    id: '1',
    range: '$100 - $2500',
    rate: '0.25% Daily',
    duration: 'Up to 26 months',
    color: '#007BFF',
  },
  {
    id: '2',
    range: '$2501 - $12000',
    rate: '0.30% Daily',
    duration: 'Up to 23 months',
    color: '#28A745',
  },
  {
    id: '3',
    range: '$12001 - Unlimited',
    rate: '0.40% Daily',
    duration: 'Up to 16.5 months',
    color: '#FF8800',
  },
];

const InvestmentPlans = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💼 Investment Plans</Text>

      {plans.map(item => (
        <View
          key={item.id}
          style={[styles.card, { borderLeftColor: item.color }]}
        >
          <View style={styles.iconContainer}>
            <Icon name="cash-outline" size={26} color={item.color} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.range}>{item.range}</Text>

            <View style={styles.detailRow}>
              <Icon name="trending-up-outline" size={16} color="#555" />
              <Text style={styles.detailText}> {item.rate}</Text>
            </View>

            <View style={styles.detailRow}>
              <Icon name="time-outline" size={16} color="#555" />
              <Text style={styles.detailText}> {item.duration}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 40,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    borderLeftWidth: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  range: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#555',
  },
});

export default InvestmentPlans;
