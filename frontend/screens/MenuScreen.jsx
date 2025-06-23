// MenuScreen.jsx
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
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import { menuItems } from "../data/menuData";
import { useCart } from "../context/CartContext";

const categories = [
  { id: 0, label: "Starters", icon: <Ionicons name="flame" size={20} color="#fff" /> },
  { id: 1, label: "Burgers", icon: <Ionicons name="fast-food" size={20} color="#fff" /> },
  { id: 2, label: "Sandwiches", icon: <Ionicons name="cafe" size={20} color="#fff" /> },
  { id: 3, label: "Steaks", icon: <Ionicons name="restaurant" size={20} color="#fff" /> },
  { id: 4, label: "Chinese", icon: <Ionicons name="nutrition" size={20} color="#fff" /> },
];

const MenuScreen = ({ navigation, route }) => {
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeCat, setActiveCat] = useState(0);
  const { id } = route.params;

  const toggleFavorite = (itemId) =>
    setFavorites(
      favorites.includes(itemId)
        ? favorites.filter((fav) => fav !== itemId)
        : [...favorites, itemId]
    );

  const handleBackPress = () => navigation.goBack();

  const openPopup = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  const closePopup = () => setSelectedItem(null);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Header onBackPress={handleBackPress} />
      </View>

      <View style={styles.top}>
        <Image
          source={require("../assets/images/kababjeeslogo.jpg")}
          style={styles.logo}
        />
      </View>

      {/* ---------- search bar ---------- */}
      <View style={styles.searchBarContainer}>
        <FontAwesome name="search" size={18} style={styles.searchIcon} />
        <TextInput
          placeholder="Add your favourite here"
          placeholderTextColor="#8F8F8F"
          style={styles.searchBar}
        />
      </View>

      {/* ---------- categories ---------- */}
      <Text style={styles.sectionTitle}>CATEGORIES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
      >
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.catPill,
              c.id === activeCat && styles.catPillActive,
            ]}
            onPress={() => setActiveCat(c.id)}
          >
            {c.icon}
            <Text style={styles.catLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

     {/* ---------- menu cards ---------- */}
<ScrollView showsVerticalScrollIndicator={false}>
  {menuItems.map((item) => (
    <View key={item.id} style={styles.menuCard}>
      
      {/* Image Section - Black Background */}
      <View style={styles.menuImageWrapper}>
        <Image source={item.image} style={styles.menuImage} />
      </View>

      {/* Text Section - White Background */}
      <View style={styles.menuDetails}>
        <Text style={styles.menuTitle}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <Text style={styles.menuServes}>{item.serves}</Text>

        <View style={styles.menuFooter}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="zap" size={14} color="#F2B705" />
            <Text style={styles.menuPrice}> {item.price}</Text>
          </View>

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

      {/* ---------- popup ---------- */}
      {selectedItem && (
        <Modal transparent animationType="fade">
          <View style={styles.popupOverlay}>
            <View style={styles.popupCard}>
 <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
  <Text style={styles.closeText}>✖</Text>

</TouchableOpacity>

  <View style={styles.popupContentRow}>
    <Image source={selectedItem.image} style={styles.popupImage} />

    <View style={styles.popupTextContent}>
      <Text style={styles.popupTitle}>{selectedItem.name}</Text>
      <Text style={styles.popupDescription}>{selectedItem.description}</Text>
      <Text style={styles.popupPrice}>⚡ Rs. {selectedItem.price}</Text>
      <Text style={styles.servesText}>Serves 2 people</Text>
    </View>
  </View>

  <View style={styles.bottomRow}>
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={() => setQuantity(Math.max(1, quantity - 1))}
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
          id,
        });
      }}
    >
      <Text style={styles.addToCartText}>
        ADD - Rs. {Number(selectedItem.price) * quantity}
      </Text>
    </TouchableOpacity>
  </View>
</View>

          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* ---------- screen ---------- */
  safe: { flex: 1, backgroundColor: "#000" },

  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  top: {
  marginTop: 120, // reduced from 90
  alignItems: "center",
  marginBottom: 16, // slightly increased for smoother spacing before categories
},

logo: {
  width: 180,
  height: 60, // ✅ Much better visibility
  resizeMode: "contain",
  marginBottom: -50, // ✅ Less extreme
   marginTop: -30,
},


searchBarContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  marginHorizontal: 16,
  paddingHorizontal: 12,
  marginTop: 20,
  elevation: 4,
},

searchIcon: {
  marginRight: 6,
  color: "#888", // light gray icon
},

searchBar: {
  flex: 1,
  color: "#000", // input text black
  paddingVertical: 8,
  fontSize: 12,
},

  /* ---------- categories ---------- */
  sectionTitle: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8, // slightly reduced for balance
  },
  categories: {
  paddingLeft: 16,
  marginBottom: 24, // ⬅️ increase this value
  paddingBottom: 36, // ✅ add this for more buffer
},

  catPill: {
    backgroundColor: "#1E1E1E",
    borderRadius: 18,
    paddingVertical: 10,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  catPillActive: {
    backgroundColor: "#DD1717",
    borderWidth: 2,
    borderColor: "#FF3B3B",
  },
  catLabel: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },

  /* ---------- menu cards ---------- */
 menuCard: {
  flexDirection: "row",
  borderRadius: 16,
  marginHorizontal: 16,
  marginBottom: 16,
  marginTop: 16, // ✅ add this to push cards down
  overflow: "hidden",
  backgroundColor: "#000",
},


