import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { BlurView } from 'expo-blur';

const EmailVerify = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/bgimg.png')} // Replace with your background image
        style={styles.backgroundImage}
      >
        {/* Blur effect overlay */}
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.blackContainer}>
            <View style={styles.iconContainer}>
              {/* Placeholder for Email Icon */}
              <Text style={styles.emailIcon}>📧</Text>
            </View>
            <Text style={styles.heading}>Please verify your email</Text>
            <Text style={styles.description}>
              You are almost complete! We sent an email to{' '}
              <Text style={styles.email}>abc@gmail.com</Text>
            </Text>
            <Text style={styles.subText}>Cannot find the email?</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Navigate to Home screen after resending the email
                console.log('Resend email clicked');
                navigation.navigate('HomeScreen'); // Replace 'Home' with the name of your Home screen route
              }}
            >
              <Text style={styles.buttonText}>Resend email</Text>
            </TouchableOpacity>
            <Text style={styles.contactText}>
              Any Questions? Email us at{' '}
              <Text style={styles.email}>Feedback@gmail.com</Text>
            </Text>
          </View>
        </BlurView>
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
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  emailIcon: {
    fontSize: 30,
    color: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  email: {
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#A87729',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default EmailVerify;
