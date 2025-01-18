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

const Login = ({ navigation }) => { // Add navigation prop here
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Image with Blur */}
      <ImageBackground
        source={require('../../assets/images/bgimg.png')} // Replace with your background image path
        style={styles.backgroundImage}>
        <View style={styles.overlay} />

        {/* Heading and Subheading */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Continue to login.</Text>
        </View>

        {/* Black Container */}
        <View style={styles.blackContainer}>
          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible} // Toggle visibility
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'} // Change icon based on visibility
                size={20}
                color="#888"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreen')}> {/* Navigate to HomeScreen */}
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Create Account Prompt */}
          <Text style={styles.createAccountText}>
            Don’t have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Signup')}> {/* Navigate to Signup Screen */}
              Create
            </Text>
          </Text>
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
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black transparent overlay
  },
  headerContainer: {
    position: 'absolute',
    top: '45%',
    marginLeft: '-15%',
    width: '100%',
    paddingHorizontal: 0,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  blackContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 50,
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
  forgotPassword: {
    color: '#A87729', // Matches the button color
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
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
  createAccountText: {
    color: '#AAA',
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: '#A87729',
    fontWeight: 'bold',
  },
});

export default Login;
