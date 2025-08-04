import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UPLOAD_SONG, UPDATE_SONG, GET_ALL_SONG, SONG_BY_ID, SONG_BY_NAME, DELETE_SONG, AUTHOR_ALL_SONG, SONG_BY_TITLE } from "../apis/apis"
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    song: null,
    token: null
}


export const uploadSong = createAsyncThunk(
    UPLOAD_SONG,
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Uploading song", userData)

            const formData = new FormData();
            formData.append("title", userData.title);
            formData.append("genre", userData.genre);
            formData.append("duration", userData.duration);
            formData.append("description", userData.description);
            formData.append("image", userData.coverImage); // userData.image must be a File
            formData.append("audio", userData.audioFile);

            const response = await fetch(`http://localhost:5000/api/${UPLOAD_SONG}`, {
                method: "POST",
                body: formData,
                credentials: 'include',
            })
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateSong = createAsyncThunk(
    UPDATE_SONG,
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(data)
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("genre", data.genre);
            formData.append("description", data.description);
            formData.append("duration", data.duration);
            if (data.image) formData.append("image", data.image);
            if (data.audio) formData.append("audio", data.audio);

            // const response = await axios.put(`http://localhost:5000/api/${UPDATE_SONG}/${id}`, data, {credentials: "include"})
            const response = await fetch(`http://localhost:5000/api/${UPDATE_SONG}/${id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            })
            console.log(response)
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllSong = createAsyncThunk(
    GET_ALL_SONG,
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${GET_ALL_SONG}`)
            console.log(response.data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getSongByName = createAsyncThunk(
    SONG_BY_NAME,
    async (title, { rejectWithValue }) => {
        try {
            console.log(title)
            const response = await axios.get(`http://localhost:5000/api/${SONG_BY_NAME}/${title}`)
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const searchSongsByTitle = createAsyncThunk(
    "songs/search",
    async (partialTitle, { rejectWithValue }) => {
        try {
            const encoded = encodeURIComponent(partialTitle);
            const response = await axios.get(`http://localhost:5000/api/${SONG_BY_TITLE}/${encodeURIComponent(partialTitle)}`);
            console.log(response)
            return response.data; // Array of song objects
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const getSongById = createAsyncThunk(
    SONG_BY_ID,
    // async ({ category, songId }, { rejectWithValue }) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/api/${SONG_BY_ID}/${songId}`)
    //         console.log(response)
    //         return response.data
    //     } catch (error) {
    //         return rejectWithValue(error.response.data)
    //     }
    // }
    async ({ category, songId }, { rejectWithValue }) => {
        try {
            const res = await fetch(`http://localhost:5000/api/${SONG_BY_ID}/${songId}`);
            const data = await res.json();

            if (!res.ok) return rejectWithValue(data.message || 'Failed to fetch song');

            return data; // MUST include { song, artistName } here
        } catch (err) {
            return rejectWithValue(err.message || 'Network error');
        }
    }
)


export const getAllSongOfArtist = createAsyncThunk(
    AUTHOR_ALL_SONG, async (authorId, { rejectWithValue }) => {
        try {
            console.log(authorId)
            const response = await axios.get(`http://localhost:5000/api/${AUTHOR_ALL_SONG}/${authorId}`)
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


// export const getSongById = createAsyncThunk(
//     SONG_BY_ID, // e.g. "songs/getById"
//     async ({ category, songId }, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/${SONG_BY_ID}/${songId}`);
//         console.log(response.data); // confirm payload
//         return response.data;
//       } catch (error) {
//         return rejectWithValue(error.response?.data || 'Error fetching song');
//       }
//     }
//   );
export const deleteSong = createAsyncThunk(
    DELETE_SONG,
    async (songId, { rejectWithValue }) => {
        try {
            // const response = await axios.delete(`http://localhost:5000/api/${DELETE_SONG}/${songId}`, {
            //     credentials: 'include'
            // })
            const response = await fetch(`http://localhost:5000/api/${DELETE_SONG}/${songId}`, {
                method: "DELETE",
                credentials: 'include',
            })
            console.log(response)
            return response
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadSong.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(uploadSong.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(uploadSong.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(updateSong.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(updateSong.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(updateSong.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(getAllSong.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(getAllSong.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(getAllSong.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(getAllSongOfArtist.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(getAllSongOfArtist.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(getAllSongOfArtist.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(getSongByName.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(getSongByName.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(getSongByName.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(searchSongsByTitle.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(searchSongsByTitle.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(searchSongsByTitle.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(getSongById.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(getSongById.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(getSongById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(deleteSong.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(deleteSong.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(deleteSong.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
}
)

export default songSlice.reducer