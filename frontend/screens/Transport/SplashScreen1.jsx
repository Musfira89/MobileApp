import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient"; // Change import
import React from "react";
import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Image.png")} // Ensure the image path is correct
        style={styles.backgroundImage}
      >
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]} style={styles.overlay}>

          <Text style={styles.title}>RIDE IN STYLE</Text>
          <Text style={styles.subtitle}>
            Enjoy the ride in a luxury car, with a professional driver.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RideSelection')}>
            <Text style={styles.buttonText}>Take a ride now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FF4D00",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" } // Web Fix
      : { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 }), // Mobile Fix
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SplashScreen;
