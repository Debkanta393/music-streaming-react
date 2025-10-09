import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UPLOAD_SONG, UPDATE_SONG, GET_ALL_SONG, SONG_BY_ID, SONG_BY_NAME, DELETE_SONG, AUTHOR_ALL_SONG, SONG_BY_TITLE, UPDATE_LISTEN_COUNT, UPDATE_LIKE } from "../apis/apis"
import axios from "axios";


const initialState = {
    loading: false,
    error: null,
    song: null,
    token: null
}
const baseURL = import.meta.env.VITE_API_URL

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

            const response = await fetch(`${baseURL}/${UPLOAD_SONG}`, {
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
            const response = await fetch(`${baseURL}/${UPDATE_SONG}/${id}`, {
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
            const response = await axios.get(`${baseURL}/${GET_ALL_SONG}`)
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
            const response = await axios.get(`${baseURL}/${SONG_BY_NAME}/${title}`)
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
            const response = await axios.get(`${baseURL}/${SONG_BY_TITLE}/${encodeURIComponent(partialTitle)}`);
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
            const res = await fetch(`${baseURL}/${SONG_BY_ID}/${songId}`);
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
            const response = await axios.get(`${baseURL}/${AUTHOR_ALL_SONG}/${authorId}`)
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateSongLike = createAsyncThunk(
  UPDATE_LIKE,
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/${UPDATE_LIKE}/${id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json(); // ✅ Parse JSON
      return data; // ✅ Return it so it becomes the payload
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);




export const updateListenCount = createAsyncThunk(
    UPDATE_LISTEN_COUNT, async (id, { rejectWithValue }) => {
        try {
            console.log(id)
            const response = await axios.put(`${baseURL}/${UPDATE_LISTEN_COUNT}/${id}`)
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
            const response = await fetch(`${baseURL}/${DELETE_SONG}/${songId}`, {
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
            .addCase(updateSongLike.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(updateSongLike.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(updateSongLike.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
        builder
            .addCase(updateListenCount.pending, (state) => {
                state.error = null,
                    state.loading = true
            })
            .addCase(updateListenCount.fulfilled, (state, action) => {
                state.error = null
                state.song = action.payload
                state.loading = false
            })
            .addCase(updateListenCount.rejected, (state, action) => {
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