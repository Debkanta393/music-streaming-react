import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSettings = () => {
    const [availableGateways, setAvailableGateways] = useState([]);
    const [userPreferences, setUserPreferences] = useState({
        defaultGateway: 'stripe',
        preferredCurrency: 'USD',
        savePaymentMethods: true,
        autoRenewal: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        fetchAvailableGateways();
        fetchUserPreferences();
    }, []);

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

    const fetchUserPreferences = async () => {
        try {
            // In a real app, you'd fetch user preferences from the backend
            // For now, we'll use localStorage or default values
            const savedPreferences = localStorage.getItem('paymentPreferences');
            if (savedPreferences) {
                setUserPreferences(JSON.parse(savedPreferences));
            }
        } catch (error) {
            console.error('Error fetching user preferences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreferenceChange = (key, value) => {
        setUserPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const savePreferences = async () => {
        try {
            setSaving(true);
            
            // In a real app, you'd save to the backend
            localStorage.setItem('paymentPreferences', JSON.stringify(userPreferences));
            
            toast.success('Payment preferences saved successfully!');
        } catch (error) {
            console.error('Error saving preferences:', error);
            toast.error('Failed to save preferences');
        } finally {
            setSaving(false);
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

    const getGatewayDescription = (gateway) => {
        switch (gateway) {
            case 'stripe':
                return 'Credit/Debit Cards, Apple Pay, Google Pay';
            case 'paypal':
                return 'PayPal Account, Credit Cards';
            case 'razorpay':
                return 'UPI, Cards, Net Banking, Wallets';
            default:
                return 'Multiple payment methods';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading payment settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Settings</h1>
                    <p className="text-gray-600">Manage your payment preferences and gateway settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Default Payment Gateway */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Default Payment Gateway</h2>
                        <p className="text-gray-600 mb-4">Choose your preferred payment method for faster checkout</p>
                        
                        <div className="space-y-3">
                            {availableGateways.map((gateway) => (
                                <label key={gateway.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200">
                                    <input
                                        type="radio"
                                        name="defaultGateway"
                                        value={gateway.id}
                                        checked={userPreferences.defaultGateway === gateway.id}
                                        onChange={(e) => handlePreferenceChange('defaultGateway', e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <span className="text-2xl mr-3">{gateway.icon}</span>
                                        <div>
                                            <div className="font-medium text-gray-900">{gateway.name}</div>
                                            <div className="text-sm text-gray-500">{getGatewayDescription(gateway.id)}</div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Currency Preferences */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Currency Preferences</h2>
                        <p className="text-gray-600 mb-4">Select your preferred currency for payments</p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Currency
                                </label>
                                <select
                                    value={userPreferences.preferredCurrency}
                                    onChange={(e) => handlePreferenceChange('preferredCurrency', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="INR">INR - Indian Rupee</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                </select>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <span className="text-blue-600 text-lg mr-2">ℹ️</span>
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium">Currency Conversion</p>
                                        <p>Payments will be automatically converted to your preferred currency when possible.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Security */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Security</h2>
                        <p className="text-gray-600 mb-4">Manage your payment security preferences</p>
                        
                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={userPreferences.savePaymentMethods}
                                    onChange={(e) => handlePreferenceChange('savePaymentMethods', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    Save payment methods for faster checkout
                                </span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={userPreferences.autoRenewal}
                                    onChange={(e) => handlePreferenceChange('autoRenewal', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-3 text-sm font-medium text-gray-700">
                                    Enable automatic subscription renewal
                                </span>
                            </label>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <span className="text-yellow-600 text-lg mr-2">🔒</span>
                                    <div className="text-sm text-yellow-800">
                                        <p className="font-medium">Security Notice</p>
                                        <p>All payment information is encrypted and securely stored. We never store your full card details.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gateway Status */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Gateway Status</h2>
                        <p className="text-gray-600 mb-4">Current status of available payment gateways</p>
                        
                        <div className="space-y-3">
                            {availableGateways.map((gateway) => (
                                <div key={gateway.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center">
                                        <span className="text-xl mr-3">{gateway.icon}</span>
                                        <div>
                                            <div className="font-medium text-gray-900">{gateway.name}</div>
                                            <div className="text-sm text-gray-500">{gateway.description}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-green-600 font-medium">Active</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <span className="text-gray-600 text-lg mr-2">📊</span>
                                <div className="text-sm text-gray-700">
                                    <p className="font-medium">Gateway Performance</p>
                                    <p>All gateways are operating normally with 99.9% uptime.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={savePreferences}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save Preferences'}
                    </button>
                </div>

                {/* Additional Information */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Supported Payment Methods</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Credit and Debit Cards (Visa, Mastercard, American Express)</li>
                                <li>• Digital Wallets (PayPal, Apple Pay, Google Pay)</li>
                                <li>• Bank Transfers (UPI, Net Banking)</li>
                                <li>• Local Payment Methods (varies by region)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Security Features</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• PCI DSS Level 1 Compliance</li>
                                <li>• End-to-end encryption</li>
                                <li>• Fraud detection and prevention</li>
                                <li>• Secure tokenization</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;
