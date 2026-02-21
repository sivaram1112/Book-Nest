import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { userInfo, logout } = useAuth();
    const { cartItems } = useCart();

    return (
        <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition duration-300">
                    BookNest
                </Link>

                <nav className="hidden md:flex space-x-8">
                    <Link to="/" className="hover:text-gray-300 transition duration-300">Home</Link>
                    <Link to="/books" className="hover:text-gray-300 transition duration-300">Books</Link>

                    <Link to="/cart" className="flex items-center hover:text-gray-300 transition duration-300 relative">
                        <FaShoppingCart className="mr-2" /> Cart
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="flex items-center space-x-4">
                            {userInfo.isAdmin && (
                                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white">Admin</Link>
                            )}
                            <Link to="/orders" className="text-gray-300 hover:text-white">Orders</Link>
                            <Link to="/wishlist" className="text-gray-300 hover:text-white">Wishlist</Link>
                            <span className="text-gray-300">| {userInfo.name}</span>
                            <button onClick={logout} className="flex items-center hover:text-gray-300 transition duration-300">
                                <FaSignOutAlt className="ml-2" /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center hover:text-gray-300 transition duration-300">
                            <FaUser className="mr-2" /> Sign In
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button (Simplified for now) */}
                <div className="md:hidden">
                    <button className="text-white hover:text-gray-300 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

