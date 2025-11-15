import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HelmetScreen from '../Layout/HelmetScreen';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import {
  useGetDirectRewardQuery,
  useGetRewardQuery,
} from '../../services/type';

const RewardScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { data: directReward } = useGetDirectRewardQuery<any>({});
  const { data } = useGetRewardQuery<any>({});

  const RewardCard = ({ item }: any) => (
    <View style={screenStyles.rewardCard}>
      <Text style={screenStyles.rankTitle}>{item?.rank_name}</Text>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Team Business:</Text>
        <Text style={screenStyles.value}>{item?.add_pv}</Text>
      </View>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Income:</Text>
        <Text style={screenStyles.value}>
          $ {item.income} *{' '}
          {item.upto_days == 0 ? 'Life time' : item.upto_days + ' ' + 'Days'}{' '}
          {item.monthly_target > 0
            ? '$' + ' ' + item?.monthly_target + ' ' + 'Every month'
            : ''}
        </Text>
      </View>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Status:</Text>
        <Text
          style={[
            screenStyles.value,
            { color: data?.data?.myAch >= item?.id ? 'green' : '#999' },
          ]}
        >
          {data?.data?.myAch >= Number(item?.id) ? 'Achieved' : '-'}
        </Text>
      </View>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Remaining Days:</Text>
        <Text style={screenStyles.value}>
          {data?.data?.rwdArr[item?.id] ?? ''}
        </Text>
      </View>
    </View>
  );

  const DirectRewardCard = ({ item }: any) => (
    <View style={screenStyles.rewardCard}>
      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Direct Business:</Text>
        <Text style={screenStyles.value}>{item?.pv}</Text>
      </View>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Offers:</Text>
        <Text style={screenStyles.value}>{item?.income}</Text>
      </View>

      <View style={screenStyles.row}>
        <Text style={screenStyles.label}>Status:</Text>
        <Text
          style={[
            screenStyles.value,
            { color: directReward?.data?.myAch >= item.id ? 'green' : '#999' },
          ]}
        >
          {directReward?.data?.myAch >= Number(item.id) ? 'Achieved' : '-'}
        </Text>
      </View>
    </View>
  );

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={{ marginTop: 20, paddingHorizontal: 12 }}>
            <Text style={screenStyles.sectionTitle}>Rank & Rewards</Text>

            {data?.data?.inc_tbl.map((item: any, index: number) => (
              <RewardCard key={index} item={item} />
            ))}
          </View>

          <View
            style={{ marginTop: 20, paddingHorizontal: 12, marginBottom: 20 }}
          >
            <Text style={screenStyles.sectionTitle}>Direct Reward</Text>

            {directReward?.data?.inc_tbl.map((item: any, index: number) => (
              <DirectRewardCard key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const screenStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f1f1f1',
    marginBottom: 12,
  },

  rewardCard: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  rankTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e7f1ff',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B0B0B0',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B0B0B0',
  },
});

export default RewardScreen;
