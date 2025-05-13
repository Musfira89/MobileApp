import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();

  // Navigate to RestaurantScreen when clicked
  const navigateToRestaurantScreen = () => {
    navigation.navigate("RestaurantScreen", { id: restaurant.id });
  };

  return (
    <TouchableOpacity onPress={navigateToRestaurantScreen} style={styles.card}>
      <ImageBackground
        source={{ uri: restaurant.image }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        {/* Dark Overlay */}
        <View style={styles.overlay}>
          {/* Restaurant Logo */}
          <Image source={{ uri: restaurant.logo }} style={styles.logo} />

          {/* Restaurant Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>
              {Array.isArray(restaurant.cuisines)
                ? restaurant.cuisines.join(" | ")
                : restaurant.cuisines}
            </Text>
          </View>

          {/* Rating */}
          <Text style={styles.rating}>{restaurant.rating}/5 ⭐⭐⭐⭐⭐</Text>

          {/* Location & Reserve Button */}
          <View style={styles.infoRow}>
            <Text style={styles.location}>{restaurant.city}</Text>
            <TouchableOpacity
              style={styles.reserveButton}
              onPress={navigateToRestaurantScreen}
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
    borderRadius: 15,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: 260,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 35,
    borderRadius: 15,
  },
  logo: {
    width: 90,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 12,
  },
  rating: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  location: {
    fontSize: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  reserveButton: {
    backgroundColor: "#DD1717",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RestaurantCard;
