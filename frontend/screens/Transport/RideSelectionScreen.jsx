import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import Header from "../../components/Common/Header";
import Navbar from "../../components/Common/Navbar";

const RideSelectionScreen = () => {
  const [selectedRide, setSelectedRide] = useState(null);
  const navigation = useNavigation();
  const scale = useSharedValue(1);

  const handleSelect = (type) => {
    setSelectedRide(type);
    scale.value = withSpring(0.9, { damping: 5 });

    setTimeout(() => {
      navigation.navigate("BookedRide", { rideType: type });
    }, 500);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")} // Add your image here
      style={styles.background}
    >
      {/* Dark overlay to enhance readability */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header onBackPress={handleBackPress} />
        </View>

        <Text style={styles.heading}>Choose Your Ride 🚗</Text>

        <Animated.View
          style={[styles.optionContainer, { transform: [{ scale }] }]}
        >
          <TouchableOpacity
            onPress={() => handleSelect("Basic")}
            style={[styles.option, selectedRide === "Basic" && styles.selectedBasic]}
          >
            <Text style={styles.basicText}>Basic</Text>
            <Text style={styles.subText}>Affordable & Comfortable</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.optionContainer, { transform: [{ scale }] }]}
        >
          <TouchableOpacity
            onPress={() => handleSelect("Premium")}
            style={[styles.option, selectedRide === "Premium" && styles.selectedPremium]}
          >
            <Text style={styles.premiumText}>Premium</Text>
            <Text style={styles.subText}>Luxury & Comfort</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Navbar navigation={navigation} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay with 70% opacity
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionContainer: {
    width: "100%",
    marginBottom: 15,
    marginTop: 20,
  },
  option: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "rgba(219, 215, 215, 0.8)", // Slightly transparent background
  },
  selectedBasic: {
    borderColor: "#FF4D00",
    borderWidth: 2,
  },
  selectedPremium: {
    borderColor: "#2196F3",
    borderWidth: 2,
  },
  basicText: {
    color: "#EB5B00",
    fontSize: 18,
    fontWeight: "bold",
  },
  premiumText: {
    color: "#2D336B",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "black",
    fontSize: 12,
    marginTop: 3,
  },
});

export default RideSelectionScreen;