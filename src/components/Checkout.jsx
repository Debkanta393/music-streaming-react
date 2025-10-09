import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Payment from './Payment.jsx';
// import { clearCart } from '../create-slice/cart-slice.js';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);

    // Calculate total
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    const handlePaymentSuccess = (paymentIntent) => {
        // Clear cart after successful payment
        // dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/');
    };

    const handlePaymentCancel = () => {
        setShowPayment(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-gray-400 text-6xl mb-4">🛒</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Add some items to your cart before checkout.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.productId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                    <img 
                                        src={`http://localhost:5000/uploads/${item.image}`} 
                                        alt={item.proName}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.proName}</h3>
                                        <p className="text-sm text-gray-500">{item.proDes}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-800">${item.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (10%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>
                        
                        {!showPayment ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">Secure Payment</h3>
                                    <p className="text-sm text-blue-600">
                                        Your payment information is encrypted and secure. We use Stripe for all transactions.
                                    </p>
                                </div>
                                
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-gray-800">Total Amount</p>
                                        <p className="text-sm text-gray-500">Including tax and fees</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        ) : (
                            <Payment 
                                amount={total}
                                onSuccess={handlePaymentSuccess}
                                onCancel={handlePaymentCancel}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 