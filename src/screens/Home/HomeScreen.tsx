import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetDashboardQuery } from '../../services/dashboard/dashboard';
import IncomeCardScreen from './IncomeCardScreen';

export const HomeScreen = () => {
  const styles = createGlobalStyles();
  const { data } = useGetDashboardQuery<any>({});
     
  return (
    <HelmetScreen>
      <SafeAreaView style={[styles.container, { backgroundColor: '#f2f4f7' }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={screenStyles.bannerContainer}>
            <Image
              source={require('../../assets/images/banner2.jpg')}
              style={screenStyles.banner}
              resizeMode="cover"
            />
            <View style={screenStyles.overlay}>
              <Text style={screenStyles.welcomeTitle}>Welcome Back 👋</Text>
              <Text style={screenStyles.subText}>
                Your business at a glance
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
            <Text style={screenStyles.sectionTitle}>Income Dashboard</Text>
            <View style={screenStyles.gridContainer}>
              <IncomeCardScreen
                title={'ROI'}
                amount={data?.data?.wallet?.roi_income}
                icon={'trending-up'}
                color={'#007bff'}
              />
              <IncomeCardScreen
                title={'Direct Income'}
                amount={data?.data?.wallet?.direct_income}
                icon={'person-add'}
                color={'#ff6f61'}
              />
              <IncomeCardScreen
                title={'Level Income'}
                amount={data?.data?.wallet?.level_income}
                icon={'layers'}
                color={'#17a2b8'}
              />
              <IncomeCardScreen
                title={'Reward Income'}
                amount={data?.data?.wallet?.reward_income}
                icon={'trophy'}
                color={'##ffc107'}
              />
              <IncomeCardScreen
                title={'Total Income'}
                amount={data?.data?.wallet?.total_income}
                icon={'cash'}
                color={'#28a745'}
              />
              <IncomeCardScreen
                title={'Withdraw Amount'}
                amount={data?.data?.wallet?.used_amount}
                icon={'arrow-down-circle'}
                color={'#dc3545'}
              />
              <IncomeCardScreen
                title={'Net Amount'}
                amount={
                  data?.data?.wallet?.total_income -
                  (data?.data?.wallet?.used_amount +
                    Number(data?.data?.withdraw_request))
                }
                icon={'calculator'}
                color={'#6f42c1'}
              />
              <IncomeCardScreen
                title={'Available Fund'}
                amount={data?.data?.wallet?.used_amount}
                icon={'wallet'}
                color={'#20c997'}
              />
            </View>
          </View>

          <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
            <Text style={screenStyles.sectionTitle}>Team Overview</Text>
            <View style={screenStyles.gridContainer}>
              <IncomeCardScreen
                title={'Direct Team'}
                amount={data?.data?.team?.total_direct}
                icon={'people'}
                color={'#0d6efd'}
              />
              <IncomeCardScreen
                title={'Direct Active'}
                amount={data?.data?.team?.active_direct}
                icon={'checkmark-circle'}
                color={'#28a745'}
              />
              <IncomeCardScreen
                title={'Direct Inactive'}
                amount={data?.data?.team?.inactive_direct}
                icon={'close-circle'}
                color={'#dc3545'}
              />
              <IncomeCardScreen
                title={'Level Open'}
                amount={data?.data?.team?.level_eligible}
                icon={'lock-open'}
                color={'#ffc107'}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 12,
              paddingBottom: 30,
              marginBottom: 20,
            }}
          >
            <Text style={screenStyles.sectionTitle}>Business Report</Text>

            <View
              style={[
                screenStyles.businessCard,
                { borderLeftColor: '#007bff' },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={screenStyles.businessTitle}>
                  {'Direct Business'}
                </Text>
                <Ionicons name="bar-chart" size={22} color={'#007bff'} />
              </View>

              <Text style={[screenStyles.businessAmount, { color: '#007bff' }]}>
                $ {data?.data?.team?.direct_business}
              </Text>

              <View style={screenStyles.progressContainer}>
                <View
                  style={[
                    screenStyles.progressBar,
                    { width: `${100}%`, backgroundColor: '#007bff' },
                  ]}
                />
              </View>
            </View>

            <View
              style={[
                screenStyles.businessCard,
                { borderLeftColor: '#28a745' },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={screenStyles.businessTitle}>
                  {'Team Business'}
                </Text>
                <Ionicons name="bar-chart" size={22} color={'#28a745'} />
              </View>

              <Text style={[screenStyles.businessAmount, { color: '#28a745' }]}>
                $ {0}
              </Text>

              <View style={screenStyles.progressContainer}>
                <View
                  style={[
                    screenStyles.progressBar,
                    { width: `${100}%`, backgroundColor: '#28a745' },
                  ]}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const screenStyles = StyleSheet.create({
  bannerContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 1,
  },
  banner: {
    width: '100%',
    height: 220,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: '#f1f1f1',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

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

  teamCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 20,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 3,
  },
  teamTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  teamCount: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },

  businessCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    borderLeftWidth: 5,
  },
  businessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  businessAmount: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 6,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  growthText: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
});
