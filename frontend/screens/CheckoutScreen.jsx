import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import SuccessAnimation from "../components/SuccessAnimation";
import axios from "axios";
import easypaisa from "../assets/fonts/easyPaisa.png";
import jazzcash from "../assets/fonts/Jazzcash.png";
import meezan from "../assets/fonts/meezan.png";
import API_URL from "../config";

const EnhancedCheckoutScreen = ({ route, navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [otherMethodDetails, setOtherMethodDetails] = useState("");

  const id = route?.params?.id;
  const totalAmount = route?.params?.totalAmount;

  const paymentMethods = [
    { id: "meezan", type: "Meezan Bank", icon: meezan },
    { id: "jazzcash", type: "JazzCash", icon: jazzcash },
    { id: "easypaisa", type: "Easy Paisa", icon: easypaisa },
  ];

  const handleBackPress = () => navigation.goBack();

  const toggleMethod = (methodId) => {
    setSelectedMethod((prev) => (prev === methodId ? null : methodId));
  };

  const handlePayment = async () => {
    if (!fullName || !email || !phoneNumber || !country) {
      alert("Please fill all personal details.");
      return;
    }

    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!otherMethodDetails) {
      const selectedLabel =
        paymentMethods.find((m) => m.id === selectedMethod)?.type || "selected method";
      alert(`Please provide ${selectedLabel} details.`);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/payment/process-payment`,
        {
          amount: totalAmount,
          fullName,
          email,
          phoneNumber,
          method: selectedMethod,
          details: otherMethodDetails,
        }
      );

      if (response.data.success) {
        setShowSuccess(true);

        const selectedMethodObj = paymentMethods.find(
          (m) => m.id === selectedMethod
        );
        const methodLabel = selectedMethodObj?.type || selectedMethod;

        setTimeout(() => {
          navigation.navigate("BookingScreen", {
            id,
            paymentMethod: methodLabel,
            totalAmount,
          });
        }, 2000);
      } else {
        alert(response.data.message || "Payment failed.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <SuccessAnimation />;
  return (
    <View style={styles.container}>
      <Header onBackPress={handleBackPress} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.checkoutHeader}>Total Menu Items + Tax</Text>
        <Text style={styles.checkoutAmount}>
          Rs. {totalAmount?.toLocaleString()}
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          autoCorrect={false}
          autoComplete="off"
          textContentType="none"
        />

        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.methodRow}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodButton,
                selectedMethod === method.id && styles.methodButtonSelected,
              ]}
              onPress={() => toggleMethod(method.id)}
            >
              <Image source={method.icon} style={styles.icon} />
              {/* <Text style={styles.methodLabel}>{method.type}</Text> */}
            </TouchableOpacity>
          ))}
        </View>

        {selectedMethod && (
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${
                paymentMethods.find((m) => m.id === selectedMethod)?.type
              } details`}
              value={otherMethodDetails}
              onChangeText={setOtherMethodDetails}
            />
          </View>
        )}

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
        />

        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingHorizontal: 24 },
  scrollContent: { paddingBottom: 80 },
  checkoutHeader: {
    fontSize: 20,
    color: "#666",
    marginTop: 80,
    textAlign: "center",
  },
  checkoutAmount: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 50,
  },
  label: {
    fontWeight: "600",
    color: "#555",
    marginTop: 18,
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    marginTop: 8,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginVertical: 25,
  },
  methodContainer: { marginBottom: 16 },
  paymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  paymentType: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  methodDetails: { marginTop: 15 },
  payButton: {
    backgroundColor: "#0056d2",
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  payButtonText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  methodButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },

  methodButtonSelected: {
    borderColor: "#0056d2",
    backgroundColor: "#e6f0ff",
  },

  icon: {
    width: 100,
    height: 90,
    resizeMode: "contain",
  },
});

export default EnhancedCheckoutScreen;
