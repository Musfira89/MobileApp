import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EmailVerify from "./screens/Auth/EmailVerify";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import BookingScreen from "./screens/BookingScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuDetailScreen from "./screens/MenuDetailScreen";
import MenuScreen from "./screens/MenuScreen";
import ReservationConfirmScreen from "./screens/ReservationConfirmScreen";
import ReservationScreen from "./screens/ReservationScreen";
import Reservationsummary from "./screens/Reservationsummary";
import RestaurantScreen from "./screens/RestaurantScreen";
import SplashScreen from "./screens/SplashScreen";
import BookedRideScreen from './screens/Transport/BookedRideScreen';
import RideSelectionScreen from './screens/Transport/RideSelectionScreen';
import SplashScreen1 from './screens/Transport/SplashScreen1';
import UserProfile from "./screens/UserProfile";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EmailVerify" component={EmailVerify} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
        <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} />
        <Stack.Screen
          name="ReservationConfirmScreen"
          component={ReservationConfirmScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Reservationsummary"
          component={Reservationsummary}
        />
        <Stack.Screen name="UserProfile" component={UserProfile} />

        <Stack.Screen name="SplashScreen1" component={SplashScreen1} ></Stack.Screen>
        <Stack.Screen name="RideSelection" component={RideSelectionScreen} ></Stack.Screen>
        <Stack.Screen name="BookedRide" component={BookedRideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
