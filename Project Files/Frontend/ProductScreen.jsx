import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderScreen = () => {
    const { id } = useParams();
    const { userInfo } = useAuth();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchOrder();
        }
    }, [id, userInfo]);

    const deliverHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put(`/api/orders/${order._id}/deliver`, {}, config);
            // Refresh order
            const { data } = await axios.get(`/api/orders/${id}`, config);
            setOrder(data);
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Order {order._id}</h1>

            {(order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery') && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 mb-8 rounded-r-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" /></svg></div>
                        <div>
                            <p className="font-bold text-xl">Order Confirmed Successfully!</p>
                            <p className="text-sm">Thank you for your purchase. Your order will be shipped soon. Please pay <strong>${order.totalPrice}</strong> upon delivery.</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping</h2>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Name: </span> {order.user.name}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Email: </span> <a href={`mailto:${order.user.email}`} className="text-indigo-600">{order.user.email}</a>
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-semibold">Address: </span>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Not Delivered</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Method</h2>
                        <p className="text-gray-600 mb-4">
                            <span className="font-semibold">Method: </span>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">Paid on {order.paidAt}</div>
                        ) : (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">Not Paid</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <p className="text-gray-600">Order is empty</p>
                        ) : (
                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                                            <Link to={`/product/${item.book}`} className="text-lg font-medium text-gray-800 hover:text-indigo-600">
                                                {item.title}
                                            </Link>
                                        </div>
                                        <div className="text-gray-600">
                                            {item.qty} x ${item.price} = <span className="font-bold">${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Items</span>
                                <span>${order.totalPrice - order.taxPrice - order.shippingPrice}</span>
                                {/* Note: Ideally store itemsPrice separately in DB but using calculation for now or just totalPrice */}
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>${order.taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>${order.totalPrice}</span>
                            </div>
                        </div>

                        {/* PayPal Button Placeholder or COD Message */}
                        {!order.isPaid && (
                            <div className="mt-4">
                                {order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery' ? (
                                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
                                        <p className="font-bold">Order Confirmed: Cash on Delivery</p>
                                        <p>Please pay <strong>${order.totalPrice}</strong> upon delivery.</p>
                                    </div>
                                ) : (
                                    <button className="w-full bg-yellow-400 text-blue-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition duration-300">
                                        Pay with PayPal (Mock)
                                    </button>
                                )}
                            </div>
                        )}

                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <div className="mt-4">
                                <button
                                    onClick={deliverHandler}
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition duration-300"
                                >
                                    Mark As Delivered
                                </button>
                            </div>
                        )}
                        {/* Allow marking COD orders as delivered even if not 'paid' in system yet, as they pay on delivery */}
                        {userInfo && userInfo.isAdmin && !order.isPaid && !order.isDelivered && (order.paymentMethod === 'COD' || order.paymentMethod === 'Cash on Delivery') && (
                            <div className="mt-4">
                                <button
                                    onClick={deliverHandler}
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition duration-300"
                                >
                                    Mark As Delivered
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
