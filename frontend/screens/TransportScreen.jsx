import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

const suggestedLocations = [
  { id: '1', name: 'ILMA University, Karachi', latitude: 24.9136, longitude: 67.0920 },
  { id: '2', name: 'UIT University, Karachi', latitude: 24.9278, longitude: 67.0832 },
  { id: '3', name: 'Karachi University', latitude: 24.9444, longitude: 67.1121 },
  { id: '4', name: 'Expo Centre, Karachi', latitude: 24.8959, longitude: 67.0804 },
  { id: '5', name: 'Jinnah International Airport', latitude: 24.9065, longitude: 67.1608 },
];

const TransportBookingApp = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [acOption, setAcOption] = useState('WITH AC');
  const [pickupLocation, setPickupLocation] = useState('Select Pickup Location');
  const [destinationLocation, setDestinationLocation] = useState('Select Destination Location');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleConfirmRide = () => {
    setShowModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <MapView style={styles.map} region={currentLocation} showsUserLocation={true}>
        {suggestedLocations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
          >
            <MaterialIcons name="directions-car" size={32} color="red" />
          </Marker>
        ))}
      </MapView>

      <View style={styles.panel}>
        <View style={styles.titleContainer}>
          <Ionicons name="car" size={28} color="black" />
          <Text style={styles.title}>Where to?</Text>
        </View>

        {/* Pickup Location */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => navigation.navigate('LocationPickerScreen', { type: 'pickup' })}
        >
          <Ionicons name="location" size={24} color="gray" />
          <Text style={styles.inputText}>{pickupLocation}</Text>
        </TouchableOpacity>

        {/* Destination Location */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => navigation.navigate('LocationPickerScreen', { type: 'destination' })}
        >
          <Ionicons name="location" size={24} color="gray" />
          <Text style={styles.inputText}>{destinationLocation}</Text>
        </TouchableOpacity>

        {/* Date Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="calendar" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Enter Date (DD/MM/YYYY)"
            value={date}
            onChangeText={(text) => setDate(text)}
            keyboardType="numeric"
          />
        </View>

        {/* Time Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="time" size={24} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Enter Time (HH:MM AM/PM)"
            value={time}
            onChangeText={(text) => setTime(text)}
          />
        </View>

        {/* AC Options */}
        <View style={styles.acOptions}>
          <TouchableOpacity
            style={[styles.acOption, acOption === 'WITH AC' && styles.acSelected]}
            onPress={() => setAcOption('WITH AC')}
          >
            <Ionicons name="snow" size={20} color="white" />
            <Text style={styles.acText}>WITH AC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.acOption, acOption === 'WITHOUT AC' && styles.acSelected]}
            onPress={() => setAcOption('WITHOUT AC')}
          >
            <Ionicons name="flame" size={20} color="white" />
            <Text style={styles.acText}>WITHOUT AC</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Ride Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmRide}>
          <Text style={styles.confirmText}>CONFIRM RIDE</Text>
        </TouchableOpacity>

        {/* Confirmation Modal */}
        <Modal visible={showModal} transparent>
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>🚗 Ride Confirmed!</Text>
              <Text style={styles.modalText}>Option: {acOption}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeModal}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: 300 },
  panel: { padding: 20, backgroundColor: '#f4f4f4' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, marginLeft: 8, fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', borderRadius: 8, padding: 10 },
  inputText: { marginLeft: 8, color: 'gray', fontSize: 16 },
  input: { flex: 1 },
  acOptions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  acOption: { padding: 10, borderRadius: 5, backgroundColor: '#ddd', flexDirection: 'row', alignItems: 'center' },
  acSelected: { backgroundColor: 'red' },
  acText: { marginLeft: 5, color: 'white' },
  confirmButton: { marginTop: 20, padding: 15, backgroundColor: 'red', borderRadius: 8, alignItems: 'center' },
  confirmText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 20, color: 'black' },
  closeModal: { marginTop: 10, color: 'blue' },
});

export default TransportBookingApp;