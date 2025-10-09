import axios from 'axios';

// Payment Gateway Configuration
export const PAYMENT_GATEWAYS = {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    RAZORPAY: 'razorpay'
};

// Currency Configuration
export const SUPPORTED_CURRENCIES = {
    USD: { symbol: '$', name: 'US Dollar', rate: 1 },
    EUR: { symbol: '€', name: 'Euro', rate: 0.85 },
    GBP: { symbol: '£', name: 'British Pound', rate: 0.73 },
    INR: { symbol: '₹', name: 'Indian Rupee', rate: 83 },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.35 },
    AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.52 }
};

// Gateway-specific configurations
export const GATEWAY_CONFIGS = {
    [PAYMENT_GATEWAYS.STRIPE]: {
        name: 'Stripe',
        icon: '💳',
        description: 'Credit/Debit Cards',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        features: ['Apple Pay', 'Google Pay', '3D Secure', 'Fraud Protection'],
        processingTime: 'Instant',
        fees: '2.9% + 30¢ per transaction'
    },
    [PAYMENT_GATEWAYS.PAYPAL]: {
        name: 'PayPal',
        icon: '🔵',
        description: 'PayPal Account',
        supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
        features: ['Buyer Protection', 'No Account Required', 'International'],
        processingTime: 'Instant',
        fees: '2.9% + fixed fee per transaction'
    },
    [PAYMENT_GATEWAYS.RAZORPAY]: {
        name: 'Razorpay',
        icon: '🇮🇳',
        description: 'UPI, Cards, Net Banking',
        supportedCurrencies: ['INR'],
        features: ['UPI', 'Net Banking', 'Wallets', 'EMI'],
        processingTime: 'Instant',
        fees: '2% per transaction'
    }
};

// Payment Utility Functions
export class PaymentUtils {
    // Format currency amount
    static formatCurrency(amount, currency = 'USD') {
        const currencyConfig = SUPPORTED_CURRENCIES[currency];
        if (!currencyConfig) {
            return `$${amount.toFixed(2)}`;
        }
        return `${currencyConfig.symbol}${amount.toFixed(2)}`;
    }

    // Convert currency
    static convertCurrency(amount, fromCurrency, toCurrency) {
        const fromRate = SUPPORTED_CURRENCIES[fromCurrency]?.rate || 1;
        const toRate = SUPPORTED_CURRENCIES[toCurrency]?.rate || 1;
        return (amount / fromRate) * toRate;
    }

    // Get gateway configuration
    static getGatewayConfig(gateway) {
        return GATEWAY_CONFIGS[gateway] || null;
    }

    // Check if currency is supported by gateway
    static isCurrencySupported(gateway, currency) {
        const config = this.getGatewayConfig(gateway);
        return config?.supportedCurrencies.includes(currency) || false;
    }

    // Get best gateway for currency
    static getBestGatewayForCurrency(currency) {
        for (const [gateway, config] of Object.entries(GATEWAY_CONFIGS)) {
            if (config.supportedCurrencies.includes(currency)) {
                return gateway;
            }
        }
        return PAYMENT_GATEWAYS.STRIPE; // Default fallback
    }

    // Validate payment amount
    static validateAmount(amount, currency = 'USD') {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return { valid: false, error: 'Invalid amount' };
        }

        if (amount <= 0) {
            return { valid: false, error: 'Amount must be greater than 0' };
        }

        // Currency-specific minimum amounts
        const minimumAmounts = {
            USD: 0.50,
            EUR: 0.50,
            GBP: 0.50,
            INR: 1,
            CAD: 0.50,
            AUD: 0.50
        };

        const minimum = minimumAmounts[currency] || 0.50;
        if (amount < minimum) {
            return { 
                valid: false, 
                error: `Minimum amount is ${this.formatCurrency(minimum, currency)}` 
            };
        }

        return { valid: true };
    }

    // Create payment intent
    static async createPaymentIntent(amount, currency, gateway, metadata = {}) {
        try {
            const validation = this.validateAmount(amount, currency);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            const response = await axios.post('http://localhost:5000/api/payment/create-payment-intent', {
                amount,
                currency,
                gateway,
                metadata
            }, {
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            console.error('Error creating payment intent:', error);
            throw error;
        }
    }

    // Confirm payment
    static async confirmPayment(paymentData, gateway) {
        try {
            const response = await axios.post('http://localhost:5000/api/payment/confirm-payment', {
                ...paymentData,
                gateway
            }, {
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            console.error('Error confirming payment:', error);
            throw error;
        }
    }

    // Get available gateways
    static async getAvailableGateways() {
        try {
            const response = await axios.get('http://localhost:5000/api/payment/available-gateways', {
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching available gateways:', error);
            throw error;
        }
    }

    // Get payment history
    static async getPaymentHistory(gateway = null) {
        try {
            const params = gateway ? { gateway } : {};
            const response = await axios.get('http://localhost:5000/api/payment/payment-history', {
                params,
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching payment history:', error);
            throw error;
        }
    }

    // Calculate processing fees
    static calculateFees(amount, gateway, currency = 'USD') {
        const config = this.getGatewayConfig(gateway);
        if (!config) return 0;

        // Simplified fee calculation (in real app, use actual fee structure)
        switch (gateway) {
            case PAYMENT_GATEWAYS.STRIPE:
                return Math.max(0.30, amount * 0.029);
            case PAYMENT_GATEWAYS.PAYPAL:
                return Math.max(0.30, amount * 0.029);
            case PAYMENT_GATEWAYS.RAZORPAY:
                return amount * 0.02;
            default:
                return 0;
        }
    }

    // Get payment status color
    static getStatusColor(status) {
        switch (status?.toLowerCase()) {
            case 'succeeded':
            case 'success':
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'pending':
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            case 'failed':
            case 'canceled':
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }

    // Format payment date
    static formatPaymentDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Generate payment receipt
    static generateReceipt(payment) {
        return {
            receiptId: `RCP-${Date.now()}`,
            paymentId: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            gateway: payment.gateway,
            status: payment.status,
            date: payment.created,
            timestamp: Date.now()
        };
    }

    // Validate card number (Luhn algorithm)
    static validateCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        if (!/^\d+$/.test(cleaned)) return false;

        let sum = 0;
        let isEven = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    // Get card type from number
    static getCardType(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        
        if (/^4/.test(cleaned)) return 'visa';
        if (/^5[1-5]/.test(cleaned)) return 'mastercard';
        if (/^3[47]/.test(cleaned)) return 'amex';
        if (/^6/.test(cleaned)) return 'discover';
        
        return 'unknown';
    }

    // Mask sensitive data
    static maskSensitiveData(data, type) {
        switch (type) {
            case 'card':
                return `**** **** **** ${data.slice(-4)}`;
            case 'email':
                const [local, domain] = data.split('@');
                return `${local.slice(0, 2)}***@${domain}`;
            case 'phone':
                return `***-***-${data.slice(-4)}`;
            default:
                return data;
        }
    }

    // Check if payment is in test mode
    static isTestMode() {
        return process.env.NODE_ENV === 'development' || 
               window.location.hostname === 'localhost' ||
               window.location.hostname === '127.0.0.1';
    }

    // Get test card numbers for development
    static getTestCardNumbers() {
        return {
            visa: '4242424242424242',
            mastercard: '5555555555554444',
            amex: '378282246310005',
            discover: '6011111111111117'
        };
    }
}

// Export default instance
export default PaymentUtils;
