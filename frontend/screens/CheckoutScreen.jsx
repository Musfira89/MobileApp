import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import SuccessAnimation from "../components/SuccessAnimation";

const EnhancedCheckoutScreen = ({ route, navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Pakistan");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const [otherMethodDetails, setOtherMethodDetails] = useState("");

  const id = route?.params?.id;
  const totalAmount = route?.params?.totalAmount;

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

    if (
      selectedMethod === "visa" &&
      (!cardNumber || !expiry || !cvv || !cardHolder)
    ) {
      alert("Please fill in all Visa/Mastercard details.");
      return;
    }

    if (
      (selectedMethod === "jazzcash" || selectedMethod === "bank") &&
      !otherMethodDetails
    ) {
      alert(
        `Please provide ${
          selectedMethod === "jazzcash" ? "JazzCash" : "Bank"
        } details.`
      );
      return;
    }

    setLoading(true);
    try {
      setShowSuccess(true);
      setTimeout(() => navigation.navigate("BookingScreen", { id }), 2000);
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) return <SuccessAnimation />;

  const paymentMethods = [
    { id: "visa", type: "Visa / Mastercard" },
    { id: "jazzcash", type: "JazzCash" },
    { id: "bank", type: "Bank Transfer" },
  ];

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

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.methodContainer}>
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => toggleMethod(method.id)}
            >
              <Text style={styles.paymentType}>{method.type}</Text>
              <Ionicons
                name={selectedMethod === method.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#0056d2"
              />
            </TouchableOpacity>

            {selectedMethod === method.id && (
              <View style={styles.methodDetails}>
                {method.id === "visa" ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="1234 1234 1234 1234"
                      placeholderTextColor="#aaa"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      keyboardType="numeric"
                    />
                    <View style={styles.inlineRow}>
                      <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder="MM/YY"
                        value={expiry}
                        onChangeText={setExpiry}
                        keyboardType="numeric"
                      />
                      <TextInput
                        style={[styles.input, styles.halfInput, { marginLeft: 12 }]}
                        placeholder="CVC"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        secureTextEntry
                      />
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Cardholder Name"
                      value={cardHolder}
                      onChangeText={setCardHolder}
                    />
                  </>
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder={Enter `${method.type} Account / Transaction Info`}
                    value={otherMethodDetails}
                    onChangeText={setOtherMethodDetails}
                  />
                )}
              </View>
            )}
          </View>
        ))}

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
  checkoutHeader: { fontSize: 20, color: "#666", marginTop: 80, textAlign: "center" },
  checkoutAmount: { fontSize: 48, fontWeight: "bold", color: "#000", textAlign: "center", marginBottom: 50 },
  label: { fontWeight: "600", color: "#555", marginTop: 18, fontSize: 18 },
  input: { borderWidth: 1, borderColor: "#e0e0e0", padding: 16, borderRadius: 12, fontSize: 18, backgroundColor: "#fff", marginTop: 8, color: "#333" },
  halfInput: { flex: 1 },
  inlineRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#555", marginVertical: 25 },
  methodContainer: { marginBottom: 16 },
  paymentMethod: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderWidth: 1, borderColor: "#e0e0e0", borderRadius: 12, backgroundColor: "#fff" },
  paymentType: { fontSize: 18, fontWeight: "500", color: "#333" },
  methodDetails: { marginTop: 15 },
  payButton: { backgroundColor: "#0056d2", paddingVertical: 18, borderRadius: 12, marginTop: 30, marginBottom: 40, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 5 },
  payButtonText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});

export default EnhancedCheckoutScreen;