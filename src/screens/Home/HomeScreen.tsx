import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const HomeScreen = () => {
  const styles = createGlobalStyles();

 
  const incomeData = [
    {
      id: '1',
      title: 'ROI',
      amount: 1500,
      icon: 'trending-up',
      color: '#007bff',
    },
    {
      id: '2',
      title: 'Direct Income',
      amount: 800,
      icon: 'person-add',
      color: '#ff6f61',
    },
    {
      id: '3',
      title: 'Level Income',
      amount: 450,
      icon: 'layers',
      color: '#17a2b8',
    },
    {
      id: '4',
      title: 'Reward Income',
      amount: 2500,
      icon: 'trophy',
      color: '#ffc107',
    },
    {
      id: '5',
      title: 'Total Income',
      amount: 3200,
      icon: 'cash',
      color: '#28a745',
    },
    {
      id: '6',
      title: 'Withdrawal Amount',
      amount: 900,
      icon: 'arrow-down-circle',
      color: '#dc3545',
    },
    {
      id: '7',
      title: 'Net Amount',
      amount: 2300,
      icon: 'calculator',
      color: '#6f42c1',
    },
    {
      id: '8',
      title: 'Available Fund',
      amount: 2500,
      icon: 'wallet',
      color: '#20c997',
    },
  ];


  const teamData = [
    {
      id: '1',
      title: 'Direct Team',
      count: 20,
      icon: 'people',
      color: '#0d6efd',
    },
    {
      id: '2',
      title: 'Active Members',
      count: 15,
      icon: 'checkmark-circle',
      color: '#28a745',
    },
    {
      id: '3',
      title: 'Inactive Members',
      count: 5,
      icon: 'close-circle',
      color: '#dc3545',
    },
    {
      id: '4',
      title: 'Level Open',
      count: 10,
      icon: 'lock-open',
      color: '#ffc107',
    },
  ];


  const businessReport = [
    {
      id: '1',
      title: 'Direct Business',
      amount: 120000,
      growth: 65,
      color: '#007bff',
    },
    {
      id: '2',
      title: 'Team Business',
      amount: 350000,
      growth: 85,
      color: '#28a745',
    },
  ];

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
              {incomeData.map(item => (
                <View key={item.id} style={screenStyles.incomeCard}>
                  <View
                    style={[
                      screenStyles.iconCircle,
                      { backgroundColor: item.color + '15' },
                    ]}
                  >
                    <Ionicons name={item.icon} size={28} color={item.color} />
                  </View>
                  <Text style={screenStyles.incomeTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text
                    style={[screenStyles.incomeAmount, { color: item.color }]}
                  >
                    $ {item.amount.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </View>

       
          <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
            <Text style={screenStyles.sectionTitle}>Team Overview</Text>
            <View style={screenStyles.gridContainer}>
              {teamData.map(item => (
                <View key={item.id} style={screenStyles.teamCard}>
                  <Ionicons name={item.icon} size={28} color={item.color} />
                  <Text style={screenStyles.teamTitle}>{item.title}</Text>
                  <Text style={[screenStyles.teamCount, { color: item.color }]}>
                    {item.count}
                  </Text>
                </View>
              ))}
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
            {businessReport.map(item => (
              <View
                key={item.id}
                style={[
                  screenStyles.businessCard,
                  { borderLeftColor: item.color },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={screenStyles.businessTitle}>{item.title}</Text>
                  <Ionicons name="bar-chart" size={22} color={item.color} />
                </View>

                <Text
                  style={[screenStyles.businessAmount, { color: item.color }]}
                >
                  $ {item.amount.toLocaleString()}
                </Text>

                <View style={screenStyles.progressContainer}>
                  <View
                    style={[
                      screenStyles.progressBar,
                      { width: `${item.growth}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>

                <Text style={screenStyles.growthText}>
                  Growth: {item.growth}%
                </Text>
              </View>
            ))}
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
