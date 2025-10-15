'use client';

import useSessionStorage from '@/hooks/use-session-storage';
import { CartTicket, CartVenueTable } from '@/schema/cart-schema';
import React, { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';


export type Cart = {
    tickets: CartTicket[];
    tables: CartVenueTable[];
};

type CartContextType = {
    // State
    cart: Cart;

    // Ticket operations
    addTicket: (ticket: CartTicket) => void;
    removeTicket: (ticketId: number) => void;
    updateTicketQuantity: (ticketId: number, quantity: number) => void;
    increaseTicketQuantity: (ticketId: number) => void;
    decreaseTicketQuantity: (ticketId: number) => void;
    getTicketQuantity: (ticketId: number) => number;
    isTicketInCart: (ticketId: number) => boolean;
    getTicketCartItem: (ticketId: number) => CartTicket | undefined;

    // Table operations
    addTable: (table: CartVenueTable) => void;
    removeTable: (tableId: number) => void;
    isTableInCart: (tableId: number) => boolean;
    getTableCartItem: (tableId: number) => CartVenueTable | undefined;

    // Cart operations
    clearCart: () => void;
    clearTickets: () => void;
    clearTables: () => void;

    // Computed values
    ticketTotal: number;
    tableTotal: number;
    cartTotal: number;
    ticketCount: number;
    tableCount: number;
    totalItemCount: number;

    // Grouped data
    ticketsByEvent: Record<string, CartTicket[]>;
    tablesByEvent: Record<string, CartVenueTable[]>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

const CART_STORAGE_KEY = 'portal_cart_key';

const INITIAL_CART: Cart = {
    tickets: [],
    tables: [],
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart>(INITIAL_CART);
    const [isInitialized, setIsInitialized] = useState(false);

    const { getValue, setValue } = useSessionStorage();

    useEffect(() => {
        const savedCart = getValue(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error('Failed to parse cart from session storage:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            setValue(CART_STORAGE_KEY, cart);
        }
    }, [isInitialized, cart]);

    useEffect(() => {
        console.log('Cart updated:', cart);
    }, [cart]);

    // ==================== TICKET OPERATIONS ====================

    const addTicket = useCallback((
        ticket: CartTicket
    ) => {

        const { quantity, event_name } = ticket;
        if (quantity <= 0) return;

        setCart((prevCart) => {
            const existingTicketIndex = prevCart.tickets.findIndex(
                (item) => item.event_ticket_type_id === ticket.event_ticket_type_id
            );

            if (existingTicketIndex > -1) {
                // Update existing ticket quantity
                const updatedTickets = [...prevCart.tickets];
                updatedTickets[existingTicketIndex] = {
                    ...updatedTickets[existingTicketIndex],
                    quantity: updatedTickets[existingTicketIndex].quantity + quantity,
                    max_capacity: updatedTickets[existingTicketIndex].quantity + quantity,
                };
                return { ...prevCart, tickets: updatedTickets };
            } else {
                // Add new ticket
                const newTicket: CartTicket = {
                    ...ticket,
                    quantity,
                    event_name: event_name,
                    max_capacity: quantity,
                };
                return {
                    ...prevCart,
                    tickets: [...prevCart.tickets, newTicket],
                };
            }
        });
    }, []);

    const removeTicket = useCallback((ticketId: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets.filter((item) => item.event_ticket_type_id !== ticketId),
        }));
    }, []);

    const updateTicketQuantity = useCallback((ticketId: number, quantity: number) => {
        if (quantity <= 0) {
            removeTicket(ticketId);
            return;
        }

        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets.map((item) =>
                item.event_ticket_type_id === ticketId ? { ...item, quantity, max_capacity: quantity } : item
            ),
        }));
    }, [removeTicket]);

    const increaseTicketQuantity = useCallback((ticketId: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets.map((item) =>
                item.event_ticket_type_id === ticketId ? { ...item, quantity: item.quantity + 1, max_capacity: item.quantity + 1 } : item
            ),
        }));
    }, []);

    const decreaseTicketQuantity = useCallback((ticketId: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            tickets: prevCart.tickets
                .map((item) => {
                    if (item.event_ticket_type_id === ticketId) {
                        const newQuantity = item.quantity - 1;
                        return newQuantity > 0 ? { ...item, quantity: newQuantity, max_capacity: newQuantity } : null;
                    }
                    return item;
                })
                .filter((item): item is CartTicket => item !== null),
        }));
    }, []);

    const getTicketQuantity = useCallback((ticketId: number) => {
        const item = cart.tickets.find((item) => item.event_ticket_type_id === ticketId);
        return item?.quantity ?? 0;
    }, [cart.tickets]);

    const isTicketInCart = useCallback((ticketId: number) => {
        return cart.tickets.some((item) => item.event_ticket_type_id === ticketId);
    }, [cart.tickets]);

    const getTicketCartItem = useCallback((ticketId: number) => {
        return cart.tickets.find((item) => item.event_ticket_type_id === ticketId);
    }, [cart.tickets]);



    // ==================== TABLE OPERATIONS ====================

    const addTable = useCallback((table: CartVenueTable) => {
        setCart((prevCart) => {
            // Check if table already exists
            const tableExists = prevCart.tables.some((item) => item.venue_table_id === table.venue_table_id);

            if (tableExists) {
                console.warn('Table already in cart');
                return prevCart;
            }

            return {
                ...prevCart,
                tables: [...prevCart.tables, table],
            };
        });
    }, []);

    const removeTable = useCallback((tableId: number) => {
        setCart((prevCart) => ({
            ...prevCart,
            tables: prevCart.tables.filter((item) => item.venue_table_id !== tableId),
        }));
    }, []);

    const isTableInCart = useCallback((tableId: number) => {
        return cart.tables.some((item) => item.venue_table_id === tableId);
    }, [cart.tables]);

    const getTableCartItem = useCallback((tableId: number) => {
        return cart.tables.find((item) => item.venue_table_id === tableId);
    }, [cart.tables]);


    // ==================== CART OPERATIONS ====================

    const clearCart = useCallback(() => {
        setCart(INITIAL_CART);
    }, []);

    const clearTickets = useCallback(() => {
        setCart((prevCart) => ({ ...prevCart, tickets: [] }));
    }, []);

    const clearTables = useCallback(() => {
        setCart((prevCart) => ({ ...prevCart, tables: [] }));
    }, []);

    // ==================== COMPUTED VALUES ====================

    const ticketTotal = useMemo(() => {
        return cart.tickets.reduce((total, item) => {
            return total + parseFloat(item.price) * item.quantity;
        }, 0);
    }, [cart.tickets]);

    const tableTotal = useMemo(() => {
        return cart.tables.reduce((total, item) => {
            return total + parseFloat(item.price);
        }, 0);
    }, [cart.tables]);

    const cartTotal = useMemo(() => {
        return ticketTotal + tableTotal;
    }, [ticketTotal, tableTotal]);

    const ticketCount = useMemo(() => {
        return cart.tickets.reduce((count, item) => count + item.quantity, 0);
    }, [cart.tickets]);

    const tableCount = useMemo(() => {
        return cart.tables.length;
    }, [cart.tables]);

    const totalItemCount = useMemo(() => {
        return ticketCount + tableCount;
    }, [ticketCount, tableCount]);

    const ticketsByEvent = useMemo(() => {
        return cart.tickets.reduce((acc, item) => {
            const eventKey = item.event_name || `event_${item.event_name}`;
            if (!acc[eventKey]) {
                acc[eventKey] = [];
            }
            acc[eventKey].push(item);
            return acc;
        }, {} as Record<string, CartTicket[]>);
    }, [cart.tickets]);

    const tablesByEvent = useMemo(() => {
        return cart.tables.reduce((acc, item) => {
            const eventKey = item.event_name || `event_${item.venue_table_id}`;
            if (!acc[eventKey]) {
                acc[eventKey] = [];
            }
            acc[eventKey].push(item);
            return acc;
        }, {} as Record<string, CartVenueTable[]>);
    }, [cart.tables]);

    // ==================== CONTEXT VALUE ====================

    const value: CartContextType = {
        // State
        cart,

        // Ticket operations
        addTicket,
        removeTicket,
        updateTicketQuantity,
        increaseTicketQuantity,
        decreaseTicketQuantity,
        getTicketQuantity,
        isTicketInCart,
        getTicketCartItem,

        // Table operations
        addTable,
        removeTable,
        isTableInCart,
        getTableCartItem,

        // Cart operations
        clearCart,
        clearTickets,
        clearTables,

        // Computed values
        ticketTotal,
        tableTotal,
        cartTotal,
        ticketCount,
        tableCount,
        totalItemCount,

        // Grouped data
        ticketsByEvent,
        tablesByEvent,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


