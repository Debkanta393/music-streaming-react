import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {CREATE_ALBUM, GET_ALBUM_SONGS, GET_ALBUM} from "../apis/apis"

const initialState={
    data:[],
    error: null,
    isLoading: false,
    token: null
}
const baseURL=import.meta.env.VITE_API_URL


export const createAlbum=createAsyncThunk(
    "album/add-album", async(data, {rejectWithValue})=>{
        try {
            const response=await fetch(`${baseURL}/${CREATE_ALBUM}`,{
                method: "POST",
                body: data,
                credentials: 'include',
            })
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.data)
        }
    }
)

export const getAlbums=createAsyncThunk(
    GET_ALBUM, async(_, {rejectWithValue})=>{
        try {
            const response=await axios.get(`${baseURL}/${GET_ALBUM}`);
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.data)
        }
    }
)

export const getAlbumSongs=createAsyncThunk(
    GET_ALBUM_SONGS, async(id, {rejectWithValue})=>{
        try {
            const response=await axios.get(`${baseURL}/${GET_ALBUM_SONGS}/${id}`);
            console.log(response)
            return response.data

        } catch (error) {
            return rejectWithValue(error.data)
        }
    }
)


const albumSlice=createSlice({
    name: "album",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(createAlbum.pending, (state)=>{
            state.isLoading=true,
            state.error=null,
            state.data=[]
        })
        .addCase(createAlbum.fulfilled, (state, action)=>{
            state.isLoading=false,
            state.data=action.payload,
            state.error=null
        })
        .addCase(createAlbum.rejected, (state, action)=>{
            state.isLoading=false,
            state.error=action.payload.message
        })
        builder
        .addCase(getAlbums.pending, (state)=>{
            state.isLoading=true,
            state.error=null
        })
        .addCase(getAlbums.fulfilled, (state, action)=>{
            state.isLoading=false,
            state.data=action.payload
        })
        .addCase(getAlbums.rejected, (state, action)=>{
            state.isLoading=false,
            state.error=action.payload.message
        })
        builder
        .addCase(getAlbumSongs.pending, (state)=>{
            state.isLoading=true,
            state.error=null
        })
        .addCase(getAlbumSongs.fulfilled, (state, action)=>{
            state.isLoading=false,
            state.data=action.payload.data
        })
        .addCase(getAlbumSongs.rejected, (state, action)=>{
            state.isLoading=false
            state.error=action.payload
        })
    }
})

export default albumSlice.reducer