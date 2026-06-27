import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5021/api/subcategory";

// Add SubCategory //

// export const createSubCategory = createAsyncThunk(
//     "subcategory/createSubCategory",
//     async (formData, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(
//                 `${API}/`,
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 "Failed to create subcategory"
//             );
//         }
//     }
// );

// GetAllSubCategory //

export const getAllSubCategory = createAsyncThunk(
    "subCategory/getAllSubCategory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API}/`, {
                withCredentials: true,
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "All subcategories are not found"
            );
        }
    }
);

// getall category with the help of category id //

export const getAllCategoryById = createAsyncThunk(
    "subcategory/getAllCategoryById",
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API}/category/${categoryId}`,
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Category not found"
            );
        }
    }
);

// UpdateCategory //

// export const updateSubCategory = createAsyncThunk(
//     "subcategory/updateSubCategory",
//     async ({ id, formData }, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(
//                 `${API}/${id}`,
//                 formData,
//                 {
//                     withCredentials: true,
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 "Failed to update subcategory"
//             );
//         }
//     }
// );

// export const deleteSubCategory = createAsyncThunk(
//     "subcategory/deleteSubCategory",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(
//                 `${API}/${id}`,
//                 {
//                     withCredentials: true,
//                 }
//             );

//             return {
//                 id,
//                 ...response.data,
//             };
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 "Failed to delete subcategory"
//             );
//         }
//     }
// );

// InitialState //

const initialState = {
    loading: false,
    success: false,
    error: null,
    subCategories: [],
};

export const subCategorySlice = createSlice({
    name: "subCategory",
    initialState,

    reducers: {
        // resetSuccess: (state) => {
        //     state.success = false;
        // },
    },

    extraReducers: (builder) => {
        builder

            // extrareducer for create Subcateogry 

            // .addCase(createSubCategory.pending, (state) => {
            //     state.loading = true;
            //     state.success = false;
            // })

            // .addCase(createSubCategory.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.success = true;
            //     state.subCategories.push(action.payload.data);
            // })

            // .addCase(createSubCategory.rejected, (state, action) => {
            //     state.loading = false;
            //     state.success = false;
            //     state.error = action.payload;
            // })
            // GetAll Sub Categories //

            .addCase(getAllSubCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getAllSubCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories = action.payload.data;
            })

            .addCase(getAllSubCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // getAllCategoryById //

            .addCase(getAllCategoryById.pending, (state) => {
                state.loading = true;
            })

            .addCase(getAllCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories = action.payload.data;
            })

            .addCase(getAllCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // extrareducer for updateSubCategory //

            // .addCase(updateSubCategory.pending, (state) => {
            //     state.loading = true;
            //     state.success = false;
            //     state.error = null;
            // })

            // .addCase(updateSubCategory.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.success = true;

            //     state.subCategories = state.subCategories.map((item) =>
            //         item._id === action.payload.data._id
            //             ? action.payload.data
            //             : item
            //     );
            // })

            // .addCase(updateSubCategory.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })

            // Delete SubCategory //

            // .addCase(deleteSubCategory.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })

            // .addCase(deleteSubCategory.fulfilled, (state, action) => {
            //     state.loading = false;

            //     state.subCategories = state.subCategories.filter(
            //         (item) => item._id !== action.payload.id
            //     );
            // })

            // .addCase(deleteSubCategory.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
            // })


    }
})

// export const { resetSuccess } = subCategorySlice.actions;

export default subCategorySlice.reducer;
