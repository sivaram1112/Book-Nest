import { createContext, useState, useEffect, useContext } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlistItems');
        if (storedWishlist) {
            setWishlistItems(JSON.parse(storedWishlist));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (book) => {
        const existItem = wishlistItems.find((x) => x._id === book._id);
        if (!existItem) {
            setWishlistItems([...wishlistItems, book]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(wishlistItems.filter((x) => x._id !== id));
    };

    const clearWishlist = () => {
        setWishlistItems([]);
        localStorage.removeItem('wishlistItems');
    };

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            addToWishlist,
            removeFromWishlist,
            clearWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);

export default WishlistContext;
