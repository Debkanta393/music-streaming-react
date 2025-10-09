import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGateway, setSelectedGateway] = useState('all');
    const [availableGateways, setAvailableGateways] = useState([]);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchAvailableGateways();
        fetchPaymentHistory();
    }, []);

    useEffect(() => {
        fetchPaymentHistory();
    }, [selectedGateway]);

    const fetchAvailableGateways = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/payment/available-gateways', {
                withCredentials: true
            });

            if (response.data.success) {
                setAvailableGateways(response.data.gateways);
            }
        } catch (error) {
            console.error('Error fetching gateways:', error);
        }
    };

    const fetchPaymentHistory = async () => {
        try {
            setLoading(true);
            const params = selectedGateway !== 'all' ? { gateway: selectedGateway } : {};
            
            const response = await axios.get('http://localhost:5000/api/payment/payment-history', {
                params,
                withCredentials: true
            });

            if (response.data.success) {
                setPayments(response.data.payments);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
            toast.error('Failed to load payment history');
        } finally {
            setLoading(false);
        }
    };

    const getGatewayIcon = (gateway) => {
        switch (gateway) {
            case 'stripe':
                return '💳';
            case 'paypal':
                return '🔵';
            case 'razorpay':
                return '🇮🇳';
            default:
                return '💰';
        }
    };

    const getGatewayName = (gateway) => {
        switch (gateway) {
            case 'stripe':
                return 'Stripe';
            case 'paypal':
                return 'PayPal';
            case 'razorpay':
                return 'Razorpay';
            default:
                return 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'succeeded':
            case 'success':
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'pending':
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            case 'failed':
            case 'canceled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount, currency) => {
        const currencySymbols = {
            'usd': '$',
            'eur': '€',
            'gbp': '£',
            'inr': '₹',
            'cad': 'C$',
            'aud': 'A$'
        };

        const symbol = currencySymbols[currency?.toLowerCase()] || '$';
        return `${symbol}${amount.toFixed(2)}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment History</h1>
                    <p className="text-gray-600">View all your payment transactions</p>
                </div>

                {/* Gateway Filter */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedGateway('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                selectedGateway === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            All Gateways
                        </button>
                        {availableGateways.map((gateway) => (
                            <button
                                key={gateway.id}
                                onClick={() => setSelectedGateway(gateway.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center ${
                                    selectedGateway === gateway.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className="mr-2">{gateway.icon}</span>
                                {gateway.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {payments.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="text-gray-400 text-6xl mb-4">📄</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No payments found</h3>
                            <p className="text-gray-500">
                                {selectedGateway === 'all' 
                                    ? 'You haven\'t made any payments yet.'
                                    : `No payments found for ${getGatewayName(selectedGateway)}.`
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Gateway
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {payment.id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-xl mr-2">
                                                        {getGatewayIcon(payment.gateway)}
                                                    </span>
                                                    <span className="text-sm text-gray-900">
                                                        {getGatewayName(payment.gateway)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {formatAmount(payment.amount, payment.currency)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(payment.created)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Summary */}
                {payments.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Payments</p>
                                    <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <span className="text-2xl">✅</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Successful</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {payments.filter(p => p.status === 'succeeded' || p.status === 'success' || p.status === 'completed').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <span className="text-2xl">💳</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatAmount(
                                            payments.reduce((sum, p) => sum + p.amount, 0),
                                            'usd'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory; 