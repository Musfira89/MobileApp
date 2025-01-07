// Navbar.jsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
// import ExploreScreen from './screens/ExploreScreen';
// import ReservationsScreen from './screens/ReservationsScreen';
// import TransportationScreen from './screens/TransportationScreen';
// import MoreScreen from './screens/MoreScreen';

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#B0B0B0',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000', // Black background
          borderTopWidth: 0, // Removes border
          height: 60, // Adjust height
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust label size
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transportation"
        component={TransportationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="directions-car" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
