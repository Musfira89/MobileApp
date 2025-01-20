

// Function to retrieve all restaurants
export const getRestaurants = () => restaurants;

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params; // Get restaurant data from navigation params

  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <Text style={styles.location}>📍 {restaurant.location}</Text>
        <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#ff9900',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RestaurantDetails;