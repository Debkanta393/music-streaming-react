import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {CREATE_PAYMENT_INTENT, CONFIRM_PAYMENT, GET_PAYMENT_HISTORY, CREATE_SUBSCRIPTION, CANCEL_SUBSCRIPTION, AVAILABLE_GETWAYS} from "../apis/apis"

// ========== Thunks ==========
export const fetchGateways = createAsyncThunk(
  AVAILABLE_GETWAYS,
  async (_, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk(
  GET_PAYMENT_HISTORY,
  async (_, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const startPayment = createAsyncThunk(
  CREATE_PAYMENT_INTENT,
  async ({ amount, currency, gateway, metadata }, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const completePayment = createAsyncThunk(
  CONFIRM_PAYMENT,
  async (payload, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const startSubscription = createAsyncThunk(
  CREATE_SUBSCRIPTION,
  async (priceId, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const stopSubscription = createAsyncThunk(
  CANCEL_SUBSCRIPTION,
  async (subscriptionId, { rejectWithValue }) => {
    try {
      
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ========== Slice ==========
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    gateways: [],
    history: [],
    currentPayment: null,
    subscription: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Gateways
      .addCase(fetchGateways.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGateways.fulfilled, (state, action) => {
        state.loading = false;
        state.gateways = action.payload;
      })
      .addCase(fetchGateways.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // History
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      // Start payment
      .addCase(startPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(startPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(startPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm payment
      .addCase(completePayment.fulfilled, (state, action) => {
        state.currentPayment = action.payload;
      })

      // Subscription
      .addCase(startSubscription.fulfilled, (state, action) => {
        state.subscription = action.payload;
      })
      .addCase(stopSubscription.fulfilled, (state, action) => {
        state.subscription = null;
      });
  },
});

export const { clearError, clearCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
