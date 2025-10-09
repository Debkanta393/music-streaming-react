import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserSlice } from '../create-slice/auth-slice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("In frontend")
    const userData = {
      email, password
    }

    const response = dispatch(loginUserSlice(userData))
    console.log(response)
    if (response) {
      navigate("/")
    }
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
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-1 tracking-tight">Music Stream</h2>
          <p className="text-gray-500 text-sm font-medium">Stream your favorite tunes. Feel the beat.</p>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200 tracking-wide text-lg"
          >
            Login
          </button>
        </form>
        {/* Divider */}
        <div className="text-sm text-center text-gray-400">— or continue with —</div>
        {/* Social Buttons */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
            <span role="img" aria-label="google">🔵</span> Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            <span role="img" aria-label="facebook">📘</span> Facebook
          </button>
        </div>
        {/* Signup Link */}
        <div className="text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-semibold">
            Sign up
          </Link>
        </div>
        <div className="text-center text-gray-600 text-sm">
          <Link to="/forgot-password" className="text-indigo-600 hover:underline font-semibold">
            Forgot Password?
          </Link>
        </div>
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