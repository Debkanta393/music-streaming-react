import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UPLOAD_PRODUCT, GET_ALL_PRODUCT, PRODUCT_BY_ID, UPDATE_PRODUCT, DELETE_PRODUCT } from "../apis/apis"
import { createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    error: null,
    loading: false,
    product: null,
    token: null
}

export const uploadProduct = createAsyncThunk(
    UPLOAD_PRODUCT, async (productData, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${UPLOAD_PRODUCT}`, {
                method: "POST",
                body: productData,
                credentials: 'include',
            })
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getAllProduct = createAsyncThunk(
    GET_ALL_PRODUCT, async (userId, { rejectWithValue }) => {
        try {
            console.log(userId)
            const response = await axios.get(`http://localhost:5000/api/${GET_ALL_PRODUCT}/${userId}`)
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getProductById = createAsyncThunk(
    PRODUCT_BY_ID,
    async (id, { rejectWithValue }) => {
        console.log("Get product by Id called")
        console.log(id)
        try {
            const response = await axios.get(`http://localhost:5000/api/${PRODUCT_BY_ID}/${id}`);
            return response.data; // ✅ only return the data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    UPDATE_PRODUCT,
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("proName", data.name);
            formData.append("price", data.price);
            formData.append("items", data.item);
            formData.append("proDes", data.description);
            if (data.image) formData.append("image", data.image);
            formData.append("color", data.color);

            const response = await fetch(`http://localhost:5000/api/${UPDATE_PRODUCT}/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            })
            console.log(response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const deleteProduct = createAsyncThunk(
    DELETE_PRODUCT, async (proId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${DELETE_PRODUCT}/${proId}`, {
                method: "DELETE",
                credentials: "include"
            });
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadProduct.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(uploadProduct.fulfilled, (state, action) => {
                state.product = action.payload.data
                state.error = null
                state.loading = false
            })
            .addCase(uploadProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.product = action.payload.data
                state.error = null
                state.loading = false
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
        builder
            .addCase(getProductById.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.product = action.payload.data
                state.error = null
                state.loading = false
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.product = action.payload.data
                state.error = null
                state.loading = false
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export default productSlice.reducer