import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const [shippingAddress, setShippingAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        const storedShippingAddress = localStorage.getItem('shippingAddress');
        const storedPaymentMethod = localStorage.getItem('paymentMethod');

        if (storedCart) setCartItems(JSON.parse(storedCart));
        if (storedShippingAddress) setShippingAddress(JSON.parse(storedShippingAddress));
        if (storedPaymentMethod) setPaymentMethod(JSON.parse(storedPaymentMethod));
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }, [shippingAddress]);

    useEffect(() => {
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    }, [paymentMethod]);

    const addToCart = (item) => {
        const existItem = cartItems.find((x) => x.book === item.book);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.book === existItem.book ? item : x
                )
            );
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x.book !== id));
    };

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
    };

    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
    };

    const clearCart = () => {
        setCartItems([]);
        setShippingAddress({});
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            shippingAddress,
            saveShippingAddress,
            paymentMethod,
            savePaymentMethod
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
