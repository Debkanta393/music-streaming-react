import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { resetPassword } from '../create-slice/auth-slice';
import { useDispatch } from 'react-redux';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    console.log(token)
    const dispatch=useDispatch()


    useEffect(() => {
        if (!token) {
            toast.error('Invalid reset link');
            navigate('/forgot-password');
        } else {
            setTokenValid(true);
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        
        try {
            const response = await dispatch(resetPassword({token, password})).unwrap()
            
            if (response.success) {
                toast.success('Password reset successfully! You can now login with your new password.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            const message = error.response?.data?.message || 'Something went wrong. Please try again.';
            console.log(error)
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    if (!tokenValid) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-indigo-200 via-blue-700 to-purple-800 overflow-hidden px-4">
            {/* Animated music notes background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%" className="absolute animate-pulse opacity-10" style={{ top: '-40px', left: '-40px' }}>
                    <text x="10%" y="20%" fontSize="120" fill="#fff">&#9835;</text>
                    <text x="70%" y="60%" fontSize="100" fill="#fff">&#119070;</text>
                    <text x="40%" y="80%" fontSize="80" fill="#fff">&#9833;</text>
                </svg>
            </div>
            
            <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-7 z-10 animate-fade-in backdrop-blur-md">
                {/* Logo and Tagline */}
                <div className="flex flex-col items-center gap-2">
                    <div className="bg-gradient-to-tr from-indigo-500 to-blue-400 rounded-full p-4 shadow-lg mb-1">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="#6366F1" />
                            <path d="M16 8V15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5V10.5C13 9.67157 12.3284 9 11.5 9C10.6716 9 10 9.67157 10 10.5V17.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-1 tracking-tight">Reset Password</h2>
                    <p className="text-gray-500 text-sm font-medium text-center">Enter your new password below</p>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 tracking-wide text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
                    >
                        Back to Login
                    </button>
                </form>
            </div>

            {/* Animated music bars bottom right */}
            <div className="absolute bottom-8 right-8 flex gap-1 z-0 opacity-60">
                <div className="w-2 h-8 bg-indigo-400 rounded animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-5 bg-blue-400 rounded animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-10 bg-purple-400 rounded animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-2 h-6 bg-indigo-300 rounded animate-bounce" style={{ animationDelay: '0.6s' }}></div>
            </div>
        </div>
    );
} 