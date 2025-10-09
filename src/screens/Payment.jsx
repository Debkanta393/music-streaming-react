import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Payment from '../components/Payment.jsx';
import { toast } from 'react-toastify';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
    
    // Get amount and product details from navigation state
    const { amount = 0, productId, productName, artistName } = location.state || {};
    
    // Ensure amount is a valid number
    const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    
    const [loading, setLoading] = useState(false);

    // Check if user is authenticated
    useEffect(() => {
        // Only check authentication after loading is complete
        if (!authLoading) {
            if (!isAuthenticated) {
                toast.error('Please login to make a payment');
                navigate('/login');
                return;
            }
        }
    }, [isAuthenticated, authLoading, navigate]);

    // Handle payment success
    const handlePaymentSuccess = (paymentData) => {
        toast.success('Payment successful! Your order has been confirmed.');
        // You can add additional logic here like:
        // - Update order status in database
        // - Send confirmation email
        // - Redirect to order confirmation page
        navigate('/profile', { 
            state: { 
                message: 'Payment successful!',
                paymentData: paymentData
            } 
        });
    };

    // Handle payment cancellation
    const handlePaymentCancel = () => {
        toast.info('Payment cancelled');
        navigate(-1); // Go back to previous page
    };

    // Show loading while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If no amount is provided, show error
    if (!validAmount || validAmount <= 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Payment Amount</h2>
                    <p className="text-gray-500 mb-6">Please select a product to make a payment.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Purchase</h1>
                    <p className="text-gray-600">Choose your preferred payment method to complete the transaction</p>
                </div>

                {/* Product Summary */}
                {productName && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">{productName}</h3>
                                {artistName && (
                                    <p className="text-sm text-gray-500">by {artistName}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-800">₹{validAmount.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">Total Amount</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Component */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <Payment 
                        amount={validAmount}
                        onSuccess={handlePaymentSuccess}
                        onCancel={handlePaymentCancel}
                    />
                </div>

                {/* Security Notice */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <span className="text-blue-600 text-lg mr-2">🔒</span>
                        <div className="text-sm text-blue-800">
                            <p className="font-medium">Secure Payment</p>
                            <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
