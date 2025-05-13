import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Animated,
} from "react-native";

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.curvedContainer}>
        <ImageBackground
          source={require("../assets/images/bgimg.png")}
          style={styles.backgroundImage}
        >
          {/* Lighter Black Overlay (Hover Effect) */}
          <View style={styles.overlay} />

          <View style={styles.contentContainer}>
            <Animated.View
              style={[
                styles.circleContainer,
                { transform: [{ scale: scaleAnim }] },
              ]}
            >
              <View style={styles.circle}>
                <Image
                  source={require("../assets/images/logo1.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
                <Text style={styles.brandText}>
                  MakeMy <Text style={styles.highlightText}>Day</Text>
                </Text>
              </View>
            </Animated.View>
            <Text style={styles.title}>
              Best Way To Surprise Your Loved Ones
            </Text>
            <Text style={styles.subtitle}>Pic n drop | Dining | Surprises</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  curvedContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 2,
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 4,
    borderColor: "#A87729",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    position: "absolute",
    bottom: 22,
    textAlign: "center",
  },
  highlightText: {
    color: "#A87729",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 45,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#A87729",
    borderRadius: 14,
    paddingVertical: 19,
    paddingHorizontal: 70,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SplashScreen;
