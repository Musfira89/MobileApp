import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import API_URL from "../../config";

const Signup = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [isChecked, setChecked] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(""); // Clear any previous errors

    // Validate fields
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
      {/* Background Image */}
      <ImageBackground
        source={require("../../assets/images/bgimg.png")} // Background image
        style={styles.backgroundImage}
      >
        {/* Heading and Subheading - Move Outside Black Container */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Create an account.</Text>
          <Text style={styles.subHeading}>
            Create an account to access{"\n"}our incredible services.
          </Text>
        </View>

        {/* Black Container for Form */}
        <View style={styles.blackContainer}>
          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Icon name="person" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor="#888"
                value={formData.fullName} // Corrected
                onChangeText={(value) => handleChange("fullName", value)}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="mail" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={formData.email} // Corrected
                onChangeText={(value) => handleChange("email", value)}
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Image
                source={require("../../assets/images/flagIcon.jpg")} // Adjust path accordingly
                style={styles.flagIcon}
              />
              <Text style={styles.phoneCode}>+92</Text>
              <TextInput
                style={[styles.input, { marginLeft: 10 }]}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor="#888"
                value={formData.phoneNumber.replace("+92", "")} // Display only the user's input without the prefix
                onChangeText={(value) =>
                  handleChange("phoneNumber", `+92${value}`)
                } // Prepend "+92"
              />
              <Icon
                name="eye"
                size={20}
                color="#888"
                style={styles.iconRight}
              />
            </View>

            {/* Password */}
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
                value={formData.password} // Corrected
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

            {/* Checkbox */}
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

            {/* Create Account Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Login Prompt */}
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
        </View>
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

  blackContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    zIndex: 2, // Make sure this is above the overlay and background image
  },
  headerContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 300,
    zIndex: 3, // Ensure header is above the black container
    paddingTop: 30, // Space from top
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "left", // Left-align the heading
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: "#AAA",
    textAlign: "left", // Left-align the subheading
    marginBottom: 30,
  },
  formContainer: {
    // Container for form elements (inputs, checkbox, button)
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
    fontSize: 16,
  },
  phoneCode: {
    color: "#FFF",
    fontSize: 16,
    marginLeft: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#AAA",
  },
  checkboxLabel: {
    color: "#AAA",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  link: {
    color: "#A87729", // Matches the button color
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A87729", // Same color as SplashScreen button
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#AAA",
    textAlign: "center",
    fontSize: 14,
  },
  flagIcon: {
    width: 20, // Adjust width
    height: 14, // Adjust height
    marginRight: 8,
  },
});

export default Signup;
