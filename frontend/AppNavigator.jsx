import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/Auth/Login';
import SignupScreen from './screens/Auth/Signup';
import EmailVerificationScreen from './screens/Auth/EmailVerify';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={SignupScreen} />
        <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
