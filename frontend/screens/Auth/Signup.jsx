import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';

const Signup = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false); // Password visibility toggle

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/images/bgimg.png')} // Background image
        style={styles.backgroundImage}>
        
        {/* Overlay for blur */}
        <View style={styles.overlay} />

        {/* Heading and Subheading - Move Outside Black Container */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Create an account.</Text>
          <Text style={styles.subHeading}>
            Create an account to access{'\n'}our incredible services.
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
                value={fullName}
                onChangeText={setFullName}
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
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputContainer}>
              <Text style={styles.phoneCode}>+92</Text>
              <TextInput
                style={[styles.input, { marginLeft: 40 }]}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor="#888"
                value={phone}
                onChangeText={setPhone}
              />
              <Icon name="eye" size={20} color="#888" style={styles.iconRight} />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.iconRight}
                onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Icon
                  name={isPasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setChecked(!isChecked)}>
              <Checkbox
                status={isChecked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!isChecked)}
                color="#A87729"
              />
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.link}>Terms & Conditions</Text> &{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => navigation.navigate('EmailVerify')} // Navigate to EmailVerify screen
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Login Prompt */}
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Login')}>
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
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Added overlay with transparency for blur effect
    zIndex: 1,
  },
  blackContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    zIndex: 2, // Make sure this is above the overlay and background image
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 300,
    zIndex: 3, // Ensure header is above the black container
    paddingTop: 30, // Space from top
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left', // Left-align the heading
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'left', // Left-align the subheading
    marginBottom: 30,
  },
  formContainer: {
    // Container for form elements (inputs, checkbox, button)
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
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
    color: '#FFF',
    fontSize: 16,
  },
  phoneCode: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#AAA',
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  link: {
    color: '#A87729', // Matches the button color
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#A87729', // Same color as SplashScreen button
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Signup;
