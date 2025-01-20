import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Navbar from '../components/Common/Navbar';
import API_URL from "../config"; 
import axios from "axios"; 

export default function RestaurantScreen({ route, navigation }) {
  const { id } = route.params; // Get restaurant ID from navigation route params
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant details from the backend
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/restaurants/${id}`);
        setRestaurant(response.data); // Set restaurant details in state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFCC00" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load restaurant details.</Text>
      </View>
    );
  }

  return (
<ScrollView style={styles.container}>
  {/* Image Section */}
  <Image source={{ uri: restaurant.image }} style={styles.image} />

  {/* Content Section */}
  <View style={styles.contentContainer}>
    {/* Header */}
    <View style={styles.header}>
      <Image source={{ uri: restaurant.logo }} style={styles.logo} />
      <Text style={styles.rating}>
        {restaurant.rating}/5 <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
      </Text>
    </View>

    {/* Restaurant Name */}
    <Text style={styles.title}>{restaurant.name}</Text>

    {/* Location and Call Section */}
    <View style={styles.locationCallContainer}>
      <View style={styles.locationCallItem}>
        <FontAwesome name="map-marker" size={16} color="#A87729" />
        <Text style={styles.address}>{restaurant.address}</Text>
      </View>

      <View style={styles.locationCallItem}>
        <FontAwesome name="phone" size={16} color="#A87729" />
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
        <FontAwesome name="file-text" size={15} color="#A87729" />
        <Text style={styles.sectionHeading}>NOTES FROM THE RESTAURANT</Text>
      </View>
      <Text style={styles.sectionText}>{restaurant.guidelines}</Text>
      <View style={styles.divider} />
    </View>

    {/* Hours Section */}
    <View style={styles.section}>
      <View style={styles.sectionItem}>
      <FontAwesome name="file-text" size={15} color="#A87729" />
        <Text style={styles.sectionHeading}>HOURS OF OPERATION</Text>
      </View>
      {restaurant.hours &&
        Object.entries(restaurant.hours).map(([day, hours]) => (
          <View key={day} style={styles.hoursRow}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.hoursText}>{hours}</Text>
          </View>
        ))}
    </View>

    {/* Add Menu Button */}
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>RESERVE A DINNING</Text>
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
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 90,
    resizeMode: 'contain',
    marginRight: 'auto',
  },
  rating: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 'auto',
  },
  title: {
    fontSize: 34, // Reduced font size
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5, // Reduced space
  },
  locationCallContainer: {
    marginTop: 8,
  },
  locationCallItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  address: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  callText: {
    color: '#fff',
    fontSize: 14,
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
  sectionHeading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4, 
    marginBottom:15,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 8,
  },
  addButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 100,
    alignItems: 'center',

    alignSelf: 'center', // Centered the button
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  dayText: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
  },
  hoursText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'right',
    flex: 1,
  },
});
