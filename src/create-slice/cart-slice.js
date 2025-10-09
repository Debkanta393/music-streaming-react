import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CART_ADD, CART_GET, CART_UPDATE, CART_REMOVE, CART_CLEAR, CART_COUNT } from "../apis/apis";
import { getLocalCart, setLocalCart, clearLocalCart, mergeCarts, calculateCartTotals } from "../utils/cartUtils";

const initialState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
    isAuthenticated: false
};
const baseURL=import.meta.env.VITE_API_URL


// Async thunks for authenticated users
export const addToCartAPI = createAsyncThunk(
    CART_ADD,
    async ({ productId, quantity = 1 }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseURL}/${CART_ADD}`, {
                productId,
                quantity
            }, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCartItemsAPI = createAsyncThunk(
    CART_GET,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/${CART_GET}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCartItemAPI = createAsyncThunk(
    CART_UPDATE,
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${baseURL}/${CART_UPDATE}`, {
                productId,
                quantity
            }, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeFromCartAPI = createAsyncThunk(
    CART_REMOVE,
    async (productId, { rejectWithValue }) => {
        try {
            console.log(productId)
            const response = await axios.delete(`${baseURL}/${CART_REMOVE}/${productId}`, {
                withCredentials: true
            });
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const clearCartAPI = createAsyncThunk(
    CART_CLEAR,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseURL}/${CART_CLEAR}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getCartCountAPI = createAsyncThunk(
    CART_COUNT,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/${CART_COUNT}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Initialize cart from localStorage
        initializeCart: (state) => {
            const localCart = getLocalCart();
            state.items = localCart;
            const { totalItems, totalPrice } = calculateCartTotals(localCart);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
        },

        // Add to cart (local storage for non-authenticated users)
        addToCartLocal: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            console.log(product)
            const existingItem = state.items.find(item => item._id === product._id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                const cartItem = {
                    _id: product._id,
                    proName: product.proName,
                    proDes: product.proDes,
                    price: product.price,   
                    image: product.image,
                    color: product.color,
                    quantity: quantity,
                    totalPrice: product.price * quantity,
                    artistId: product.artistId,
                    addedAt: new Date().toISOString()
                };
                state.items.push(cartItem);
            }
            
            const { totalItems, totalPrice } = calculateCartTotals(state.items);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
            
            setLocalCart(state.items);
        },

        // Update cart item quantity (local storage)
        updateCartItemLocal: (state, action) => {
            const { _id, quantity } = action.payload;
            const item = state.items.find(item => item._id === _id);
            
            if (item) {
                item.quantity = quantity;
                item.totalPrice = item.price * quantity;
                
                const { totalItems, totalPrice } = calculateCartTotals(state.items);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
                
                setLocalCart(state.items);
            }
        },

        // Remove from cart (local storage)
        removeFromCartLocal: (state, action) => {
            const productId = action.payload;
            console.log(productId)
            console.log(action)
            state.items = state.items.filter(item => item._id !== productId);
            
            const { totalItems, totalPrice } = calculateCartTotals(state.items);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
            console.log(state.items)
            setLocalCart(state.items);
        },

        // Clear cart (local storage)
        clearCartLocal: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            setLocalCart([]);
        },

        // Set authentication status
        setAuthStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },

        // Sync local cart with server cart after login
        syncCartAfterLogin: (state, action) => {
            const serverCart = action.payload;
            state.items = serverCart;
            const { totalItems, totalPrice } = calculateCartTotals(serverCart);
            state.totalItems = totalItems;
            state.totalPrice = totalPrice;
            state.isAuthenticated = true;
        },

        // Clear error
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Add to cart API
        builder
            .addCase(addToCartAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart;
                const { totalItems, totalPrice } = calculateCartTotals(action.payload.cart);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
                state.isAuthenticated = true;
            })
            .addCase(addToCartAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get cart items API
        builder
            .addCase(getCartItemsAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItemsAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart;
                const { totalItems, totalPrice } = calculateCartTotals(action.payload.cart);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
                state.isAuthenticated = true;
            })
            .addCase(getCartItemsAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update cart item API
        builder
            .addCase(updateCartItemAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart;
                const { totalItems, totalPrice } = calculateCartTotals(action.payload.cart);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
            })
            .addCase(updateCartItemAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Remove from cart API
        builder
            .addCase(removeFromCartAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCartAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.cart;
                const { totalItems, totalPrice } = calculateCartTotals(action.payload.cart);
                state.totalItems = totalItems;
                state.totalPrice = totalPrice;
            })
            .addCase(removeFromCartAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Clear cart API
        builder
            .addCase(clearCartAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartAPI.fulfilled, (state) => {
                state.loading = false;
                state.items = [];
                state.totalItems = 0;
                state.totalPrice = 0;
            })
            .addCase(clearCartAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    initializeCart,
    addToCartLocal,
    updateCartItemLocal,
    removeFromCartLocal,
    clearCartLocal,
    setAuthStatus,
    syncCartAfterLogin,
    clearError
} = cartSlice.actions;

export default cartSlice.reducer; 