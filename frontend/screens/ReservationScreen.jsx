import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Header from "../components/Common/Header";
import API_URL from "../config";
import axios from "axios";

export default function ReservationScreen({ route, navigation }) {
  const id = route?.params?.id;

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedGuests, setSelectedGuests] = useState(6);
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [loading, setLoading] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [earliestAvailable, setEarliestAvailable] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);

  useEffect(() => {
    if (!id) {
      console.warn("No restaurant ID was passed to ReservationScreen");
    }
    generateDateOptions();
  }, []);

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = nextDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const dateString = nextDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      options.push({ label: `${dayName}, ${dateString}`, dateObj: nextDate });
    }

    setDateOptions(options);
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 15; hour <= 22; hour++) {
      const date = new Date();
      date.setHours(hour, 0, 0);
      const formatted = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      times.push(formatted);
    }
    return times;
  };

  const checkAvailability = async () => {
    if (!id || !dateOptions[selectedDateIndex]) {
      console.warn("Invalid restaurant ID or selected date.");
      return;
    }

    setLoading(true);
    const selectedDate = dateOptions[selectedDateIndex].dateObj;
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const reservationKey = `${formattedDate}_${selectedTime
      .replace(/ /g, "_")
      .toUpperCase()}`;
    console.log("Reservation Key:", reservationKey);

    try {
      const response = await axios.post(
        `${API_URL}/api/restaurants/${id}/check-reservation`,
        {
          date: formattedDate,
          time: selectedTime.replace(/ /g, "_").toUpperCase(),
        }
      );

      const { available, earliestTime, noData } = response.data;

      if (noData) {
        setAvailabilityStatus("nodata");
      } else if (available === true) {
        setAvailabilityStatus("available");
        setEarliestAvailable(null);
      } else {
        setAvailabilityStatus("unavailable");
        setEarliestAvailable(earliestTime || null);
      }
    } catch (err) {
      console.error("Error checking availability:", err);
      setAvailabilityStatus("unavailable");
    } finally {
      setLoading(false);
    }
  };

  // Save the reservation data to Firestore
  const saveReservationData = async () => {
    const reservationData = {
      date: dateOptions[selectedDateIndex].dateObj.toISOString().split("T")[0],
      time: selectedTime,
      guests: selectedGuests,
      restaurantId: id,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/reservations/${id}/save-reservation`,
        reservationData
      );
      console.log("Reservation saved:", response.data);
      navigation.navigate("MenuScreen", { id }); // Navigate to the Menu screen
    } catch (err) {
      console.error("Error saving reservation:", err);
    }
  };

  const handleSelectionChange = (type, value) => {
    if (type === "date") setSelectedDateIndex(value);
    if (type === "guests") setSelectedGuests(value);
    if (type === "time") setSelectedTime(value);
    setAvailabilityStatus(null);
  };

  const handleBackPress = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header onBackPress={handleBackPress} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.leftAlignedTitle}>DATE OF RESERVATION</Text>
        <View style={styles.selectionRow}>
          {dateOptions.map((d, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedDateIndex === index && styles.selectedOption,
              ]}
              onPress={() => handleSelectionChange("date", index)}
            >
              <Text style={styles.optionText}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.leftAlignedTitle}>NUMBER OF GUESTS</Text>
        <View style={styles.selectionRow}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.option,
                selectedGuests === num && styles.selectedOption,
              ]}
              onPress={() => handleSelectionChange("guests", num)}
            >
              <Text style={styles.optionText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.leftAlignedTitle}>AVAILABILITY TIMES</Text>
        <View style={styles.selectionRow}>
          {generateTimeSlots().map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.option,
                selectedTime === time && styles.selectedOption,
              ]}
              onPress={() => handleSelectionChange("time", time)}
            >
              <Text style={styles.optionText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8B5E3C" />
        ) : (
          <>
            {availabilityStatus === null && (
              <TouchableOpacity
                style={styles.button}
                onPress={checkAvailability}
              >
                <Text style={styles.buttonText}>Check Availability</Text>
              </TouchableOpacity>
            )}
            {availabilityStatus === "nodata" && (
              <View style={styles.card}>
                <Text style={styles.noAvailability}>
                  No availability found on this date.
                </Text>
              </View>
            )}

            {availabilityStatus === "unavailable" && (
              <View style={styles.card}>
                <Text style={styles.infoMessage}>
                  This time is unavailable. Please choose another time.
                </Text>

                {earliestAvailable ? (
                  <Text style={styles.earliestInfo}>
                    Earliest available time on this day:{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      {earliestAvailable}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.noAvailability}>No availability.</Text>
                )}
              </View>
            )}

            {availabilityStatus === "available" && (
              <>
                <View style={styles.card}>
                  <Text style={styles.infoMessage}>
                    This time is available!
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.addMenuButton}
                  onPress={() => {
                    saveReservationData();
                    navigation.navigate("MenuScreen", { id });
                    console.log(
                      "Navigating to MenuScreen with Restaurant ID:",
                      id
                    );
                  }}
                >
                  <Text style={styles.addMenuButtonText}>ADD TO MENU</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", alignItems: "center" },
  innerContainer: { width: "90%", paddingVertical: 20 },
  leftAlignedTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
  },
  selectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#3A3A3A",
    alignItems: "center",
    marginBottom: 10,
    minWidth: "30%",
  },
  selectedOption: { backgroundColor: "#8B5E3C" },
  optionText: { color: "white", fontSize: 14, textAlign: "center" },
  button: {
    backgroundColor: "#8B5E3C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "black", fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  suggestion: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  infoMessage: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  addMenuButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
  },

  addMenuButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  earliestInfo: {
    marginTop: 8,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },

  noAvailability: {
    marginTop: 8,
    color: "gray",
    textAlign: "center",
  },

  addButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
