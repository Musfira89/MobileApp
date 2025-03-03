import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Navbar from "../components/Common/Navbar";

const ConfirmScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="mail" size={48} color="white" />
      </View>
      <Text style={styles.title}>Reservation Successfully</Text>
      <Text style={styles.message}>
        Thank you for your reservation. Please wait for the confirmation email or SMS
      </Text>
      <Text style={styles.note}>
        We can provide you a reservation ID after email confirmation
      </Text>

      {/* Bottom Navigation */}
      <View style={styles.navbarContainer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, // Add padding to avoid overlap with navbar
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A87729',
    marginBottom: 8,
  },
  message: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  note: {
    color: '#A87729',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ConfirmScreen;