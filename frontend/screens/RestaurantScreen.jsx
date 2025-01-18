import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Navbar from '../components/Common/Navbar';

export default function RestaurantScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Image Section */}
      <Image
        source={require('../assets/images/KababJees.png')}
        style={styles.image}
      />

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image
          source={require('../assets/images/kababjeeslogo.jpg')}
            style={styles.logo}
          />
          <Text style={styles.rating}>
            4.8/5 <FontAwesome name="star" size={14} color="#FFCC00" />
          </Text>
        </View>

        {/* Restaurant Name */}
        <Text style={styles.title}>Kababjees | Super Highway</Text>

        {/* Location and Call Section */}
        <View style={styles.locationCallContainer}>
          <View style={styles.locationCallItem}>
            <FontAwesome name="map-marker" size={20} color="#fff" />
            <Text style={styles.address}>
              Sector 4 B Gulzar E Hijri Scheme 33, Karachi, Pakistan
            </Text>
          </View>

          <View style={styles.locationCallItem}>
            <FontAwesome name="phone" size={20} color="#fff" />
            <TouchableOpacity>
              <Text style={styles.callText}>Call Restaurant</Text>
            </TouchableOpacity>
          </View>

          {/* Divider Line */}
          <View style={styles.divider} />
        </View>

        {/* Notes Section */}
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <FontAwesome name="file-text" size={20} color="#fff" />
            <Text style={styles.sectionText}>
              Please be informed of the following for your convenience:
              Maximum of 6 guests per table.
            </Text>
          </View>
          <View style={styles.divider} />
        </View>

        {/* Hours Section */}
        <View style={styles.section}>
          <View style={styles.sectionItem}>
            <FontAwesome name="clock" size={20} color="#fff" />
            <Text style={styles.sectionText}>Monday to Saturday: 3:PM to 10PM</Text>
          </View>
          <View style={styles.sectionItem}>
            <Text style={[styles.sectionText, styles.sundayText]}>Sunday: CLOSED</Text>
          </View>
        </View>


        {/* Add Menu Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>ADD MENU</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Bar */}
      <Navbar navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 90,
    resizeMode: 'contain',
    marginRight: 'auto', // Pushes the logo to the left
  },
  rating: {
    color: '#FFCC00',
    fontSize: 16,
    marginLeft: 'auto', // Pushes the rating to the right
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  locationCallContainer: {
    marginTop: 8,
  },
  locationCallItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8, // Reduced space between the items
  },
  address: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  callText: {
    color: '#1E90FF',
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  section: {
    marginVertical: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 8,
  },
  sundayText: {
    color: '#FF6347',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8, // Reduced spacing
  },
  addButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
