const SellerListScreen = () => {
    // Mock data for display purposes
    const sellers = [
        { id: '1', userid: '655ba...d89', name: 'ad', email: 'ad@gmail.com' },
        { id: '2', userid: '655c4...e06', name: 'syed', email: 'syed@gmail.com' },
    ];

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Vendors</h1>
            <div className="overflow-x-auto bg-gray-900 text-white rounded-lg">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-800 text-left">
                            <th className="p-3">sno</th>
                            <th className="p-3">Userid</th>
                            <th className="p-3">User name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, index) => (
                            <tr key={seller.id} className="border-b border-gray-700">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{seller.userid}</td>
                                <td className="p-3">{seller.name}</td>
                                <td className="p-3">{seller.email}</td>
                                <td className="p-3 flex space-x-2">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">View</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerListScreen;
