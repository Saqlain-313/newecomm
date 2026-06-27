import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = "http://localhost:5021/api/auth";


//    For Login //

export const register = createAsyncThunk(
    "auth/register",
    async ({ name, email, password, }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API}/register`, {
                name,
                email,
                password,
            },
                {
                    withCredentials: true,
                },

            );

            return response.data;
        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message || "Something Went Wrong"
            );
        }
    }
);

// For Login //

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${API}/login`,
                { email, password },
                { withCredentials: true }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Admin Not Logged In"
            );
        }
    }
);

// Get Profile //

export const getProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/me`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "User not found"
            );
        }
    }
);

// Logout //

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/logout`,
                {
                    withCredentials: true,
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Admin Not Logout"
            );
        }
    }
);

// InitialState //

const initialState = {
    loading: true,
    error: null,
    user: null,
    isAuthenticated: false,
};

//  For Slice //

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

    },

    // Start extraReducers //

    extraReducers: (builder) => {
        builder

            // extraReducers for Register //

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // extraReducers for Login //

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
                state.user = action.payload.admin;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // extraReducers for getProfile //

            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.admin;
                state.error = null;
            })

            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // extraReducers for Logout

            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })

            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

export default authSlice.reducer