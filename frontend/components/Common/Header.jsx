import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Start Planning a Surprise</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10, // Reduced top and bottom spacing
    paddingHorizontal: 15, // Add some left and right spacing
  },
  title: {
    fontSize: 24, // Font size for the title
    fontWeight: 'bold',
    color: '#000', // Black text color
    textAlign: 'left', // Left-aligned text
  },
  subtitle: {
    fontSize: 16, // Font size for the subtitle
    color: '#000', // Black text color
    marginTop: 5,
    textAlign: 'left', // Left-aligned text
  },
});

export default Header;
