import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import EmailVerify from './screens/Auth/EmailVerify';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen'
import MenuScreen from './screens/MenuScreen'
import MenuDetailScreen from './screens/MenuDetailScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ReservationScreen from './screens/ReservationScreen'; 
import ReservationConfirmScreen from './screens/ReservationConfirmScreen';
import BookingScreen from './screens/BookingScreen';
import TransportScreen from './screens/TransportScreen';
import LocationPickerScreen from './screens/LocationPickerScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EmailVerify" component={EmailVerify}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen  name="ReservationScreen" component={ReservationScreen} ></Stack.Screen>
           <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} />
        <Stack.Screen  name="ReservationConfirmScreen" component={ReservationConfirmScreen} ></Stack.Screen>
        <Stack.Screen  name="CheckoutScreen" component={CheckoutScreen} ></Stack.Screen>
        <Stack.Screen  name="BookingScreen" component={BookingScreen} ></Stack.Screen>
        <Stack.Screen name="TransportScreen" component={TransportScreen} />
        <Stack.Screen name="LocationPickerScreen" component={LocationPickerScreen} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
