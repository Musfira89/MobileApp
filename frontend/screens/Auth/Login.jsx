import React, { useState } from 'react';
import axios from 'axios';import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig"; // Adjust the path as needed
import API_URL from "../../config";

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      const user = userCredential.user;
  
      // Send user token to the backend
      const token = await user.getIdToken();
  
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        token,
      });
  
      if (response.data.message === "Login successful") {
        Alert.alert("Success", "Login successful");
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgimg.png')} // Replace with your background image path
        style={styles.backgroundImage}>
        <View style={styles.overlay} />

        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Continue to login.</Text>
        </View>

        <View style={styles.blackContainer}>
          <View style={styles.inputContainer}>
            <Icon name="mail" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={formData.email}
              onChangeText={(value) => setFormData({ ...formData, email: value })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              placeholderTextColor="#888"
              value={formData.password}
              onChangeText={(value) => setFormData({ ...formData, password: value })}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.createAccountText}>
            Don’t have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
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
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black transparent overlay
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