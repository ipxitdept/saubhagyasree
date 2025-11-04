import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Card } from '../../components/ui/Card';
import HeaderScreen from '../Layout/HeaderScreen';

interface Deposit {
  id: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  method: string;
}


const mockDeposits: Deposit[] = [
  {
    id: '1',
    date: '2025-10-22',
    amount: 5000,
    status: 'Approved',
    method: 'Bank Transfer',
  },
  {
    id: '2',
    date: '2025-10-28',
    amount: 2500,
    status: 'Pending',
    method: 'UPI',
  },
  {
    id: '3',
    date: '2025-11-01',
    amount: 1500,
    status: 'Rejected',
    method: 'Credit Card',
  },
];

const WithdrawalHistoryScreen = () => {
  const global = createGlobalStyles();

  const renderItem = ({ item }: { item: Deposit }) => (
    <Card style={styles.card}>
      <View style={[styles.statusBox, getStatusStyle(item.status)]}>
        <Text style={[styles.statusText, getStatusTextStyle(item.status)]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Method:</Text>
        <Text style={styles.value}>{item.method}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[global.container, { backgroundColor: '#f8f9fa' }]}>
      <HeaderScreen title="Withdrawal History" showBackButton={true} />

      <FlatList
        data={mockDeposits}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContainer,
          mockDeposits.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No data found</Text>
        }
      />
    </SafeAreaView>
  );
};

// helper to style based on status
const getStatusStyle = (status: Deposit['status']) => {
  switch (status) {
    case 'Approved':
      return { backgroundColor: '#E7F8ED', borderColor: '#28a745' };
    case 'Pending':
      return { backgroundColor: '#FFF4E5', borderColor: '#FFC107' };
    case 'Rejected':
      return { backgroundColor: '#FDECEA', borderColor: '#DC3545' };
    default:
      return {};
  }
};

const getStatusTextStyle = (status: Deposit['status']) => {
  switch (status) {
    case 'Approved':
      return { color: '#28a745' };
    case 'Pending':
      return { color: '#FFC107' };
    case 'Rejected':
      return { color: '#DC3545' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop:20,
    paddingHorizontal: 1,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 3,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d6efd',
  },
  statusBox: {
    borderWidth: 1,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
  },
});

export default WithdrawalHistoryScreen;
