import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartItemsAPI,
    updateCartItemAPI,
    removeFromCartAPI,
    clearCartAPI,
    updateCartItemLocal,
    removeFromCartLocal,
    clearCartLocal,
    syncCartAfterLogin
} from '../create-slice/cart-slice';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, totalItems, totalPrice } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);
    const [updatingItem, setUpdatingItem] = useState(null);
    const [loading, setLoading] = useState(false)
    console.log(totalItems)
    console.log(isAuthenticated)
    const cart = localStorage.getItem("cart")
    // const [isAuthenticated, setIsAuthenticated]=useState(false)


    // Getting all cart items
    const [cartItems, setCartItems] = useState([])

    const handleGetCartItems = async () => {
        setLoading(true)

        // if(response.payload !== "No token provided"){
        //     setIsAuthenticated(true)
        // }
        if (isAuthenticated) {
            const response = await dispatch(getCartItemsAPI());
            console.log("Cart response", response)
            setLoading(false)
            setCartItems(response.payload.cart)
            console.log("Cart items", cartItems)
        }
        else {
            setLoading(false)
            setCartItems(JSON.parse(cart))
            console.log("Cart items", cartItems)
        }
    }

    useEffect(() => {
        handleGetCartItems()
    }, [isAuthenticated, dispatch, cart]);
    console.log(cartItems)


    // Update cart item
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setUpdatingItem(productId);
        try {
            if (isAuthenticated) {
                await dispatch(updateCartItemAPI({ productId, quantity: newQuantity })).unwrap();
            } else {
                dispatch(updateCartItemLocal({ productId, quantity: newQuantity }));
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity. Please try again.');
        } finally {
            setUpdatingItem(null);
        }
    };

    // Remove cart item
    const [removeLoader, setRemoveLoader] = useState(false)
    const handleRemoveItem = async (productId) => {
        setRemoveLoader(true)
        console.log(productId)
        try {
            if (isAuthenticated) {
                await dispatch(removeFromCartAPI(productId)).unwrap();
            } else {
                await dispatch(removeFromCartLocal(productId));
            }
            setRemoveLoader(false)
            handleGetCartItems()
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item. Please try again.');
        }
    };

    // Clear all cart items
    const handleClearCart = async () => {
        setLoading(true)
        if (window.confirm('Are you sure you want to clear your cart?')) {
            try {
                if (isAuthenticated) {
                    await dispatch(clearCartAPI()).unwrap();
                } else {
                    dispatch(clearCartLocal());
                }
                setLoading(false)
            } catch (error) {
                console.error('Error clearing cart:', error);
                alert('Failed to clear cart. Please try again.');
            }
        }
    };

    const handleCheckout = () => {
        if (!authStatus) {
            alert('Please login to proceed with checkout.');
            navigate('/login');
            return;
        }
        // Implement checkout logic here
        alert('Checkout functionality coming soon!');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex items-center justify-center">
                <div className="text-white text-xl">Loading cart...</div>
            </div>
        );
    }

    if ((cartItems?.length === 0 || cartItems == undefined) && !loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center">
                <FaShoppingCart className="text-6xl text-gray-400 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8">Add some products to get started!</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold rounded-full hover:scale-105 transition-all duration-300"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white hover:text-[#00f2fe] transition-colors"
                        >
                            <FaArrowLeft className="text-xl" />
                        </button>
                        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
                        <span className="text-gray-400">({totalItems} items)</span>
                    </div>
                    <button
                        onClick={handleClearCart}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                    >
                        <FaTrash className="text-sm" />
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold text-white mb-6">Cart Items</h2>
                            <div className="space-y-4">
                                {cartItems?.map((item) => (
                                    <div key={item.productId} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={`http://localhost:5000/${(item.image || '').replace(/\\/g, '/')}`}
                                                alt={item.proName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold truncate">{item.proName}</h3>
                                            <p className="text-gray-400 text-sm truncate">{item.proDes}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {item.color && item.color.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-4 h-4 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        {/* <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                disabled={updatingItem === item.productId}
                                                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                                            >
                                                <FaMinus className="text-xs" />
                                            </button>
                                            <span className="text-white font-semibold min-w-[2rem] text-center">
                                                {updatingItem === item._id ? '...' : item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                disabled={updatingItem === item.productId}
                                                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                                            >
                                                <FaPlus className="text-xs" />
                                            </button>
                                        </div> */}

                                        {/* Price */}
                                        <div className="text-right">
                                            <div className="text-white font-bold">${item.totalPrice}</div>
                                            <div className="text-gray-400 text-sm">${item.price} each</div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemoveItem(item._id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-2"
                                        >
                                            {removeLoader ?
                                                <div className='inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin'></div>
                                                :
                                                <FaTrash className="text-sm" />
                                            }
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 sticky top-8">
                            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="border-t border-white/20 pt-4">
                                    <div className="flex justify-between text-white font-bold text-lg">
                                        <span>Total</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-bold rounded-full hover:scale-105 transition-all duration-300 mb-4"
                            >
                                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                            </button>

                            {!isAuthenticated && (
                                <div className="text-center">
                                    <p className="text-gray-400 text-sm mb-2">
                                        Login to save your cart and checkout
                                    </p>
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-[#00f2fe] hover:text-[#4facfe] transition-colors text-sm"
                                    >
                                        Login / Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 