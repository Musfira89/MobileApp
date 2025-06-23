import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Navbar from "../components/Common/Navbar";
import API_URL from "../config";
import axios from "axios";
import Header from "../components/Common/Header";

export default function RestaurantScreen({ route, navigation }) {
  const { id } = route.params; // Get restaurant ID from navigation route params
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/restaurants/${id}`);
        console.log("Fetched Restaurant Data:", response.data); // Log the full response
        setRestaurant(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  if (loading || !restaurant) {
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
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header Bar */}
        <View style={styles.headerContainer}>
          <Header onBackPress={handleBackPress} />
        </View>

        {/* Image Section */}
        <Image source={{ uri: restaurant.image }} style={styles.image} />

        {/* Content Section */}
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.top}>
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
              <Text style={styles.sectionHeading}>
                NOTES FROM THE RESTAURANT
              </Text>
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

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate("ReservationScreen", { id }); // use route param directly
              console.log("Navigating with Restaurant ID:", id);
            }}
          >
            <Text style={styles.addButtonText}>RESERVE A DINNING</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navigation Bar */}
      <Navbar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 12,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  logo: {
    width: 90,
    height: 80,
    resizeMode: "contain",
    marginRight: "auto",
  },
  rating: {
    color: "#fff",
    fontSize: 13,
    marginLeft: "auto",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: -10,
    marginBottom: 10,
  },
  locationCallContainer: {
    marginTop: 4,
  },
  locationCallItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  address: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  callText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 8,
  },
  icon: {
    marginRight: 6,
    
  },
  section: {
    marginVertical: 8,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionHeading: {
    color: "#fff",
    fontSize: 13, // updated from 12 to 13
    fontWeight: "bold",
    marginLeft: 8,
  },
  sectionText: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    marginVertical: 6,
  },
  addButton: {
    backgroundColor: "#DD1717",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 80,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingLeft: 20, // ← move day text slightly right
  },
  dayText: {
    color: "#ccc",
    fontSize: 12,
    flex: 1,
  },
  hoursText: {
    color: "#ccc",
    fontSize: 12,
    textAlign: "right",
    flex: 1,
  },
  // Optional: Red line indicator (if needed visually)
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DD1717",
    marginRight: 6,
    marginTop: 6,
  },
});
