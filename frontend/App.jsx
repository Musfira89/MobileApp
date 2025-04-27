// App.jsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppNavigator from "./AppNavigator";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <SafeAreaView style={styles.container}>
        <AppNavigator />
      </SafeAreaView>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
