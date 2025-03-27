import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function ReservationScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedGuests, setSelectedGuests] = useState(6);
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [loading, setLoading] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState(null);
  const [earliestAvailable, setEarliestAvailable] = useState(null);

  const checkAvailability = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (selectedDate === 'Tomorrow' && selectedGuests === 6) {
        setAvailabilityStatus('unavailable');
      } else if (selectedDate === 'Tuesday' && selectedGuests === 6) {
        setAvailabilityStatus('earliest');
        setEarliestAvailable('TUE NOV 12 - 2:00 PM');
      } else {
        setAvailabilityStatus('available');
      }
    }, 2000);
  };

  const handleSelectionChange = (type, value) => {
    if (type === 'date') setSelectedDate(value);
    if (type === 'guests') setSelectedGuests(value);
    if (type === 'time') setSelectedTime(value);

    setAvailabilityStatus(null); // Reset status when user changes selection
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.leftAlignedTitle}>DATE OF RESERVATION</Text>
        <View style={styles.selectionRow}>
          {['Tomorrow', 'Monday', 'Tuesday'].map((date) => (
            <TouchableOpacity
              key={date}
              style={[styles.option, selectedDate === date && styles.selectedOption]}
              onPress={() => handleSelectionChange('date', date)}>
              <Text style={styles.optionText}>{date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.leftAlignedTitle}>NUMBER OF GUESTS</Text>
        <View style={styles.selectionRow}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.option, selectedGuests === num && styles.selectedOption]}
              onPress={() => handleSelectionChange('guests', num)}>
              <Text style={styles.optionText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.leftAlignedTitle}>AVAILABILITY TIMES</Text>
        <View style={styles.selectionRow}>
          {['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.option, selectedTime === time && styles.selectedOption]}
              onPress={() => handleSelectionChange('time', time)}>
              <Text style={styles.optionText}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8B5E3C" />
        ) : (
          <>
            {availabilityStatus === null && (
              <TouchableOpacity style={styles.button} onPress={checkAvailability}>
                <Text style={styles.buttonText}>Check Availability</Text>
              </TouchableOpacity>
            )}

            {availabilityStatus === 'unavailable' && (
              <View style={styles.card}>
                <Text style={styles.errorMessage}>
                  No availability for the selected date and guests.
                </Text>
                <Text style={styles.suggestion}>
                  Try changing the date or number of people.
                </Text>
              </View>
            )}

            {availabilityStatus === 'earliest' && (
              <Text style={styles.infoMessage}>
                The earliest possible reservation is {earliestAvailable}.
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: availabilityStatus === 'available' ? 'red' : 'grey' }
              ]}
              disabled={availabilityStatus !== 'available'}
              onPress={() => navigation.navigate('MenuScreen')}>
              <Text style={styles.addButtonText}>ADD MENU</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  innerContainer: { width: '90%', paddingVertical: 20 },
  leftAlignedTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginVertical: 10, textAlign: 'left' },
  selectionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginVertical: 10 },
  option: { padding: 12, borderRadius: 8, backgroundColor: '#3A3A3A', alignItems: 'center', flex: 1, marginHorizontal: 5 },
  selectedOption: { backgroundColor: '#8B5E3C' },
  optionText: { color: 'white', fontSize: 16, textAlign: 'center' },
  button: { backgroundColor: '#8B5E3C', padding: 15, borderRadius: 10, marginTop: 20, width: '100%', alignItems: 'center' },
  buttonText: { color: 'black', fontSize: 18, fontWeight: 'bold' },
  card: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginVertical: 10, width: '100%', alignItems: 'center' },
  errorMessage: { color: 'red', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  suggestion: { color: 'white', fontSize: 14, textAlign: 'center', marginTop: 5 },
  infoMessage: { color: 'white', fontSize: 16, textAlign: 'center', marginVertical: 10 },
  addButton: { padding: 15, borderRadius: 10, marginTop: 40, width: '70%', alignItems: 'center',alignSelf: 'center'},
    addButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

