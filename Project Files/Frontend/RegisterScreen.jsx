import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const { shippingAddress, savePaymentMethod } = useCart();
    const navigate = useNavigate();

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 />
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-4">Select Method</label>
                        <div className="flex items-center mb-4">
                            <input
                                type="radio"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="PayPal" className="ml-3 block text-gray-700 font-medium">
                                PayPal or Credit Card
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="Stripe"
                                name="paymentMethod"
                                value="Stripe"
                                checked={paymentMethod === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="Stripe" className="ml-3 block text-gray-700 font-medium">
                                Stripe
                            </label>
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="radio"
                                id="COD"
                                name="paymentMethod"
                                value="COD"
                                checked={paymentMethod === 'COD'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="COD" className="ml-3 block text-gray-700 font-medium">
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700 transition duration-300 w-full"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentScreen;
