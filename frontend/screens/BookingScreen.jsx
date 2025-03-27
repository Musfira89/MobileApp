import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";

const BookingScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('Tomorrow');
    const [guestCount, setGuestCount] = useState(2);
    const [selectedTime, setSelectedTime] = useState('7:00 PM');
    const [phoneNumber, setPhoneNumber] = useState('+923302749706');
    const [email, setEmail] = useState('abc12@gmail.com');
    const [specialRequest, setSpecialRequest] = useState('');

    const dates = ['Tomorrow', 'Monday', 'Tuesday'];
    const guests = [1, 2, 3, 4, 5, 6];
    const times = ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

    const handleReservation = () => {
        navigation.navigate("ReservationConfirmScreen");
        console.log({ selectedDate, guestCount, selectedTime, phoneNumber, email, specialRequest });
    };
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
            }}>
                <Header onBackPress={handleBackPress} />
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20, marginTop: 50 }}>
                <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginBottom: 10 }}>BOOKING ..</Text>

                <Text style={{ color: 'white', marginBottom: 10 }}>DATE OF RESERVATION</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    {dates.map((date) => (
                        <TouchableOpacity
                            key={date}
                            onPress={() => setSelectedDate(date)}
                            style={{
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                backgroundColor: selectedDate === date ? '#b68d40' : '#333',
                            }}>
                            <Text style={{ color: 'white' }}>{date}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={{ color: 'white', marginBottom: 10 }}>NUMBER OF GUESTS</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    {guests.map((guest) => (
                        <TouchableOpacity
                            key={guest}
                            onPress={() => setGuestCount(guest)}
                            style={{
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                width: 40,
                                backgroundColor: guestCount === guest ? '#b68d40' : '#333',
                            }}>
                            <Text style={{ color: 'white' }}>{guest}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={{ color: 'white', marginBottom: 10 }}>AVAILABILITY TIMES</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    {times.map((time) => (
                        <TouchableOpacity
                            key={time}
                            onPress={() => setSelectedTime(time)}
                            style={{
                                padding: 10,
                                marginRight: 10,
                                borderRadius: 8,
                                backgroundColor: selectedTime === time ? '#b68d40' : '#333',
                            }}>
                            <Text style={{ color: 'white' }}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={{ color: 'white', marginBottom: 10 }}>PHONE NUMBER</Text>
                <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={{ backgroundColor: '#222', color: 'white', padding: 10, borderRadius: 8, marginBottom: 20 }}
                />

                <Text style={{ color: 'white', marginBottom: 10 }}>EMAIL</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={{ backgroundColor: '#222', color: 'white', padding: 10, borderRadius: 8, marginBottom: 20 }}
                />

                <Text style={{ color: 'white', marginBottom: 10 }}>SPECIAL REQUEST (OPTIONAL)</Text>
                <TextInput
                    value={specialRequest}
                    onChangeText={setSpecialRequest}
                    placeholder="Type"
                    placeholderTextColor="#666"
                    style={{ backgroundColor: '#222', color: 'white', padding: 10, borderRadius: 8, marginBottom: 20 }}
                />
            </ScrollView>
            <View style={{ padding: 20, backgroundColor: '#000' }}>
                <TouchableOpacity onPress={handleReservation} style={{ backgroundColor: '#DD1717', padding: 15, borderRadius: 8 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>CONFIRM RESERVATION</Text>
                </TouchableOpacity>
            </View>
            <Navbar navigation={navigation} />
        </View>
    );
};

export default BookingScreen;