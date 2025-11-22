import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from '../Layout/HeaderScreen';
import { useGetLevelTeamQuery } from '../../services/type';
import LinearGradient from 'react-native-linear-gradient';

const LevelScreen = () => {
  const style = createGlobalStyles();
  const navigation = useNavigation<any>();
  const { data } = useGetLevelTeamQuery({});

  const handleViewTeam = (level: number) => {
    navigation.navigate('LevelMember', { id: level });
  };

  return (
    <HelmetScreen>
      <SafeAreaView style={[style.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <HeaderScreen title="Level Team" showBackButton={true} />

          <View>
            <LinearGradient
              colors={['#571266', '#ec5db9']}
              style={styles.tableBox}
            >
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>S.No</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Team</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>
                  Action
                </Text>
              </View>

              {data?.data?.level.map((item: any, index: number) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={[styles.tableText, { flex: 1 }]}>
                    {index + 1}
                  </Text>
                  <Text style={[styles.tableText, { flex: 1 }]}>{item}</Text>

                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewTeam(index + 1)}
                  >
                    <Text style={styles.viewButtonText}>View Team</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </HelmetScreen>
  );
};

export default LevelScreen;

const styles = StyleSheet.create({
  tableBox: {
    marginTop: 20,
    marginHorizontal: 12,
    // backgroundColor: '#1C1C1C',
    borderRadius: 12,
    paddingVertical: 5,
    overflow: 'hidden',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },

  tableHeader: {
    // backgroundColor: '#1e1e1e',
  },

  tableHeaderText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },

  tableText: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: 'center',
  },

  viewButton: {
    flex: 1,
    backgroundColor: 'green',
    paddingVertical: 6,
    borderRadius: 8,
  },

  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
});
