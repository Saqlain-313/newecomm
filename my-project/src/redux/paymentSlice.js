// paymentSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/payment";

// ===================== CREATE ORDER =====================

export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/create-order`,
        orderData, // Send the order data
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// ===================== VERIFY PAYMENT =====================

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/verify`,
        paymentData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

// ===================== GET MY PAYMENTS =====================

export const getMyPayments = createAsyncThunk(
  "payment/getMyPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/my-payments`,
        {
          withCredentials: true,
        }
      );

      return response.data.payments;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

// ===================== GET PAYMENT BY ID =====================

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/${id}`,
        {
          withCredentials: true,
        }
      );

      return response.data.payment;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment not found"
      );
    }
  }
);

// ===================== INITIAL STATE =====================

const initialState = {
  loading: false,
  error: null,
  order: null,
  payment: null,
  payments: [],
  razorpayKey: "",
};

// ===================== SLICE =====================

const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    clearPayment: (state) => {
      state.order = null;
      state.payment = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ================= CREATE ORDER =================
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.payment = action.payload.payment;
        state.razorpayKey = action.payload.key;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= VERIFY PAYMENT =================
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload.payment;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= GET MY PAYMENTS =================
      .addCase(getMyPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(getMyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= GET PAYMENT BY ID =================
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;