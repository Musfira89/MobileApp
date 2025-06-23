import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import easypaisa from "../assets/fonts/easyPaisa.png";
import jazzcash from "../assets/fonts/Jazzcash.png";
import meezan from "../assets/fonts/meezan.png";
import Header from "../components/Common/Header";
import Navbar from "../components/Common/Navbar";
import SuccessAnimation from "../components/SuccessAnimation";
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

  {/* Personal Info Card */}
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>Your Details</Text>

    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />

    <Text style={styles.label}>Full Name</Text>
    <TextInput
      style={styles.input}
      value={fullName}
      onChangeText={setFullName}
    />

    <Text style={styles.label}>Phone Number</Text>
    <TextInput
      style={styles.input}
      keyboardType="phone-pad"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
    />

    <Text style={styles.label}>Country</Text>
    <TextInput
      style={styles.input}
      value={country}
      onChangeText={setCountry}
    />
  </View>

  {/* Payment Method Card */}
  <View style={styles.sectionCard}>
    <Text style={styles.sectionTitle}>Select Payment Method</Text>
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
      <Text style={styles.methodLabel}>{method.type}</Text>
    </TouchableOpacity>
  ))}
</View>


    {selectedMethod && (
      <TextInput
        style={[styles.input, { marginTop: 20 }]}
        placeholder={`Enter ${
          paymentMethods.find((m) => m.id === selectedMethod)?.type
        } details`}
        value={otherMethodDetails}
        onChangeText={setOtherMethodDetails}
      />
    )}
  </View>

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
  container: {
    flex: 1,
    backgroundColor: "#F2F4F6",
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120,
  },
   headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  checkoutAmount: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: 30,
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 18,
  },
  label: {
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 14,
    borderRadius: 14,
    fontSize: 12,
    backgroundColor: "#FDFDFD",
    marginBottom: 12,
    color: "#222",
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  methodButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 14,
    marginHorizontal: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  methodButtonSelected: {
    borderColor: "#2D9CDB",
    backgroundColor: "#EAF4FF",
  },
  icon: {
    width: 70,
    height: 60,
    resizeMode: "contain",
  },
  methodLabel: {
    fontSize: 12,
    color: "#333",
    marginTop: 6,
    fontWeight: "500",
  },
  payButton: {
    backgroundColor: "#2D9CDB",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});


export default EnhancedCheckoutScreen;
