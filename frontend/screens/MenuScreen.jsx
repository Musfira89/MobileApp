import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";


const MenuScreen = ({ navigation, route }) => {
    const [favorites, setFavorites] = useState([]);
    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((fav) => fav !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const menuItems = [
        {
            id: 1,
            name: 'Spicy Mexican Wings',
            description: 'Mouth-watering fried wings tossed in...',
            serves: 'Serves 2 people',
            price: 'Rs. 999',
            image: require('../assets/images/wings.png'),
        },
        {
            id: 2,
            name: 'Supreme Nachos',
            description: 'Delightful Mexican starter with imp...',
            serves: 'Serves 3 people',
            price: 'Rs. 1895',
            image: require('../assets/images/nachos.png'),
        },
        {
            id: 3,
            name: 'Cheesy Fries',
            description: 'Crispy fries drizzled with cheese and...',
            serves: 'Serves 2 people',
            price: 'Rs. 850',
            image: require('../assets/images/fries.png'),
        },
        {
            id: 4,
            name: 'Cheesy Fries',
            description: 'Crispy fries drizzled with cheese and...',
            serves: 'Serves 2 people',
            price: 'Rs. 850',
            image: require('../assets/images/fries.png'),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header onBackPress={handleBackPress} />
            </View>

            <View style={styles.top}>
                <Image
                    source={require('../assets/images/kababjeeslogo.jpg')} // Update the path to your logo image
                    style={styles.logo}
                />
            </View>

            <View style={styles.searchBarContainer}>
                <FontAwesome name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput placeholder="Add your favourite here" style={styles.searchBar} />
            </View>

            <Text style={styles.sectionTitle}>CATEGORIES</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                {['Starters', 'Burgers', 'Sandwiches', 'Steaks', 'Chinese'].map((item, index) => (
                    <TouchableOpacity key={index} style={[styles.category, index === 0 && styles.activeCategory]}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView showsVerticalScrollIndicator={false}>
                {menuItems.map((item) => (
                    <View key={item.id} style={styles.menuCard}>
                        <Image source={item.image} style={styles.menuImage} />
                        <View style={styles.menuDetails}>
                            <Text style={styles.menuTitle}>{item.name}</Text>
                            <Text style={styles.menuDescription}>{item.description}</Text>
                            <Text style={styles.menuServes}>{item.serves}</Text>
                            <View style={styles.menuFooter}>
                                <Text style={styles.menuPrice}>⚡ {item.price}</Text>
                                <TouchableOpacity style={styles.addButton}
                                    onPress={() => {
                                        navigation.navigate('MenuDetailScreen', { item });

                                    }}>

                                    <Text style={styles.addText}>ADD</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                                    <Text style={styles.heartIcon}>{favorites.includes(item.id) ? '❤️' : '🤍'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 45, // Reduced space above the logo
    },
    logo: {
        width: 140,
        height: 100,
        marginRight: "auto",
        resizeMode: "contain",
        marginLeft: 100,
        justifyContent: "center",
    },
    container: { flex: 1, backgroundColor: '#000' },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 0,
        paddingHorizontal: 0,
    },
    searchIcon: {
        marginRight: 10,
        backgroundColor: '#D9A850',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        color: '#fff',

    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
    },
    sectionTitle: { color: '#fff', margin: 20, fontSize: 18, fontWeight: 'bold' },
    categories: { flexDirection: 'row', marginLeft: 20, marginBottom: 40, marginTop: 10, height: 60 },
    category: { paddingVertical: 8, paddingHorizontal: 15, marginRight: 10, borderRadius: 20, backgroundColor: '#444', marginBottom: 1 },
    activeCategory: { backgroundColor: '#DD1717' },
    categoryText: { color: '#fff' },
    menuCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginBottom: 10 },
    menuImage: { width: 100, height: 140, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
    menuDetails: { flex: 1, padding: 10 },
    menuTitle: { fontSize: 16, fontWeight: 'bold' },
    menuDescription: { color: '#666' },
    menuServes: { marginVertical: 5, color: '#666' },
    menuFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    menuPrice: { fontWeight: 'bold', color: '#000' },
    addButton: { backgroundColor: '#DD1717', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10 },
    addText: { color: '#fff', fontWeight: 'bold' },
    bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, backgroundColor: '#111' },
    navText: { color: '#fff' },
    heartIcon: { fontSize: 22, marginLeft: 10 },
});

export default MenuScreen;