import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import Navbar from '../components/Common/Navbar'; // Adjust the path based on your project structure

export default function ReservationSummary() {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Add the back navigation functionality */}
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Reservation{'\n'}summary <Text style={styles.dot}>.</Text></Text>

        <Text style={styles.description}>
          You've successfully booked a table at Kababjees for{' '}
          <Text style={styles.highlight}>Tuesday, November 12 at 7:00 PM</Text>.{'\n'}
          This reservation is for <Text style={styles.highlight}>4 guests</Text>.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          Reservation ID : <Text style={styles.normalText}>M01 -121</Text>
        </Text>
        <Text style={styles.label}>
          Total Bill : <Text style={styles.price}>PKR 7,000</Text> <Text style={styles.grayText}>(Paid via Card)</Text>
        </Text>

        <View style={styles.divider} />

        <Text style={styles.specialTitle}>Special Request :</Text>
        <Text style={styles.specialText}>
          A complimentary bouquet will be waiting at your guest table as our gift to you!
        </Text>

        <View style={styles.divider} />

        <Text style={styles.footerText}>
          We look forward to providing you with an exceptional dining experience.{'\n'}
          If you need to make any changes or have additional requests, feel free to contact us at{'\n'}
          <Text style={styles.email}>Feedback@gmail.com</Text>
        </Text>

        <Image
          source={require('../assets/images/giftimage.png')}
          style={styles.giftImage}
        />
      </ScrollView>

      {/* Custom Navbar */}
      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    padding: 15,
    paddingTop: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
  },
  dot: {
    color: '#333',
    fontSize: 32,
  },
  description: {
    marginTop: 15,
    fontSize: 16,
    color: '#555',
  },
  highlight: {
    color: '#E63946',
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 2,
  },
  price: {
    color: '#E63946',
    fontWeight: 'bold',
  },
  grayText: {
    color: '#888',
    fontWeight: 'normal',
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E63946',
    marginBottom: 5,
  },
  specialText: {
    fontSize: 15,
    color: '#555',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  email: {
    fontWeight: 'bold',
    color: '#000',
  },
  giftImage: {
    width: 80,
    height: 80,
    marginTop: 20,
    alignSelf: 'center',
  },
});