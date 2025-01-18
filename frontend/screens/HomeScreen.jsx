import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import RestaurantCard from '../components/Restaurant/RestaurantCard';
import Header from '../components/Common/Header';
import Navbar from '../components/Common/Navbar';
import { getRestaurants } from '../components/Restaurant/RestaurantDetails';

const HomeScreen = ({ navigation }) => {
  const restaurants = getRestaurants(); // Fetch restaurants from the function

  return (
    <View style={styles.container}>
      {/* Entire screen wrapped in a ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Welcome back, Sarah" />
        <View style={styles.searchContainer}>
          {/* Search icon */}
          <Ionicons name="search" size={20} color="#A87729" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Find your favourite here ..."
            placeholderTextColor="#aaa"
          />
          {/* Filter icon */}
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#A87729" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Choose your Favourite Restaurant.</Text>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onPress={() =>
              navigation.navigate('RestaurantDetails', { restaurant })
            }
          />
        ))}
      </ScrollView>
      {/* Navbar at the bottom */}
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});

export default HomeScreen;
