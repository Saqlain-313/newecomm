import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/wishlist";

// ADD
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API}/add`,
                productData,
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add wishlist"
            );
        }
    }
);

// GET
export const getWishlist = createAsyncThunk(
    "wishlist/getWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch wishlist"
            );
        }
    }
);

// REMOVE
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API}/remove/${id}`,
                { withCredentials: true }
            );

            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove wishlist"
            );
        }
    }
);

// Check Wishlish //

export const checkWishlist = createAsyncThunk(
    "wishlist/checkWishlist",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API}/check/${productId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to check wishlist"
            );
        }
    }
);

// RemoveWishLish By Product // 

export const removeWishlistByProduct = createAsyncThunk(
    "wishlist/removeWishlistByProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API}/remove-product/${productId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove wishlist item"
            );
        }
    }
);

const initialState = {
    wishlistItems: [],
    loading: false,
    error: null,
    inWishlist: false,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            // GET
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = action.payload.wishlist;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // ADD
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;

                state.wishlistItems.unshift(
                    action.payload.wishlist
                );
            })

            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // REMOVE
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlistItems = state.wishlistItems.filter(
                    (item) => item._id !== action.payload.id
                );
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // extrareducer for checkWishlisht //

            .addCase(checkWishlist.pending, (state) => {
                state.loading = true;
            })

            .addCase(checkWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.inWishlist = action.payload.inWishlist;
            })

            .addCase(checkWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //    extraReducers for removeWishlistByProduct //

            .addCase(removeWishlistByProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(removeWishlistByProduct.fulfilled, (state, action) => {
                state.loading = false;

                state.wishlistItems = state.wishlistItems.filter(
                    item => item.productId._id !== action.meta.arg
                );
            })

            .addCase(removeWishlistByProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default wishlistSlice.reducer;