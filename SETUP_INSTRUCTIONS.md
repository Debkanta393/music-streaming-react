# Setup Instructions for Forgot Password and Payment Gateway

## Backend Setup

### 1. Environment Variables
Create a `.env` file in the `music-streaming_node` directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/music_streaming

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 2. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

### 3. Stripe Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Use test keys for development:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

### 4. Install Dependencies
```bash
cd music-streaming_node
npm install
```

## Frontend Setup

### 1. Environment Variables
Create a `.env` file in the `music-streaming_react` directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 2. Install Dependencies
```bash
cd music-streaming_react
npm install
```

## Running the Application

### 1. Start Backend
```bash
cd music-streaming_node
npm start
```

### 2. Start Frontend
```bash
cd music-streaming_react
npm run dev
```

## Features Implemented

### Forgot Password Flow
1. User enters email on `/forgot-password` page
2. System sends reset email with secure token
3. User clicks link in email to go to `/reset-password?token=...`
4. User enters new password
5. Password is updated and user can login

### Payment Gateway
1. **Cart Integration**: Checkout button in cart redirects to payment
2. **Stripe Integration**: Secure payment processing with Stripe
3. **Payment History**: View all past payments in profile
4. **Order Management**: Cart clears after successful payment

### Security Features
- JWT token authentication
- Password hashing with bcrypt
- Secure email reset tokens with expiration
- Stripe's secure payment processing
- CORS configuration for security

## API Endpoints

### Authentication
- `POST /api/auth/forgot-password` - Send reset email
- `POST /api/auth/reset-password` - Reset password with token

### Payments
- `POST /api/payment/create-payment-intent` - Create payment intent
- `POST /api/payment/confirm-payment` - Confirm payment
- `GET /api/payment/payment-history` - Get payment history
- `POST /api/payment/create-subscription` - Create subscription
- `POST /api/payment/cancel-subscription` - Cancel subscription

## Testing

### Test Credit Cards (Stripe Test Mode)
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Requires Authentication**: `4000 0025 0000 3155`

### Email Testing
- Use a real email address for testing password reset
- Check spam folder if email doesn't arrive

## Troubleshooting

### Common Issues
1. **Email not sending**: Check Gmail app password and 2FA settings
2. **Payment failing**: Verify Stripe keys are correct
3. **CORS errors**: Ensure frontend URL is correct in backend CORS config
4. **Token expired**: Reset tokens expire after 10 minutes

### Debug Mode
- Check browser console for frontend errors
- Check server logs for backend errors
- Verify all environment variables are set correctly 