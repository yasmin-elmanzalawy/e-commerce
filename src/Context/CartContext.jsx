import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [cart, setCart] = useState(null);

    const headers = {
        token: localStorage.getItem('token')
    };

    const getUserCart = () => {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then(data => data)
        .catch(err => {
            console.error('Failed to get cart:', err);
            throw err;
        });
    };

    const getAllItems = async () => {
        try {
            const response = await getUserCart();
            setCart(response.data);
        } catch (error) {
            console.error('Failed to fetch all items:', error);
        }
    };

    useEffect(() => {
        getAllItems();
    }, []);

    const addToCart = (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
            headers
        }).then(data => data)
        .catch(err => {
            console.error('Failed to add item to cart:', err);
            throw err;
        });
    };

    const deleteProduct = (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        }).then(data => data)
        .catch(err => {
            console.error('Failed to delete product from cart:', err);
            throw err;
        });
    };

    const updateCartCountItem = (productId, count) => {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
            headers
        }).then(data => data)
        .catch(err => {
            console.error('Failed to update cart item count:', err);
            throw err;
        });
    };

    const clearCart = () => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then(data => data)
        .catch(err => {
            console.error('Failed to clear cart:', err);
            throw err;
        });
    };

    const checkOutNow = (cartId, url, formValue) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            { shippingAddress: formValue },
            { headers }
        ).then(data => data)
        .catch(err => {
            console.error('Failed to check out:', err);
            throw err;
        });
    };

    return (
        <CartContext.Provider value={{ getUserCart, addToCart, updateCartCountItem, deleteProduct, clearCart, cart, setCart, checkOutNow }}>
            {props.children}
        </CartContext.Provider>
    );
}
