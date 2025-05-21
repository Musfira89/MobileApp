import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import { getAuth } from "firebase/auth";
import axios from "axios";
import API_URL from "../config";

const BookingScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [fullName, setFullName] = useState("");
  const [reservationDay, setReservationDay] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    route.params?.paymentMethod || ""
  );
  const [totalAmount, setTotalAmount] = useState(
    route.params?.totalAmount || ""
  );

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [loading, setLoading] = useState(true);
  const [dateOptions, setDateOptions] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleReservation = async () => {
    try {
      const reservationData = {
        fullName,
        email,
        phoneNumber,
        reservationDay,
        reservationTime,
        guestCount,
        paymentMethod,
        totalAmount, 
        specialRequest,
      };

      const response = await axios.post(
        `${API_URL}/api/reservations/${id}/create`,
        reservationData
      );

      if (response.data.success) {
        navigation.navigate("ReservationConfirmScreen", {
          id: response.data.reservationId,
        });
      } else {
        alert("Failed to create reservation. Please try again.");
      }
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Error saving reservation. Please try again.");
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log("Reservation ID from route:", id);
    console.log("Selected payment method:", route.params?.paymentMethod);
    console.log("Total Amount:", route.params?.totalAmount);

    const fetchUserDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const firstName = user.displayName?.split(" ")[0] || "Guest";
        setFullName(firstName);
        setEmail(user.email || "");
        if (user.phoneNumber) {
          setPhoneNumber(user.phoneNumber);
        }
      }
    };

    const fetchReservationData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/reservations/${id}/get-reservation`
        );

        // Assuming your backend returns just the date, guests, and time
        const { date, guests, time } = response.data;

        setReservationDay(date || "");
        setReservationTime(time || "");
        setGuestCount(guests ? guests.toString() : "");

        setDateOptions([date] || []);
        setAvailableTimes([time] || []);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
    fetchReservationData();
  }, [id]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#b68d40" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View
        style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Header onBackPress={handleBackPress} />
      </View>

      {/* Form */}
      <ScrollView
        style={{ flex: 1, backgroundColor: "#000", padding: 20, marginTop: 50 }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          BOOKING ..
        </Text>

        {/* First Row */}
        <View style={styles.row}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput
              value={fullName}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PHONE NUMBER</Text>
            <TextInput
              value={phoneNumber}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              value={email}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>RESERVATION DATE</Text>
            <TextInput
              value={reservationDay}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>NO. OF GUESTS</Text>
            <TextInput
              value={guestCount}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>TIME</Text>
            <TextInput
              value={reservationTime}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
        </View>

        {/* Fourth Row */}
        <View style={styles.row}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>PAYMENT METHOD</Text>
            <TextInput
              value={paymentMethod}
              editable={false}
              style={styles.readonlyInput}
            />
          </View>
          <View style={styles.fieldContainer} />
        </View>

        {/* Special Request Section */}
        <View style={{ marginTop: 30 }}>
          <Text style={styles.label}>SPECIAL REQUEST</Text>
          <TextInput
            value={specialRequest}
            onChangeText={setSpecialRequest}
            placeholder="Write your special request here..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={5}
            style={styles.textArea}
          />
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={{ padding: 20, backgroundColor: "#000" }}>
        <TouchableOpacity
          onPress={handleReservation}
          style={{ backgroundColor: "#DD1717", padding: 15, borderRadius: 8 }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            CONFIRM RESERVATION
          </Text>
        </TouchableOpacity>
      </View>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    gap: 10, // 👈 Add this line for a small space between fields
  },

  fieldContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    color: "white",
    marginBottom: 8,
    fontWeight: "600",
  },
  readonlyInput: {
    backgroundColor: "#222",
    color: "white",
    padding: 10,
    borderRadius: 8,
  },
  textArea: {
    backgroundColor: "#222",
    color: "white",
    padding: 15,
    borderRadius: 8,
    textAlignVertical: "top",
    marginTop: 10,
  },
};

export default BookingScreen;
