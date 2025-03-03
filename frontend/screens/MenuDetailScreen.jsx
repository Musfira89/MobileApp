import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";

const MenuDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Header onBackPress={handleBackPress} />
                </View>


                <Text style={styles.title}>ADD TO MENU</Text>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryText}>Subtotal</Text>
                    <Text style={styles.summaryText}>Tax & Fees</Text>
                    <Text style={styles.totalText}>Total</Text>
                </View>

                <View style={styles.menuItem}>
                    <Image
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={styles.menuImage}
                    />

                    <View style={styles.details}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.price}>⚡ Rs. {item.price}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.checkoutButton} onPress={() => {
                    navigation.navigate('CheckoutScreen');

                }}>
                    <Text style={styles.checkoutText}>CHECKOUT ↗</Text>
                </TouchableOpacity>
            </ScrollView>
            <Navbar navigation={navigation} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    backButton: { margin: 20 },
    backText: { color: '#FFF', fontSize: 16 },
    title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginLeft: 20 ,marginTop: 20},
    summaryCard: { backgroundColor: '#FFF', margin: 20, padding: 20, borderRadius: 12 },
    summaryText: { fontSize: 16, color: '#333', marginBottom: 8 },
    totalText: { fontSize: 18, color: '#DD1717', fontWeight: 'bold' },
    menuItem: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, marginHorizontal: 20, marginBottom: 20 },
    image: { width: 100, height: 100, borderTopLeftRadius: 12, borderBottomLeftRadius: 12 },
    details: { flex: 1, padding: 10 },
    itemName: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    description: { fontSize: 14, color: '#555', marginVertical: 5 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#DD1717' },
    checkoutButton: { backgroundColor: '#DD1717', padding: 16, borderRadius: 12, margin: 20, alignItems: 'center' },
    checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default MenuDetailScreen;
