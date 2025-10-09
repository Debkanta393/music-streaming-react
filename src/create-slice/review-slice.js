import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_REVIEWS, ADD_REVIEWS } from "../apis/apis";
import axios from "axios";

const initialState = {
    reviews: null,
    error: null,
    isLoading: false,

}
const baseURL = import.meta.env.VITE_API_URL

export const getAllReviews = createAsyncThunk(
    GET_REVIEWS, async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/${GET_REVIEWS}/${id}`)
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const addReviews = createAsyncThunk(
    ADD_REVIEWS, async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}/${ADD_REVIEWS}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // ✅ very important
                },
                body: JSON.stringify({
                    rating: data.rating,
                    comment: data.comment,
                }),
                credentials: "include"
            })
            return response

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllReviews.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getAllReviews.fulfilled, (state, action) => {
                state.error = null
                state.reviews = action.payload
                state.isLoading = false
            })
            .addCase(getAllReviews.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
        builder
            .addCase(addReviews.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addReviews.fulfilled, (state, action) => {
                state.error = null
                state.reviews = action.payload
                state.isLoading = false
            })
            .addCase(addReviews.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export default reviewSlice.reducer