import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const CartScreen = () => {
    const { cartItems, removeFromCart } = useCart();
    const { userInfo } = useAuth();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Go back to shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <div key={item.book} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                                    <div>
                                        <Link to={`/product/${item.book}`} className="text-lg font-medium text-gray-800 hover:text-indigo-600">
                                            {item.title}
                                        </Link>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="mx-4 text-gray-700">Qty: {item.qty}</span>
                                    <button
                                        onClick={() => removeFromCart(item.book)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <p className="text-2xl font-bold text-gray-800 mb-6">
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </p>
                            <button
                                onClick={checkoutHandler}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;

