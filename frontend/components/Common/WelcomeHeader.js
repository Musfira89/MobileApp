import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";

const WelcomeHeader = () => {
  const [fullName, setFullName] = useState("Guest");

  useEffect(() => {
    const fetchUserFullName = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // Extract the first name from the displayName
        const firstName = user.displayName?.split(" ")[0] || "Guest";
        setFullName(firstName);
      }
    };

    fetchUserFullName();
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Welcome back, {fullName}</Text>
      <Text style={styles.subtitle}>Start Planning a Surprise</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 10, // Reduced top and bottom spacing
    paddingHorizontal: 15, // Add some left and right spacing
  },
  title: {
    fontSize: 24, // Font size for the title
    fontWeight: "bold",
    color: "#000", // Black text color
    textAlign: "left", // Left-aligned text
  },
  subtitle: {
    fontSize: 16, // Font size for the subtitle
    color: "#000", // Black text color
    marginTop: 5,
    textAlign: "left", // Left-aligned text
  },
});

export default WelcomeHeader;
