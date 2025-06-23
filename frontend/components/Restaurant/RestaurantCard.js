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

const fallbackImage = "https://via.placeholder.com/400x250.png?text=Restaurant";

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();

  const navigateToRestaurantScreen = () => {
    navigation.navigate("RestaurantScreen", { id: restaurant?.id });
  };

  if (!restaurant || !restaurant.image || !restaurant.name) {
    return null; // Skip if critical data is missing
  }

  return (
    <TouchableOpacity onPress={navigateToRestaurantScreen} style={styles.card}>
      <ImageBackground
        source={{
          uri: restaurant.image.startsWith("http")
            ? restaurant.image
            : fallbackImage,
        }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay}>
          {/* Logo */}
          {restaurant.logo ? (
            <Image
              source={{ uri: restaurant.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          ) : null}

          {/* Name & Cuisine */}
          <View style={styles.detailsContainer}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {restaurant.name || "Unnamed Restaurant"}
            </Text>
            <Text
              style={styles.cuisine}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {Array.isArray(restaurant.cuisines)
                ? restaurant.cuisines.join(" | ")
                : restaurant.cuisines || "Various"}
            </Text>
          </View>

          {/* Rating */}
          <Text style={styles.rating}>
            {restaurant.rating || "N/A"}/5 ⭐⭐⭐⭐⭐
          </Text>

          {/* Bottom Row */}
          <View style={styles.infoRow}>
            <Text style={styles.location} numberOfLines={1}>
              {restaurant.city || "Unknown"}
            </Text>

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
    marginBottom: 25,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#000", // fallback color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  imageBackground: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 16,
    borderRadius: 10,
    width: "90%",
    alignItems: "flex-start",
  },

  logo: {
    width: 100,
    height: 35,
    marginBottom: 10,
  },

  detailsContainer: {
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },

  cuisine: {
    fontSize: 13,
    color: "#dddddd",
    marginBottom: 8,
  },

  rating: {
    fontSize: 13,
    color: "#ffb300",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  location: {
    fontSize: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
    maxWidth: "50%",
  },

  reserveButton: {
    backgroundColor: "#DD1717",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
  },

  reserveButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
});

export default RestaurantCard;
