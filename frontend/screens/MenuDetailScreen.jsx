import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Navbar from "../components/Common/Navbar";
import Header from "../components/Common/Header";
import { useCart } from "../context/CartContext";

const MenuDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { cartItems, getTotal, updateQuantity, removeFromCart } = useCart();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCheckout = () => {
    const totalAmount = getTotal() + 50; // Calculate Total
    navigation.navigate("CheckoutScreen", { id, totalAmount }); // Pass Total Amount
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
          <Text style={styles.summaryText}>Rs. {getTotal()}</Text>

          <Text style={styles.summaryText}>Tax & Fees</Text>
          <Text style={styles.summaryText}>Rs. 50</Text>

          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>Rs. {getTotal() + 50}</Text>
        </View>

        {cartItems.map((cartItem, index) => (
          <View key={index} style={styles.menuItem}>
            <Image
              source={
                typeof cartItem.image === "string"
                  ? { uri: cartItem.image }
                  : cartItem.image
              }
              style={styles.menuImage}
            />
            <View style={styles.details}>
              <Text style={styles.itemName}>{cartItem.name}</Text>
              <Text style={styles.description}>{cartItem.description}</Text>
              <Text style={styles.price}>
                ⚡ Rs. {cartItem.price} x {cartItem.quantity}
              </Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(
                      cartItem.id,
                      Math.max(1, cartItem.quantity - 1)
                    )
                  }
                >
                  <Text style={styles.quantityBtn}>-</Text>
                </TouchableOpacity>
                <Text>{cartItem.quantity}</Text>
                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(cartItem.id, cartItem.quantity + 1)
                  }
                >
                  <Text style={styles.quantityBtn}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(cartItem.id)}>
                  <Text style={styles.removeText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>CHECKOUT ↗</Text>
        </TouchableOpacity>
      </ScrollView>
      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backButton: { margin: 20 },
  backText: { color: "#FFF", fontSize: 16 },
  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  summaryCard: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  summaryText: { fontSize: 16, color: "#333", marginBottom: 8 },
  totalText: { fontSize: 18, color: "#DD1717", fontWeight: "bold" },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  details: { flex: 1, padding: 10 },
  itemName: { fontSize: 18, fontWeight: "bold", color: "#000" },
  description: { fontSize: 14, color: "#555", marginVertical: 5 },
  price: { fontSize: 16, fontWeight: "bold", color: "#DD1717" },
  checkoutButton: {
    backgroundColor: "#DD1717",
    padding: 16,
    borderRadius: 12,
    margin: 20,
    alignItems: "center",
  },
  checkoutText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default MenuDetailScreen;
