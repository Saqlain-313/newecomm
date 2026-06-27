import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/product";

// Get All Product //

export const getAllProduct = createAsyncThunk(
    "product/getAllProduct",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product Not Found"
            );
        }
    }
);

// Get Single Product by Id //

export const getSingleProduct = createAsyncThunk(
    "product/getSingleProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/${id}`,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Product Not Fount"
            )
        }
    }
)

// Get Product By Category  //

export const getProductByCategory = createAsyncThunk(
    "product/getProductByCategory",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API}/category/${categoryId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data.products; // 👈 only products
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Products not found"
            );
        }
    }
);

// Get Product By SubCategory //

export const getProductsBySubCategory = createAsyncThunk(
  "product/getProductsBySubCategory",
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API}/subcategory/${subCategoryId}`,
        {
          withCredentials: true,
        }
      );

      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Products not found"
      );
    }
  }
);

// InitialState //

const initialState = {
    loading: false,
    error: null,
    allProducts: [],
    subCategoryProducts: [],
    categoryProducts: [],
    product: null,
}

// Create Slice //

export const productSlice = createSlice({
    name: "product",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder

            // Extra Reducer for Get All Product //

            .addCase(getAllProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products; // adjust according to API response
                state.success = action.payload.message;
            })

            .addCase(getAllProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Extra Reducer for Get Single Product //

            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload.product;
            })

            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Extra Reducer for getProduct By Category //

            .addCase(getProductByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(getProductByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // extraReducers for getProduct By SubCategory //

            .addCase(getProductsBySubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // GET BY SUBCATEGORY - SUCCESS
            .addCase(getProductsBySubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload; // IMPORTANT
            })

            // GET BY SUBCATEGORY - ERROR
            .addCase(getProductsBySubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;