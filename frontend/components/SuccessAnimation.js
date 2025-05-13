// components/SuccessAnimation.js
import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SuccessAnimation = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/success.json")} // Add success animation JSON file to assets folder
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SuccessAnimation;
