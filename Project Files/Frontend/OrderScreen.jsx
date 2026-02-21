import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';

const BooksScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');

    const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('/api/books');
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );

    const isInWishlist = (bookId) => {
        return wishlistItems.some((item) => item._id === bookId);
    };

    const toggleWishlist = (book) => {
        if (isInWishlist(book._id)) {
            removeFromWishlist(book._id);
        } else {
            addToWishlist(book);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Books Collection</h1>
                <input
                    type="text"
                    placeholder="Search books..."
                    className="border p-2 rounded w-full md:w-1/3"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                    <div key={book._id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col h-full relative group">
                        <button
                            onClick={() => toggleWishlist(book)}
                            className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 transition duration-300"
                        >
                            {isInWishlist(book._id) ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <div className="h-64 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                            {book.image ? (
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                                    }}
                                />
                            ) : (
                                <span className="text-gray-400">No Image</span>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1" title={book.title}>{book.title}</h3>
                        <p className="text-gray-500 mb-2 text-sm line-clamp-2">{book.description}</p>
                        <div className="mt-auto flex justify-between items-center">
                            <p className="text-lg font-bold text-indigo-600">${book.price}</p>
                            <Link to={`/product/${book._id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 font-medium text-sm">
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksScreen;
