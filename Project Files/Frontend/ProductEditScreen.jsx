import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderListScreen = () => {
    const { userInfo } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('/api/orders', config);
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (userInfo && userInfo.isAdmin) {
            fetchOrders();
        }
    }, [userInfo]);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">All Orders</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">USER</th>
                                <th className="py-3 px-6 text-left">DATE</th>
                                <th className="py-3 px-6 text-center">TOTAL</th>
                                <th className="py-3 px-6 text-center">PAID</th>
                                <th className="py-3 px-6 text-center">DELIVERED</th>
                                <th className="py-3 px-6 text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{order._id}</td>
                                    <td className="py-3 px-6 text-left">{order.user && order.user.name}</td>
                                    <td className="py-3 px-6 text-left">{order.createdAt.substring(0, 10)}</td>
                                    <td className="py-3 px-6 text-center font-bold">${order.totalPrice}</td>
                                    <td className="py-3 px-6 text-center">
                                        {order.isPaid ? (
                                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                                {order.paidAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">No</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {order.isDelivered ? (
                                            <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                                {order.deliveredAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">No</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                            <Link to={`/order/${order._id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;
