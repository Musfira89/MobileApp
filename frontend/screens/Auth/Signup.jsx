import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Make sure this is imported
import API_URL from "../../config";

const Signup = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState(""); // Added error state
  const [isChecked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(""); // Clear previous errors

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }

    if (!isChecked) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, formData);

      if (response.status === 200) {
        navigation.navigate("EmailVerify", { email: formData.email });
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bgimg.png")}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.headerContainer}>
              <Text style={styles.heading}>Create an account.</Text>
              <Text style={styles.subHeading}>
                Create an account to access{"\n"}our incredible services.
              </Text>
            </View>

            <Animated.View
              style={[
                styles.blackContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Icon
                    name="person"
                    size={20}
                    color="#888"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    placeholderTextColor="#888"
                    value={formData.fullName}
                    onChangeText={(value) => handleChange("fullName", value)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon
                    name="mail"
                    size={20}
                    color="#888"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(value) => handleChange("email", value)}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Image
                    source={require("../../assets/images/flagIcon.jpg")}
                    style={styles.flagIcon}
                  />
                  <Text style={styles.phoneCode}>+92</Text>
                  <TextInput
                    style={[styles.input, { marginLeft: 10 }]}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#888"
                    value={formData.phoneNumber.replace("+92", "")}
                    onChangeText={(value) =>
                      handleChange("phoneNumber", `+92${value}`)
                    }
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Icon
                    name="lock-closed"
                    size={20}
                    color="#888"
                    style={styles.icon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!isPasswordVisible}
                    placeholderTextColor="#888"
                    value={formData.password}
                    onChangeText={(value) => handleChange("password", value)}
                  />
                  <TouchableOpacity
                    style={styles.iconRight}
                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                  >
                    <Icon
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={20}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setChecked(!isChecked)}
                >
                  <Checkbox
                    status={isChecked ? "checked" : "unchecked"}
                    onPress={() => setChecked(!isChecked)}
                    color="#A87729"
                  />
                  <Text style={styles.checkboxLabel}>
                    I agree to the{" "}
                    <Text style={styles.link}>Terms & Conditions</Text> &{" "}
                    <Text style={styles.link}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>
                </Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  scrollView: {
    flexGrow: 1,
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 17, // Reduced from 20
    paddingTop: 50, // Reduced from 30
  },
  blackContainer: {
    width: "100%",
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 120,
    marginTop: 50,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "left",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    color: "#AAA",
    textAlign: "left",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 14,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    color: "#FFF",
    fontSize: 14,
  },
  phoneCode: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    color: "#AAA",
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
  link: {
    color: "#A87729",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A87729",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    color: "#AAA",
    textAlign: "center",
    fontSize: 14,
  },
  flagIcon: {
    width: 24, // Proper width
    height: 16, // Proper height
    resizeMode: "contain", // Maintain aspect ratio
    marginRight: 8, // Add some spacing
    alignSelf: "center", // Proper alignment
  },
});

export default Signup;
