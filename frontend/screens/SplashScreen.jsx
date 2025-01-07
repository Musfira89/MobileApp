import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content"  />
      <View style={styles.curvedContainer}>
        <ImageBackground
          source={require('../assets/images/bgimg.png')}
          style={styles.backgroundImage}
        >
          {/* Lighter Black Overlay (Hover Effect) */}
          <View style={styles.overlay} />

          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              Best Way To Surprise Your Loved Ones
            </Text>
            <Text style={styles.subtitle}>Pic n drop | Dining | Surprises</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started </Text>
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
    backgroundColor: 'black', 
  },
  
  curvedContainer: {
    flex: 1,
    borderRadius: 15, // Keep this if needed
    overflow: 'hidden', // Ensures children respect borderRadius
    backgroundColor: 'black', // Matches the theme of the overlay
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
    zIndex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity for your needs
  },
  
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  logo: {
    width: 290, // Increased size
    height: 290,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 38, // Increased font size
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 45, // Ensures proper spacing between lines
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#A87729',
    borderRadius: 14,
    paddingVertical: 19,
    paddingHorizontal: 70,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
