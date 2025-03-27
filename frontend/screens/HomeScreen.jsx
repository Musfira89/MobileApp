import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import RestaurantCard from "../components/Restaurant/RestaurantCard";
import Navbar from "../components/Common/Navbar";
import axios from "axios";
import API_URL from "../config";
import WelcomeHeader from '../components/Common/WelcomeHeader'


const HomeScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants from the API
  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <View style={styles.container}>
      {/* Entire screen wrapped in a ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.header}>
        <WelcomeHeader />
        </View>


        <View style={styles.searchContainer}>
          {/* Search icon */}
          <Ionicons
            name="search"
            size={20}
            color="#A87729"
            style={styles.searchIcon}
          />
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
        <Text style={styles.sectionTitle}>
          Choose your Favourite Restaurant.
        </Text>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() =>
                
                navigation.navigate("RestaurantScreen", { id: restaurant.id })
                
              }
            />
          ))
        ) : (
          <Text>No restaurants found.</Text> // Show message if no restaurants found
        )}
      </ScrollView>
      {/* Navbar at the bottom */}
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginTop: 35,
  },
  header: {
    marginVertical: 10, // Reduced top and bottom spacing
    paddingHorizontal: 15, // Add some left and right spacing
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 35,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 35,
  },
});

export default HomeScreen;