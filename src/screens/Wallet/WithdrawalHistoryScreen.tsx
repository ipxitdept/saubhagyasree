import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { Card } from '../../components/ui/Card';
import HeaderScreen from '../Layout/HeaderScreen';
import { useGetWithdrawalHistoryQuery } from '../../services/type';

const WithdrawalHistoryScreen = () => {
  const global = createGlobalStyles();
  const { data, isLoading } = useGetWithdrawalHistoryQuery();
  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card}>
      <View style={[styles.statusBox, getStatusStyle(item.status)]}>
        <Text style={[styles.statusText, getStatusTextStyle(item.status)]}>
          {item.status == 2
            ? 'Approved'
            : item.status == 1
            ? 'Pending'
            : 'Rejected'}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item?.req_date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.amount}>{item?.req_balance.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{item.req_type}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[global.container]}>
      <HeaderScreen title="Withdrawal History" showBackButton={true} />
      {isLoading ? (
        <>
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          <FlatList
            data={data?.data}
            // keyExtractor={item => index}
            renderItem={renderItem}
            contentContainerStyle={[
              styles.listContainer,
              data?.data.length === 0 && {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No data found</Text>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const getStatusStyle = (status: any) => {
  switch (Number(status)) {
    case 2:
      return { backgroundColor: '#E7F8ED', borderColor: '#28a745' };
    case 1:
      return { backgroundColor: '#FFF4E5', borderColor: '#FFC107' };
    case 0:
      return { backgroundColor: '#FDECEA', borderColor: '#DC3545' };
    default:
      return {};
  }
};

const getStatusTextStyle = (status: any) => {
  switch (Number(status)) {
    case 2:
      return { color: '#28a745' };
    case 1:
      return { color: '#FFC107' };
    case 0:
      return { color: '#DC3545' };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 1,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#1C1C1C',
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
    color: '#B0B0B0',
  },
  value: {
    fontSize: 16,
    color: '#B0B0B0',
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
