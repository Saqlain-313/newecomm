import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/auth";

// Get Addresses
export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/me`, {
        withCredentials: true,
      });

      return response.data.admin.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);

// Update/Add Addresses
export const updateAddresses = createAsyncThunk(
  "address/updateAddresses",
  async (addresses, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/addresses`,
        { addresses },
        {
          withCredentials: true,
        }
      );

      return response.data.data.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update addresses"
      );
    }
  }
);

// Delete Address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API}/addresses/${addressId}`,
        {
          withCredentials: true,
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

const initialState = {
  loading: false,
  addresses: [],
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Get Addresses
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Addresses
      .addCase(updateAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(updateAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;