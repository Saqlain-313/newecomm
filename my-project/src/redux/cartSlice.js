import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/cart";

// Add To Cart

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API}/add`,
                cartData,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Item not added to cart"
            );
        }
    }
);

// For GetCart //

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to load cart"
            );
        }
    }
);

// For Deleter Cart //

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API}/remove/${id}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product not Deleted"
            );
        }
    }
);

// For clear all Cart Items //

export const clearAllCart = createAsyncThunk(
    "cart/clearAllCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API}/clear`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to clear cart"
            );
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        increaseQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item._id === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item._id === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder

            // Add To Cart

            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                const cartData =
                    action.payload?.cart ||
                    action.payload?.data?.cart ||
                    action.payload;

                state.cartItems = Array.isArray(cartData) ? cartData : [];
            })

            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // extraReducers for get cart 

            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;

                const cartData = action.payload?.cart || action.payload;

                state.cartItems = Array.isArray(cartData) ? cartData : [];
            })

            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ExtraReducer for Cart //

            .addCase(deleteCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(
                    (item) => item._id !== action.meta.arg
                );
            })

            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // extrareducer for clear all Cart //

            .addCase(clearAllCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(clearAllCart.fulfilled, (state) => {
                state.loading = false;
                state.cartItems = [];
            })

            .addCase(clearAllCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export const {
    increaseQty,
    decreaseQty,
    removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;