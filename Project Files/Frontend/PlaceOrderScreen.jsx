import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get(`/api/books?t=${Date.now()}`); // Cache busting
                console.log('Fetched Books Data:', data);
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError(
                    err.response && err.response.data.message
                        ? err.response.data.message + (err.response.data.error ? `: ${err.response.data.error}` : '')
                        : err.message
                );
                console.error('Error fetching books:', err);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">Best Seller</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {books.slice(0, 4).map((book) => (
                    <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 border border-gray-100">
                        <div className="h-64 overflow-hidden relative group">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                                }}
                            />
                            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div> */}
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={book.title}>{book.title}</h3>
                            <p className="text-gray-500 text-sm mb-3">
                                {book.authors && book.authors.map(a => a.name).join(', ')}
                            </p>
                            <Link to={`/product/${book._id}`} className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 text-sm font-medium uppercase tracking-wider shadow-md hover:shadow-lg">
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link to="/books" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-lg hover:opacity-80 transition duration-300">View All Books &rarr;</Link>
            </div>
        </div >
    );
};

export default HomeScreen;

