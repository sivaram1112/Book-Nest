import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist } = useWishlist();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [wishlistMessage, setWishlistMessage] = useState('');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                // Assuming proxy is set up in vite.config.js, otherwise use full URL
                const { data } = await axios.get(`/api/books/${id}`);
                setBook(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const addToCartHandler = () => {
        addToCart({
            book: book._id,
            title: book.title,
            image: book.image,
            price: book.price,
            qty
        });
        navigate('/cart');
    };

    const addToWishlistHandler = () => {
        addToWishlist(book);
        setWishlistMessage('Added to Wishlist!');
        setTimeout(() => setWishlistMessage(''), 3000);
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!book) return <div className="text-center py-10">Book not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition duration-200">
                <FaArrowLeft className="mr-2" /> Back to Home
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image Section */}
                <div className="flex justify-center">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="rounded-lg shadow-2xl shadow-indigo-500/20 max-h-[500px] object-cover w-full md:w-auto transform hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                    <p className="text-lg text-gray-600 mb-4">by {book.authors.map(a => a.name).join(', ')}</p>

                    <div className="flex items-center mb-6">
                        {/* Rating placeholder */}
                        <span className="text-yellow-500 mr-2">★★★★☆</span>
                        <span className="text-gray-500 text-sm">(12 reviews)</span>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 mb-6">
                        <p className="text-2xl font-semibold text-gray-800">${book.price}</p>
                        <p className="mt-4 text-gray-600 leading-relaxed">{book.description}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-700 font-medium">Status:</span>
                            <span className={book.countInStock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                                {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {book.countInStock > 0 && (
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <select
                                    value={qty}
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {[...Array(book.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="space-y-3">
                            <button
                                onClick={addToCartHandler}
                                className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${book.countInStock === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                                    }`}
                                disabled={book.countInStock === 0}
                            >
                                {book.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>

                            <button
                                onClick={addToWishlistHandler}
                                className="w-full py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
                            >
                                <FaHeart className="mr-2 text-red-500" /> Add to Wishlist
                            </button>
                            {wishlistMessage && <p className="text-green-600 text-center text-sm">{wishlistMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
