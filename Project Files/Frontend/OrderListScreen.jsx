import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { userInfo } = useAuth();
    const [userCount, setUserCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [vendorCount, setVendorCount] = useState(0); // Assuming vendors are users with specific role or distinct entity, for now just 0 or fetch if possible
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                // Fetch Users
                const { data: users } = await axios.get('/api/users', config);
                setUserCount(users.length);
                // Assuming vendors might be filtered from users if they have a role, otherwise placeholder
                // setVendorCount(users.filter(u => u.isVendor).length); 

                // Fetch Products
                const { data: books } = await axios.get('/api/books');
                setProductCount(books.length);

                // Fetch Orders
                const { data: orders } = await axios.get('/api/orders', config);
                setOrderCount(orders.length);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
                setLoading(false);
            }
        };

        if (userInfo && userInfo.isAdmin) {
            fetchData();
        }
    }, [userInfo]);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center bg-blue-600 text-white py-4 rounded">DashBoard</h1>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <Link to="/admin/users" className="bg-red-500 text-white p-6 rounded-lg text-center shadow-lg hover:bg-red-600 transition">
                            <h3 className="text-xl font-bold">USERS</h3>
                            <p className="text-3xl mt-2">{userCount}</p>
                        </Link>
                        <div className="bg-blue-500 text-white p-6 rounded-lg text-center shadow-lg">
                            <h3 className="text-xl font-bold">Vendors</h3>
                            <p className="text-3xl mt-2">{vendorCount}</p>
                        </div>
                        <Link to="/admin/products" className="bg-green-500 text-white p-6 rounded-lg text-center shadow-lg hover:bg-green-600 transition">
                            <h3 className="text-xl font-bold">Items</h3>
                            <p className="text-3xl mt-2">{productCount}</p>
                        </Link>
                        <Link to="/admin/orders" className="bg-yellow-500 text-white p-6 rounded-lg text-center shadow-lg hover:bg-yellow-600 transition">
                            <h3 className="text-xl font-bold">Total Orders</h3>
                            <p className="text-3xl mt-2">{orderCount}</p>
                        </Link>
                    </div>

                    {/* Placeholder for Chart - Could use a library like Chart.js or Recharts later */}
                    <div className="bg-white p-6 rounded shadow-md flex justify-center items-end h-64 space-x-4">
                        {/* Simple visual representation proportional to counts (scaled) */}
                        <div className="bg-indigo-900 w-12 rounded-t" style={{ height: `${Math.min(userCount * 10, 200)}px` }} title={`Users: ${userCount}`}></div>
                        <div className="bg-blue-300 w-12 rounded-t" style={{ height: '40px' }} title="Vendors"></div> {/* Placeholder */}
                        <div className="bg-green-600 w-12 rounded-t" style={{ height: `${Math.min(productCount * 5, 200)}px` }} title={`Items: ${productCount}`}></div>
                        <div className="bg-yellow-500 w-12 rounded-t" style={{ height: `${Math.min(orderCount * 10, 200)}px` }} title={`Orders: ${orderCount}`}></div>
                    </div>
                    <div className="flex justify-center mt-2 space-x-4 text-sm text-gray-600">
                        <span>Users</span>
                        <span>Vendors</span>
                        <span>Items</span>
                        <span>Orders</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
