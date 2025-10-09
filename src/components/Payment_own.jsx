import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import axios from 'axios';

// Load Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key');

// PayPal configuration
const paypalOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || 'your_paypal_client_id',
    currency: 'USD',
    intent: 'capture'
};

// Payment Gateway Components
const StripePayment = ({ amount, onSuccess, onCancel, loading, setLoading }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        createPaymentIntent();
    }, [amount]);

    const createPaymentIntent = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                amount: amount,
                gateway: 'stripe'
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                setClientSecret(response.data.clientSecret);
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            toast.error('Card element not found');
            setLoading(false);
            return;
        }

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                }
            });

            if (error) {
                toast.error(error.message || 'Payment failed');
            } else if (paymentIntent.status === 'succeeded') {
                await axios.post('http://localhost:5000/api/payment/confirm-payment', {
                    paymentIntentId: paymentIntent.id,
                    gateway: 'stripe'
                }, {
                    withCredentials: true
                });

                toast.success('Payment successful!');
                onSuccess(paymentIntent);
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 mt-20">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="text-2xl mr-2">💳</span>
                    Credit/Debit Card
                </h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Information
                    </label>
                    <div className="border border-gray-300 rounded-md p-3">
                        <CardElement options={cardElementOptions} />
                    </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-lg font-semibold">${amount ? amount.toFixed(2) : '0.00'}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : `Pay $${amount ? amount.toFixed(2) : '0.00'}`}
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

const PayPalPayment = ({ amount, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const createOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                amount: amount,
                gateway: 'paypal'
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                return response.data.orderId;
            }
        } catch (error) {
            console.error('Error creating PayPal order:', error);
            toast.error('Error initializing PayPal payment');
        } finally {
            setLoading(false);
        }
    };

    const onApprove = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/payment/confirm-payment', {
                orderId: data.orderID,
                gateway: 'paypal'
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                toast.success('PayPal payment successful!');
                onSuccess(response.data);
            }
        } catch (error) {
            console.error('PayPal payment error:', error);
            toast.error('PayPal payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="text-2xl mr-2">🔵</span>
                    PayPal
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-lg font-semibold">${amount ? amount.toFixed(2) : '0.00'}</span>
                </div>
            </div>

            <PayPalScriptProvider options={paypalOptions}>
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={(err) => {
                        console.error('PayPal error:', err);
                        toast.error('PayPal payment failed');
                    }}
                    style={{
                        layout: 'horizontal',
                        color: 'blue',
                        shape: 'rect',
                        label: 'pay'
                    }}
                />
            </PayPalScriptProvider>

            <button
                type="button"
                onClick={onCancel}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
            >
                Cancel
            </button>
        </div>
    );
};

const RazorpayPayment = ({ amount, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const initializeRazorpay = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                amount: amount,
                currency: 'INR',
                gateway: 'razorpay'
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'your_razorpay_key_id',
                    amount: response.data.amount,
                    currency: response.data.currency,
                    name: 'Music Streaming',
                    description: 'Payment for music streaming service',
                    order_id: response.data.orderId,
                    handler: async function (response) {
                        try {
                            const confirmResponse = await axios.post('http://localhost:5000/api/payment/confirm-payment', {
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                gateway: 'razorpay'
                            }, {
                                withCredentials: true
                            });

                            if (confirmResponse.data.success) {
                                toast.success('Razorpay payment successful!');
                                onSuccess(confirmResponse.data);
                            }
                        } catch (error) {
                            console.error('Razorpay confirmation error:', error);
                            toast.error('Payment confirmation failed');
                        }
                    },
                    prefill: {
                        name: 'User Name',
                        email: 'user@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#6366f1'
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error('Error initializing Razorpay:', error);
            toast.error('Error initializing Razorpay payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="text-2xl mr-2">🇮🇳</span>
                    Razorpay (UPI, Cards, Net Banking)
                </h3>
                
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="text-lg font-semibold">₹{amount ? (amount * 83).toFixed(2) : '0.00'}</span>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={initializeRazorpay}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Pay with Razorpay'}
                </button>
                
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Main Payment Component
const Payment = ({ amount = 0, onSuccess, onCancel }) => {
    const [selectedGateway, setSelectedGateway] = useState('stripe');
    const [availableGateways, setAvailableGateways] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Ensure amount is a valid number
    const validAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;

    useEffect(() => {
        fetchAvailableGateways();
    }, []);

    const fetchAvailableGateways = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/payment/available-gateways', {
                withCredentials: true
            });

            if (response.data.success) {
                setAvailableGateways(response.data.gateways);
                if (response.data.gateways.length > 0) {
                    setSelectedGateway(response.data.gateways[0].id);
                }
            }
        } catch (error) {
            console.error('Error fetching gateways:', error);
        }
    };

    const renderPaymentComponent = () => {
        switch (selectedGateway) {
            case 'stripe':
                return (
                    <Elements stripe={stripePromise}>
                        <StripePayment 
                            amount={validAmount}
                            onSuccess={onSuccess}
                            onCancel={onCancel}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </Elements>
                );
            case 'paypal':
                return (
                    <PayPalPayment 
                        amount={validAmount}
                        onSuccess={onSuccess}
                        onCancel={onCancel}
                    />
                );
            case 'razorpay':
                return (
                    <RazorpayPayment 
                        amount={validAmount}
                        onSuccess={onSuccess}
                        onCancel={onCancel}
                    />
                );
            default:
                return <div>Unsupported payment gateway</div>;
        }
    };

    return (
        <div className="max-w-md mx-auto">
            {availableGateways.length > 1 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {availableGateways.map((gateway) => (
                            <button
                                key={gateway.id}
                                onClick={() => setSelectedGateway(gateway.id)}
                                className={`p-4 border rounded-lg text-left transition duration-200 ${
                                    selectedGateway === gateway.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">{gateway.icon}</span>
                                    <div>
                                        <div className="font-semibold">{gateway.name}</div>
                                        <div className="text-sm text-gray-500">{gateway.description}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {renderPaymentComponent()}
        </div>
    );
};

export default Payment; 