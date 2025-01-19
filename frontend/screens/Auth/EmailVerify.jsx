import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import API_URL from "../../config";

const EmailVerify = ({ route, navigation }) => {
  const { email } = route.params;
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerificationPending, setIsVerificationPending] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/auth/verify/${email}`
      );
      alert(response.data.message);

      if (response.data.message === 'Email verified successfully.') {
        setVerified(true);
      } else if (
        response.data.message === 'Verification email pending. Check your inbox.'
      ) {
        setIsVerificationPending(true);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/auth/check-verification/${email}`
        );
        if (response.data.verified) {
          setVerified(true);
          setIsVerificationPending(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error checking email verification status:', error.message);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [email]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../assets/images/bgimg.png')}
        style={styles.backgroundImage}>
        <BlurView intensity={50} style={styles.blurContainer}>
          <View style={styles.blackContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.emailIcon}>📧</Text>
            </View>
            <Text style={styles.heading}>Please verify your email</Text>
            <Text style={styles.description}>
              You are almost complete! We sent an email to: {' '}
              <Text style={styles.email}>{email}</Text>
            </Text>

            {!verified && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  loading || isVerificationPending ? styles.disabledButton : {},
                ]}
                onPress={handleVerify}
                disabled={loading || isVerificationPending}>
                <Text style={styles.buttonText}>
                  {loading ? 'Verifying...' : 'Verify Email'}
                </Text>
              </TouchableOpacity>
            )}

            {verified && (
              <TouchableOpacity
                style={[styles.actionButton, styles.verifiedButton]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Go to Login</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.subText}>Cannot find the email?</Text>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.buttonText}>Resend Email</Text>
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
  actionButton: {
    backgroundColor: '#A87729',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  verifiedButton: {
    backgroundColor: '#A87729',
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  resendButton: {
    backgroundColor: '#444',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default EmailVerify;