import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_QNA, ADD_QNA } from "../apis/apis";
import axios from "axios";

const initialState = {
    qna: null,
    error: null,
    isLoading: false,

}
const baseURL = import.meta.env.VITE_API_URL

export const getAllQNA = createAsyncThunk(
    GET_QNA, async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${baseURL}/${GET_QNA}/${id}`)
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const addQNA = createAsyncThunk(
    ADD_QNA, async ({ id, question }, { rejectWithValue }) => {
        console.log(id, question)
        try {
            const response = await fetch(`${baseURL}/${ADD_QNA}/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // ✅ very important
                },
                body: JSON.stringify({question: question}),                  
                credentials: "include"
            })
            console.log(response)
            return response

        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)



const qnaSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllQNA.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getAllQNA.fulfilled, (state, action) => {
                state.error = null
                state.reviews = action.payload
                state.isLoading = false
            })
            .addCase(getAllQNA.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
        builder
            .addCase(addQNA.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addQNA.fulfilled, (state, action) => {
                state.error = null
                state.reviews = action.payload
                state.isLoading = false
            })
            .addCase(addQNA.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export default qnaSlice.reducer