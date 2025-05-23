import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { getAuth } from "firebase/auth";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Common/Header";
import Navbar from "../../components/Common/Navbar";
import API_URL from "../../config";


const BookedRideScreen = ({ navigation, route }) => {
  const auth = getAuth();
  const [selectedAC, setSelectedAC] = useState(false);
  const [region, setRegion] = useState({
    latitude: 24.8607, // Default to Karachi
    longitude: 67.0011,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const rideType = route?.params?.rideType || "Basic"; // Default to "Basic" if no ride type is passed

  // Request location permissions and get user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Fetch location suggestions from OpenStreetMap Nominatim API
  const fetchLocationSuggestions = debounce(async (query) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your-email@example.com)", // Replace with your app name and email
          },
        }
      );
      const data = await response.json();
      setSuggestions(
        data.map((item) => ({
          name: item.display_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  }, 500);

  const handleSearchQueryChange = (text) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      fetchLocationSuggestions(text);
    } else {
      setSuggestions([]); // Clear suggestions if the query is empty
    }
  };

  const handleLocationSelect = (locationName, type) => {
    if (type === "pickup") {
      setPickupLocation(locationName);

    } else if (type === "destination") {
      setDestinationLocation(locationName);

    }
    setShowSearchModal(null);
  };

  const handleConfirmRide = async () => {
    const rideData = {
      rideType,
      pickupLocation,
      destinationLocation,
      selectedDate: selectedDate.toISOString(),
      selectedTime: selectedTime.toISOString(),
      selectedAC,
    };

    setIsLoading(true);
    try {
      // Get the Firebase Authentication token
      const currentUser = auth.currentUser; // Use the initialized auth object
      if (!currentUser) {
        Alert.alert("Error", "You must be logged in to confirm a ride.");
        setIsLoading(false);
        return;
      }
      const token = await currentUser.getIdToken();

      // Send the ride data to the backend
      const response = await axios.post(`${API_URL}/api/rides`, rideData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      Alert.alert("Ride Confirmed", "You will receive ride confirmation within 24 hours.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Header onBackPress={() => navigation.goBack()} />
        </View>

        {/* Map View */}
        {/* <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
        </MapView> */}

        {/* Ride Details */}
        <View style={styles.bottomContainer}>
          <View style={styles.rideTypeContainer}>
            <Text style={styles.rideTypeLabel}>Selected Ride Type:</Text>
            <Text style={styles.rideTypeValue}>{rideType}</Text>
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome5 name="map-marker-alt" size={16} color="blue" />
            <Text style={styles.locationText}>Pickup Location</Text>
            <TouchableOpacity onPress={() => setShowSearchModal("pickup")}>
              <Text style={styles.mapButton}>{pickupLocation || "Search"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <FontAwesome5 name="map-marker-alt" size={16} color="red" />
            <Text style={styles.locationText}>Destination Location</Text>
            <TouchableOpacity onPress={() => setShowSearchModal("destination")}>
              <Text style={styles.mapButton}>
                {destinationLocation || "Search"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Date and Time */}
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
              <Ionicons name="calendar" size={18} color="red" />
              <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateBox} onPress={() => setShowTimePicker(true)}>
              <Ionicons name="time" size={18} color="red" />
              <Text style={styles.dateText}>{selectedTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          </View>

          {/* AC Selection */}
          <View style={styles.acContainer}>
            <TouchableOpacity
              style={[styles.acButton, selectedAC && styles.selectedButton]}
              onPress={() => setSelectedAC(true)}
            >
              <FontAwesome5 name="car" size={18} color={selectedAC ? "white" : "black"} />
              <Text style={[styles.acText, selectedAC && styles.selectedText]}>WITH AC</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.acButton, !selectedAC && styles.selectedButton]}
              onPress={() => setSelectedAC(false)}
            >
              <FontAwesome5 name="car" size={18} color={!selectedAC ? "white" : "black"} />
              <Text style={[styles.acText, !selectedAC && styles.selectedText]}>WITHOUT AC</Text>
            </TouchableOpacity>
          </View>


          {/* Confirm Ride Button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>CONFIRM RIDE</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />


      {/* Location Search Modal */}
      <Modal visible={!!showSearchModal} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${showSearchModal === "pickup" ? "Pickup" : "Destination"} Location`}
            value={searchQuery}
            onChangeText={handleSearchQueryChange}
          />
          <ScrollView>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionItem, index % 2 === 0 ? { backgroundColor: "#f0f0f0" } : {}]}
                onPress={() => handleLocationSelect(suggestion.name, showSearchModal)}
              >
                <Text style={styles.suggestionText}>{suggestion.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setShowSearchModal(null)}
          >
            <Text style={styles.closeModalText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  map: {
    height: 300,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  rideTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rideTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  rideTypeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  mapButton: {
    color: "red",
    fontWeight: "bold",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 5,
  },
  dateText: {
    marginLeft: 5,
    fontSize: 16,
  },
  acContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  acButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
  acText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  confirmText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  closeModalButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeModalText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookedRideScreen;