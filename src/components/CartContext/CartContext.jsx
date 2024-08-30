// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart');
        setCart(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId: product._id,
        quantity: 1, // Default quantity, adjust as needed
      });
      setCart((prevCart) => [...prevCart, response.data.data]);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`);
      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('https://ecommerce.routemisr.com/api/v1/cart');
      setCart([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
