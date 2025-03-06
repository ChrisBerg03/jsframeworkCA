import { Link } from "react-router-dom";
import { useCart } from "../stores/store";

const Checkout = () => {
    const { removeAll } = useCart();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    ✅ Order was successful!
                </h1>
                <p className="text-gray-700 mb-6">
                    Thank you for your purchase.
                </p>

                <Link
                    to="/"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                    onClick={removeAll}
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
