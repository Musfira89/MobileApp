import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation hook

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();  // Use the hook to get the navigation prop

  const navigateToRestaurantScreen = () => {
    navigation.navigate('RestaurantScreen', { restaurantId: restaurant.id });  // Pass restaurant info
  };

  return (
    <TouchableOpacity 
      onPress={navigateToRestaurantScreen} 
      style={styles.card}
    >
      <ImageBackground
        source={require('../../assets/images/KababJees.png')}  // Set the image as background
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        </View>
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
        <Text style={styles.location}>📍 {restaurant.location}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToRestaurantScreen}  // Navigate to RestaurantScreen
        >
          <Text style={styles.buttonText}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#000',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',  // Align text at the bottom
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent dark overlay
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cuisine: {
    fontSize: 14,
    color: '#ccc',
  },
  info: {
    padding: 15,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
  },
  location: {
    color: '#888',
    fontSize: 14,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FF0000',  // Red button for reservation
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RestaurantCard;
