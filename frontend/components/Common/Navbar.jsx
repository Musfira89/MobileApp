import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Navbar = ({ navigation}) => {

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.navItem}>
        <Ionicons name="restaurant" size={24} color="#fff" />
        <Text style={styles.navText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reservationsummary')} style={styles.navItem}>
        <Ionicons name="book" size={24} color="#fff" />
        <Text style={styles.navText}>Reservations</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SplashScreen1')} style={styles.navItem}>
        <Ionicons name="car" size={24} color="#fff" />
        <Text style={styles.navText}>Transport</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} style={styles.navItem}>
        <Ionicons name="menu" size={24} color="#fff" />
        <Text style={styles.navText}>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1D1D1D', // Changed to black
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Navbar;