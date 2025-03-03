import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";

const CheckoutScreen = ({ navigation }) => {
    const [selectedMethod, setSelectedMethod] = useState('visa');

    const handleBackPress = () => {
        navigation.goBack();
    };

    const paymentMethods = [
        { id: 'visa', type: 'Visa', number: '**** **** **** 5967', expiry: '9/25', icon: 'card-outline' },
        { id: 'mastercard', type: 'Mastercard', number: '**** **** **** 5967', expiry: '9/25', icon: 'card-outline' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header onBackPress={handleBackPress} />
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Payment Methods</Text>
                <Text style={styles.subtitle}>All transactions are secure and encrypted.</Text>

                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.paymentMethod,
                            { borderColor: selectedMethod === method.id ? 'red' : 'gray' },
                        ]}
                        onPress={() => setSelectedMethod(method.id)}
                    >
                        <Ionicons
                            name={method.icon}
                            size={32}
                            color={selectedMethod === method.id ? 'red' : 'gray'}
                            style={styles.paymentIcon}
                        />
                        <View style={styles.paymentDetails}>
                            <Text style={styles.paymentNumber}>{method.number}</Text>
                            <Text style={styles.paymentExpiry}>Expires {method.expiry}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={styles.secondMethodTitle}>SECOND METHOD</Text>
                <TouchableOpacity
                    style={[
                        styles.paymentMethod,
                        { borderColor: selectedMethod === 'cod' ? 'red' : 'gray' },
                    ]}
                    onPress={() => setSelectedMethod('cod')}
                >
                    <View style={styles.codIconContainer}>
                        <Ionicons name="cash-outline" size={24} color="white" />
                    </View>
                    <View style={styles.paymentDetails}>
                        <Text style={styles.paymentNumber}>CASH ON DELIVERY</Text>
                        <Text style={styles.paymentExpiry}>Default Method</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addPaymentButton}>
                    <Text style={styles.addPaymentButtonText}>ADD PAYMENT METHOD</Text>
                    <Ionicons name="arrow-forward" size={24} color="white" style={styles.addPaymentButtonIcon} />
                </TouchableOpacity>
            </ScrollView>

            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    scrollView: {
        paddingTop: 60, // Adjust this value based on the height of your header
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 80, // Adjust this value to avoid overlapping with the navbar
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 16,
    },
    subtitle: {
        color: 'gray',
        marginTop: 8,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 24,
        borderWidth: 1,
        borderRadius: 16,
    },
    paymentIcon: {
        marginRight: 16,
    },
    paymentDetails: {
        flex: 1,
    },
    paymentNumber: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
    },
    paymentExpiry: {
        color: 'gray',
    },
    secondMethodTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 32,
    },
    codIconContainer: {
        backgroundColor: '#DD1717',
        padding: 8,
        borderRadius: 16,
        marginRight: 16,
    },
    addPaymentButton: {
        backgroundColor: '#DD1717',
        padding: 16,
        borderRadius: 16,
        marginTop: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPaymentButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addPaymentButtonIcon: {
        marginLeft: 8,
    },
});

export default CheckoutScreen;