menuImageWrapper: {
  width: 110,
  backgroundColor: "#000",
  justifyContent: "center",
  alignItems: "center",
},

menuImage: {
  width: 100,
  height: 100,
  borderRadius: 12,
},

menuDetails: {
  flex: 1,
  backgroundColor: "#fff",
  padding: 12,
  justifyContent: "space-between",
  borderTopRightRadius: 16,
  borderBottomRightRadius: 16,
},

menuTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#000",
},

menuDescription: {
  fontSize: 12,
  color: "#555",
  marginTop: 4,
},

menuServes: {
  fontSize: 10,
  color: "#FF7043",
  marginTop: 6,
},

menuFooter: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 8,
},

menuPrice: {
  fontSize: 13,
  fontWeight: "700",
  color: "#000",
},

addButton: {
  backgroundColor: "#DD1717",
  borderRadius: 6,
  paddingHorizontal: 16,
  paddingVertical: 8,
  minWidth: 70,
  alignItems: "center",
  marginLeft: 30, // ✅ shifts it slightly right without layout breaking
},

addText: {
  fontSize: 12,           // slightly larger text
  color: "#FFF",
  fontWeight: "700",
},
heartIcon: {
  fontSize: 20,           // optional: slightly bigger heart
  marginLeft: 10,         // moved a bit more right
},

 popupOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.7)",
},

popupOverlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.7)",
},

popupCard: {
  width: "92%",
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 16,
  position: "relative",
},

closeButton: {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 1,
},

closeText: {
  fontSize: 18,
   color: '#000', 
},

popupContentRow: {
  flexDirection: "row",
  marginBottom: 12,
},

popupImage: {
  width: 100,
  height: 100,
  borderRadius: 20,
  overflow: "hidden",
  alignSelf: 'flex-start',
},
popupContainer: {
  flexDirection: 'column', // or 'row' based on layout
  alignItems: 'flex-start', // 👈 makes children align left
},rowLayout: {
  flexDirection: 'row',
  alignItems: 'center',
}
,


popupTextContent: {
  flex: 1,
  paddingLeft: 12,
  justifyContent: "center",
},

popupTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
  marginBottom: 4,
},

popupDescription: {
  fontSize: 12,
  color: "#555",
  marginBottom: 6,
},

popupPrice: {
  fontSize: 13,
  fontWeight: "600",
  color: "#000",
  marginBottom: 2,
},

servesText: {
  fontSize: 10,
  color: "red",
},

bottomRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
},

quantityContainer: {
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 8,
  paddingHorizontal: 1,
  paddingVertical: 4,
},

quantityButton: {
  padding: 6,
  backgroundColor: "#ddd",
  borderRadius: 6,
  marginHorizontal: 4,
},

quantityText: {
  fontSize: 14,
  fontWeight: "bold",
  minWidth: 20,
  textAlign: "center",
},

addToCartButton: {
  backgroundColor: "#DD1717",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  marginLeft: -30,          // 👈 optional: remove margin
  width: '65%',          // 👈 full width
  alignItems: "center",
  justifyContent: "center",
},


addToCartText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 12,
},



});

export default MenuScreen;
