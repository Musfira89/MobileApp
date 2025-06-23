import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import Header from "../components/Common/Header";
import API_URL from "../config";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function ReservationScreen({ route, navigation }) {
  const id = route?.params?.id;

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedGuests, setSelectedGuests] = useState(6);
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [loading, setLoading] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [earliestAvailable, setEarliestAvailable] = useState(null);
  const [dateOptions, setDateOptions] = useState([]);

  const [expandDates, setExpandDates] = useState(false);
  const [expandGuests, setExpandGuests] = useState(false);
  const [expandTimes, setExpandTimes] = useState(false);

  useEffect(() => {
    if (!id) console.warn("No restaurant ID was passed to ReservationScreen");
    generateDateOptions();
  }, []);

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const dayName = nextDate.toLocaleDateString("en-US", { weekday: "short" });
      const dateString = nextDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      options.push({ label: `${dayName}, ${dateString}`, dateObj: nextDate });
    }
    setDateOptions(options);
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 15; hour <= 22; hour++) {
      const date = new Date();
      date.setHours(hour, 0, 0);
      times.push(date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }));
    }
    return times;
  };

  const checkAvailability = async () => {
    if (!id || !dateOptions[selectedDateIndex]) return;
    setLoading(true);
    const selectedDate = dateOptions[selectedDateIndex].dateObj;
    const formattedDate = selectedDate.toISOString().split("T")[0];

    try {
      const response = await axios.post(`${API_URL}/api/restaurants/${id}/check-reservation`, {
        date: formattedDate,
        time: selectedTime.replace(/ /g, "_").toUpperCase(),
      });
      const { available, earliestTime, noData } = response.data;

      if (noData) setAvailabilityStatus("nodata");
      else if (available) {
        setAvailabilityStatus("available");
        setEarliestAvailable(null);
      } else {
        setAvailabilityStatus("unavailable");
        setEarliestAvailable(earliestTime || null);
      }
    } catch (err) {
      console.error(err);
      setAvailabilityStatus("unavailable");
    } finally {
      setLoading(false);
    }
  };

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
      navigation.navigate("MenuScreen", { id });
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

  const SelectionSection = ({ title, options, selected, onSelect, expanded, toggleExpand }) => {
    const displayOptions = expanded ? options : options.slice(0, 3);
    return (
      <View style={styles.scrollSection}>
        <Text style={styles.leftAlignedTitle}>{title}</Text>
        <View style={styles.optionGrid}>
          {displayOptions.map((item, index) => {
            const value = typeof item === "object" ? (item.value ?? index) : item;
            const isSelected = selected === value;
            return (
              <TouchableOpacity
                key={value}
                style={[styles.optionCard, isSelected && styles.selectedOption]}
                onPress={() => onSelect(value)}
              >
                <Text style={styles.optionText}>{item.label || item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {options.length > 3 && (
          <TouchableOpacity style={styles.showAllButton} onPress={toggleExpand}>
            <Feather
              name={expanded ? "chevron-up" : "chevron-down"}
              size={18}
              color="#A87729"
            />
            <Text style={styles.showAllText}>
              {expanded ? "Show Less" : "Show All"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Reservation" onBackPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.innerContainer}>
        <SelectionSection
          title="DATE OF RESERVATION"
          options={dateOptions}
          selected={selectedDateIndex}
          onSelect={(i) => handleSelectionChange("date", i)}
          expanded={expandDates}
          toggleExpand={() => setExpandDates(!expandDates)}
        />
        <SelectionSection
          title="NUMBER OF GUESTS"
          options={[1, 2, 3, 4, 5, 6]}
          selected={selectedGuests}
          onSelect={(i) => handleSelectionChange("guests", i)}
          expanded={expandGuests}
          toggleExpand={() => setExpandGuests(!expandGuests)}
        />
        <SelectionSection
          title="AVAILABILITY TIMES"
          options={generateTimeSlots()}
          selected={selectedTime}
          onSelect={(t) => handleSelectionChange("time", t)}
          expanded={expandTimes}
          toggleExpand={() => setExpandTimes(!expandTimes)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#8B5E3C" />
        ) : (
          <>
            {availabilityStatus === null && (
              <TouchableOpacity style={styles.button} onPress={checkAvailability}>
                <Text style={styles.buttonText}>Check Availability</Text>
              </TouchableOpacity>
            )}
            {availabilityStatus === "nodata" && (
              <View style={styles.card}>
                <Text style={styles.noAvailability}>No availability found on this date.</Text>
              </View>
            )}
            {availabilityStatus === "unavailable" && (
              <View style={styles.card}>
                <Text style={styles.infoMessage}>This time is unavailable. Please choose another time.</Text>
                {earliestAvailable ? (
                  <Text style={styles.earliestInfo}>
                    Earliest available: <Text style={{ fontWeight: "bold" }}>{earliestAvailable}</Text>
                  </Text>
                ) : (
                  <Text style={styles.noAvailability}>No availability.</Text>
                )}
              </View>
            )}
            {availabilityStatus === "available" && (
              <TouchableOpacity
                style={styles.addMenuButton}
                onPress={saveReservationData}
              >
                <Text style={styles.addMenuButtonText}>ADD TO MENU</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    marginTop: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  leftAlignedTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollSection: {
    marginBottom: 20,
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionCard: {
    width: "30%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A3A",
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: "#A87729",
  },
  showAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  showAllText: {
    color: "#A87729",
    fontSize: 12,
    marginLeft: 6,
  },
  button: {
    backgroundColor: "#A87729",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "black", fontSize: 14, fontWeight: "bold" },
  card: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  infoMessage: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginVertical: 10,
  },
  earliestInfo: {
    marginTop: 8,
    color: "#aaa",
    fontStyle: "italic",
    textAlign: "center",
  },
  noAvailability: {
    marginTop: 8,
    color: "gray",
    textAlign: "center",
  },
  addMenuButton: {
  marginTop: 2,
  marginBottom: 30, // 👈 Add this line
  paddingVertical: 12,
  paddingHorizontal: 24,
  backgroundColor: "#E63946",
  borderRadius: 10,
  alignItems: "center",
},

  addMenuButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
