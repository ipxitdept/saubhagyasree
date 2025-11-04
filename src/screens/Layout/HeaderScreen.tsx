import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const HeaderScreen: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#222" />
        </TouchableOpacity>
      )}

      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    elevation: 2,
    position: 'relative', // allows absolute positioning of back button
  },
  backButton: {
    position: 'absolute', // stay on left
    left: 12,
    top: '50%',
    transform: [{ translateY: -13 }], // center vertically (half of icon size)
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
});

export default HeaderScreen;
