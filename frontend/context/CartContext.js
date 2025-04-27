// context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity) => {
        const existingItem = cartItems.find(i => i.id === item.id);
        if (existingItem) {
            setCartItems(prev =>
                prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
                )
            );
        } else {
            setCartItems(prev => [...prev, { ...item, quantity }]);
        }
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(prev =>
            prev.map(i => i.id === id ? { ...i, quantity } : i)
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
