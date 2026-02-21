import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
                <Link to="/login" className={`${step1 ? 'text-indigo-600 font-bold' : 'text-gray-400 cursor-not-allowed'}`}>
                    Sign In
                </Link>
                <span className="text-gray-400">&gt;</span>

                <Link to="/shipping" className={`${step2 ? 'text-indigo-600 font-bold' : 'text-gray-400 cursor-not-allowed'}`}>
                    Shipping
                </Link>
                <span className="text-gray-400">&gt;</span>

                <Link to="/payment" className={`${step3 ? 'text-indigo-600 font-bold' : 'text-gray-400 cursor-not-allowed'}`}>
                    Payment
                </Link>
                <span className="text-gray-400">&gt;</span>

                <Link to="/placeorder" className={`${step4 ? 'text-indigo-600 font-bold' : 'text-gray-400 cursor-not-allowed'}`}>
                    Place Order
                </Link>
            </div>
        </div>
    );
};

export default CheckoutSteps;
