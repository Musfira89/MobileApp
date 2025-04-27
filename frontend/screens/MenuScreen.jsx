import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import { menuItems } from "../data/menuData";
import { useCart } from "../context/CartContext";

const MenuScreen = ({ navigation, route }) => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = route.params;

  const toggleFavorite = (id) => {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((fav) => fav !== id)
        : [...favorites, id]
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const openPopup = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header onBackPress={handleBackPress} />
      </View>

      <View style={styles.top}>
        <Image
          source={require("../assets/images/kababjeeslogo.jpg")}
          style={styles.logo}
        />
      </View>

      <View style={styles.searchBarContainer}>
        <FontAwesome
          name="search"
          size={20}
          color="#000"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Add your favourite here"
          style={styles.searchBar}
        />
      </View>

      <Text style={styles.sectionTitle}>CATEGORIES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {["Starters", "Burgers", "Sandwiches", "Steaks", "Chinese"].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.category, index === 0 && styles.activeCategory]}
            >
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )
        )}
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
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => openPopup(item)}
                >
                  <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Text style={styles.heartIcon}>
                    {favorites.includes(item.id) ? "❤️" : "🤍"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Navbar navigation={navigation} />

      {selectedItem && (
        <Modal transparent animationType="fade">
          <View style={styles.popupOverlay}>
            <View style={styles.popupCard}>
              <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
                <Text style={styles.closeText}>❌</Text>
              </TouchableOpacity>

              <Image source={selectedItem.image} style={styles.popupImage} />
              <Text style={styles.popupTitle}>{selectedItem.name}</Text>
              <Text style={styles.popupDescription}>
                {selectedItem.description}
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {
                  addToCart(selectedItem, quantity);
                  closePopup();
                  navigation.navigate("MenuDetailScreen", {
                    item: selectedItem,
                    id: selectedItem.id,
                  });
                }}
              >
                <Text style={styles.addToCartText}>
                  ADD Rs {Number(selectedItem.price) * quantity}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  top: { flexDirection: "row", alignItems: "center", marginTop: 45 },
  logo: { width: 140, height: 100, marginLeft: 100, resizeMode: "contain" },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: "#D9A850",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
  },
  searchBar: { flex: 1, paddingVertical: 10 },
  sectionTitle: { color: "#fff", margin: 20, fontSize: 18, fontWeight: "bold" },
  categories: { paddingLeft: 20, marginBottom: 30, flexDirection: "row" },
  category: {
    backgroundColor: "#444",
    paddingVertical: 12, // Slightly increased padding for better spacing
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center", // Ensures text is centered
    minWidth: 110,
  },
  activeCategory: { backgroundColor: "#D9A850" },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15, // Slightly increased font size for readability
    textAlign: "center",
    flexWrap: "wrap", // Ensures text does not overflow
    maxWidth: 50, // Prevents text from expanding too much
  },
  menuCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
  },

  menuImage: {
    width: 100,
    height: 140,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  menuDetails: { flex: 1, padding: 10 },

  menuTitle: { fontSize: 16, fontWeight: "bold" },

  menuDescription: { color: "#666" },

  menuServes: {
    marginVertical: 5,
    color: "red",
    fontWeight: "bold",
  },

  menuFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuPrice: {
    fontWeight: "bold",
    color: "#000",
    marginLeft: "auto", // Pushes price to the right
    marginRight: 10,
  },

  addButton: {
    backgroundColor: "#DD1717",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Centers button inside card
  },

  addText: { color: "#fff", fontWeight: "bold" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#111",
  },

  navText: { color: "#fff" },

  heartIcon: { fontSize: 22, marginLeft: 8 },

  // Popup Styles
  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  popupCard: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  closeButton: { position: "absolute", top: 10, right: 10 },
  closeText: { fontSize: 22 },
  popupImage: { width: 200, height: 120, marginBottom: 10 },
  popupTitle: { fontSize: 18, fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  quantityButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: { fontSize: 18 },
  addToCartButton: {
    backgroundColor: "#DD1717",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  addToCartText: { color: "#fff", fontWeight: "bold" },
});

export default MenuScreen;
