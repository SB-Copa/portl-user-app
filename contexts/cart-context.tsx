'use client';

import useSessionStorage from '@/hooks/use-session-storage';
import { CartItem } from '@/schema/ticket-schema';
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (ticketId: number) => void;
    updateQuantity: (ticketId: number, quantity: number) => void;
    increaseQuantity: (ticketId: number) => void;
    decreaseQuantity: (ticketId: number) => void;
    clearCart: () => void;
    getTicketQuantity: (ticketId: number) => number;
    isInCart: (ticketId: number) => boolean;
    getCartItem: (ticketId: number) => CartItem | undefined;
    cartTotal: number;
    cartItemsCount: number;
    cartItemsPerEvent: Record<string, CartItem[]>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
}

const CART_STORAGE_KEY = 'paradimes_cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const { getValue, setValue } = useSessionStorage();

    useEffect(() => {
        const savedCart = getValue(CART_STORAGE_KEY);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            setValue(CART_STORAGE_KEY, cart);
        }
    }, [isInitialized, cart]);

    useEffect(() => {

        console.log(cart)

    }, [cart])

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + item.quantity,
                };
                return updatedCart;
            } else {
                // New item, add to cart
                return [...prevCart, item];
            }
        });
    };

    const removeFromCart = (ticketId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== ticketId));
    };

    const updateQuantity = (ticketId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(ticketId);
            return;
        }

        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === ticketId ? { ...item, quantity } : item
            );
            return updatedCart;
        });
    };

    const increaseQuantity = (ticketId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === ticketId ? { ...item, quantity: item.quantity + 1 } : item
            );
            return updatedCart;
        });
    };

    const decreaseQuantity = (ticketId: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) => {
                    if (item.id === ticketId) {
                        const newQuantity = item.quantity - 1;
                        if (newQuantity <= 0) {
                            return null;
                        }
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                })
                .filter((item): item is CartItem => item !== null);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTicketQuantity = (ticketId: number) => {
        const item = cart.find((item) => item.id === ticketId);
        return item ? item.quantity : 0;
    };

    const isInCart = (ticketId: number) => {
        return cart.some((item) => item.id === ticketId);
    };

    const getCartItem = (ticketId: number) => {
        return cart.find((item) => item.id === ticketId);
    };

    const cartTotal = cart.reduce((total, item) => {
        return total + parseFloat(item.price) * item.quantity;
    }, 0);

    const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

    const cartItemsPerEvent = cart.reduce((acc, item) => {
        if (!acc[item.event_name]) {
            acc[item.event_name] = [];
        }
        acc[item.event_name].push(item);
        return acc;
    }, {} as Record<string, CartItem[]>);

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTicketQuantity,
        isInCart,
        getCartItem,
        cartTotal,
        cartItemsCount,
        cartItemsPerEvent,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


