import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation(); // Hook for navigation

  // Function to navigate to the RestaurantScreen
  const navigateToRestaurantScreen = () => {
    navigation.navigate("RestaurantScreen", { restaurantId: restaurant.id }); // Pass restaurant ID to the screen
  };

  return (
    <TouchableOpacity onPress={navigateToRestaurantScreen} style={styles.card}>
      {/* Background Image */}
      <ImageBackground
        source={restaurant.image} // Dynamically pass image source
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        {/* Centered Black Box */}
        <View style={styles.overlay}>
          {/* Logo */}
          <Image source={restaurant.logo} style={styles.logo} />

          {/* Restaurant Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              {restaurant.rating}/5 <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
            </Text>
          </View>

          {/* Location and Reserve Button Row */}
          <View style={styles.infoRow}>
            <Text style={styles.locationBox}>{restaurant.location}</Text>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={navigateToRestaurantScreen} // Navigate on Reserve button click
            >
              <Text style={styles.reserveButtonText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: 240,
    justifyContent: "center", // Center content vertically
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black background
    padding: 20,
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginBottom: 5,
    alignSelf: "flex-start", // Align logo to the left
  },
  detailsContainer: {
    alignSelf: "flex-start", // Align details to the left
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left", // Align text to the left
  },
  cuisine: {
    marginTop:4,
    fontSize: 13,
    color: "#ccc",
    textAlign: "left", // Align text to the left
  },
  ratingContainer: {
    alignSelf: "flex-start", // Align rating to the left
    marginBottom: 10,
  },
  rating: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Space out location and button
    width: "100%",
    alignItems: "center",
  },
  locationBox: {
    fontSize: 12,
    color: "#fff", // Updated font color to white
    backgroundColor: "transparent", // Removed background color
    borderWidth: 1, // Added border
    borderColor: "#fff", // Set border color to white
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 2,
  },

  reserveButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 3,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default RestaurantCard;
