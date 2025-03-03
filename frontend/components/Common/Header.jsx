import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library

const Header = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1D1D1D', 
    height: 60, 
    justifyContent: 'center', 
    paddingHorizontal: 10, 
  },
  backButton: {
    position: 'absolute', 
    left: 10, 
  },
});

export default Header;
