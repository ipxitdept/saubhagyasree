import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { useRoute } from '@react-navigation/native';
import HeaderScreen from '../Layout/HeaderScreen';
import { useGetIncomeHistoryQuery } from '../../services/type';
import LinearGradient from 'react-native-linear-gradient';

const IncomeHistoryScreen = () => {
  const style = createGlobalStyles();
  const route = useRoute();
  const { inc } = route.params as any;
  const { data } = useGetIncomeHistoryQuery(inc);
  const members = data?.data ||  [] as any;

  const [page, setPage] = useState(1);
  const perPage = 10;
  const total = members.length;
  const totalPages = Math.ceil(total / perPage);

  const start = (page - 1) * perPage;
  const currentPageData = members.slice(start, start + perPage);

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container]}>
        <HeaderScreen title={`Income History`} showBackButton={true} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            <LinearGradient
                      colors={['#571266', '#ec5db9']}
                    
                    >
            <View>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.th, { width: 60 }]}>S.No</Text>
                <Text style={[styles.th, { width: 120 }]}>Income Type</Text>
                <Text style={[styles.th, { width: 100 }]}>Amount</Text>
                <Text style={[styles.th, { width: 100 }]}>Level</Text>
                <Text style={[styles.th, { width: 180 }]}> Date</Text>
              </View>

              {currentPageData.map((item: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.td, { width: 60 }]}>
                    {start + index + 1}
                  </Text>
                  <Text style={[styles.td, { width: 120 }]}>
                    {data?.title}
                  </Text>
                  <Text style={[styles.td, { width: 100 }]}>
                    {item.amount}
                  </Text>
                  <Text style={[styles.td, { width: 100 }]}>{item.level_from}</Text>
                  <Text style={[styles.td, { width: 180 }]}>
                    {item.pay_date}
                  </Text>
                </View>
              ))}
            </View>
            </LinearGradient>
          </ScrollView>

          {/* Footer Text */}
          <Text style={styles.footerText}>
            Showing {start + 1} to {Math.min(start + perPage, total)} of {total}{' '}
            entries
          </Text>

          <View style={styles.pagination}>
            <TouchableOpacity
              disabled={page === 1}
              onPress={() => setPage(page - 1)}
              style={[styles.pageButton, page === 1 && styles.disabled]}
            >
              <Text style={[styles.pageText, page === 1 && { color: '#666' }]}>
                Previous
              </Text>
            </TouchableOpacity>

            {[...Array(totalPages)].map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => setPage(i + 1)}
                style={[styles.pageButton, page === i + 1 && styles.activePage]}
              >
                <Text
                  style={[styles.pageText, page === i + 1 && { color: '#fff' }]}
                >
                  {i + 1}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              disabled={page === totalPages}
              onPress={() => setPage(page + 1)}
              style={[
                styles.pageButton,
                page === totalPages && styles.disabled,
              ]}
            >
              <Text
                style={[
                  styles.pageText,
                  page === totalPages && { color: '#666' },
                ]}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

export default IncomeHistoryScreen;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // backgroundColor: '#1C1C1C',
    minHeight: 45,
    alignItems: 'center',
  },

  tableHeader: {
    // backgroundColor: '#1C1C1C',
  },

  th: {
    color: '#fff',
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 14,
    textAlign: 'center',
  },

  td: {
    color: '#B0B0B0',
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    textAlign: 'center',
  },

  footerText: {
    marginTop: 10,
    color: '#ccc',
    textAlign: 'center',
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },

  pageButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginHorizontal: 4,
    marginBottom: 6,
  },

  pageText: {
    color: '#333',
    fontWeight: '600',
  },

  activePage: {
    backgroundColor: '#0d6efd',
  },

  disabled: {
    backgroundColor: '#ccc',
  },
});
