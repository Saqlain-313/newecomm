import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = "http://localhost:5021/api/category";

            // GetAll Categories //

export const getAllCategories = createAsyncThunk(
    "category/getAllCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/all`);
            return response.data.categories
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

                // Get CategoryBy Id //

export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API}/${id}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Category not found"
            );
        }
    }
);

                // InitialState //

const initialState = {
    loading: false,
    error: null,
    categories: [],
    category: null,
    success: false,
};

                // Slice Created //

export const categorySlice = createSlice({
    name: "category",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder

                    // extraReducers for GetAll Categories

         .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })

            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

             // extraReducers for GetCategory By id

            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload.category;
            })

            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default categorySlice.reducer;