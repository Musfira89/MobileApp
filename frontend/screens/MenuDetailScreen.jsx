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
    const totalAmount = getTotal() + 50;
    navigation.navigate("CheckoutScreen", { id, totalAmount });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header onBackPress={handleBackPress} />
        </View>

        <Text style={styles.title}>ADD TO MENU</Text>

        {/* Summary Box */}
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>Rs. {getTotal()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.summaryLabel}>Tax & Fees</Text>
            <Text style={styles.summaryValue}>Rs. 50</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs. {getTotal() + 50}</Text>
          </View>
        </View>

        {/* Cart Card Container */}
        <View style={styles.cardBox}>
          {cartItems.map((cartItem, index) => (
            <View key={index}>
              <View style={styles.menuItem}>
                {/* Image Wrapper with Grey Background */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={
                      typeof cartItem.image === "string"
                        ? { uri: cartItem.image }
                        : cartItem.image
                    }
                    style={styles.menuImage}
                  />
                </View>

                {/* Right Details */}
                <View style={styles.details}>
                  <Text style={styles.itemName}>{cartItem.name}</Text>
                  <Text style={styles.description}>{cartItem.description}</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.price}>⚡ Rs. {cartItem.price}</Text>
                    <Text style={styles.quantityInline}>x {cartItem.quantity}</Text>
                  </View>

                  <View style={styles.quantityRow}>
                    <TouchableOpacity
                      onPress={() =>
                        updateQuantity(cartItem.id, Math.max(1, cartItem.quantity - 1))
                      }
                    >
                      <Text style={styles.quantityBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityCount}>{cartItem.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    >
                      <Text style={styles.quantityBtn}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(cartItem.id)}>
                      <Text style={styles.removeText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Divider between items */}
              {index < cartItems.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}
        </View>

        {/* Checkout Button */}
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>CHECKOUT ↗</Text>
        </TouchableOpacity>
      </ScrollView>

      <Navbar navigation={navigation} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },

  summaryCard: {
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#333",
  },

  summaryValue: {
    fontSize: 12,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#CCC",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },

  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DD1717",
  },

  cardBox: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  imageWrapper: {
    width: 85,
    height: 60,
    backgroundColor: "#EEE",
    marginRight: 12,
  },

  menuImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 0,
  },

  details: {
    flex: 1,
    justifyContent: "center",
  },

  itemName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },

  description: {
    fontSize: 12,
    color: "#666",
    marginVertical: 4,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#DD1717",
  },

  quantityInline: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  quantityBtn: {
    fontSize: 12,
    color: "#DD1717",
    paddingHorizontal: 10,
  },

  quantityCount: {
    fontSize: 12,
    marginHorizontal: 8,
    color: "#000",
  },

  removeText: {
    fontSize: 13,
    marginLeft: 12,
  },

  checkoutButton: {
    backgroundColor: "#DD1717",
    padding: 16,
    borderRadius: 12,
    margin: 20,
    alignItems: "center",
  },

  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
 itemDivider: {
  height: 1,
  backgroundColor: '#e0e0e0',
  marginTop: 6,
  marginBottom: 15, // 👈 adds space after the line
},


});

export default MenuDetailScreen;
