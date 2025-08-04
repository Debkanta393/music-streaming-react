import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REGISTER_USER, LOGIN_USER, LOGOUT, FORGOT_PASSWORD, ME, UPDATE_USER } from "../apis/apis"

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
}

export const createUserSlice = createAsyncThunk(
    REGISTER_USER,
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/${REGISTER_USER}`, userData, {
                withCredentials: true,
            })
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })

export const loginUserSlice = createAsyncThunk(
    LOGIN_USER,
    async (userData, { rejectWithValue }) => {
        try {

            const response = await axios.post(`http://localhost:5000/api/${LOGIN_USER}`, userData, {
                withCredentials: true,
                credentials: 'include',
            })
            console.log(response)
            return response.data

            // const response = await fetch(`http://localhost:5000/api/${LOGIN_USER}`, {
            //     method: 'POST',
            //     credentials: 'include', // 🔑 send + receive cookies
            //     body: JSON.stringify(userData),
            // })
            // console.log(response)
            // if (response.ok) {
            //     window.location.reload(); // refresh to refetch user
            // } else {
            //     const data = await response.json();
            //     alert(data.message || 'Login failed');
            // }
            // console.log(response)
            // return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// 🔄 Fetch the current user from backend
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`http://localhost:5000/api/${ME}`, {
            method: 'GET',
            credentials: 'include', // 🔑 this sends cookies
        });
        console.log(res)
        if (!res.ok) {
            const err = await res.json();
            return rejectWithValue(err.message || 'Failed to fetch user');
        }

        return await res.json();
    } catch (err) {
        return rejectWithValue(err.message || 'Network error');
    }
});


export const updateUser = createAsyncThunk(UPDATE_USER, async ({profileData, profileImage}, { rejectWithValue }) => {
    try {
        console.log(profileData)
        console.log(profileImage)
        const formData=new FormData()
        formData.append("name", profileData.name)
        formData.append("email", profileData.email)
        formData.append("bio", profileData.bio)
        formData.append("image", profileImage)

        const response = await fetch(`http://localhost:5000/api/${UPDATE_USER}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
        console.log(response)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserSlice.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(createUserSlice.fulfilled, (state, action) => {
                state.loading = false,
                    state.error = null,
                    state.user = action.payload,
                    localStorage.setItem("token", JSON.stringify({ token: action.payload.token, expiry: now.getTime() + 24 * 60 * 60 * 1000 }))
                state.isAuthenticated = true
            })
            .addCase(createUserSlice.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
        builder
            .addCase(loginUserSlice.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(loginUserSlice.fulfilled, (state, action) => {
                const now = new Date(); // Make sure to define this
                const expiryTime = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours

                state.loading = false;
                state.error = null;
                state.user = action.payload;
                state.isAuthenticated = true;

                localStorage.setItem(
                    "token",
                    JSON.stringify({
                        token: action.payload.token,
                        expiry: expiryTime
                    })
                );
            })
            .addCase(loginUserSlice.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            builder
                .addCase(fetchMe.pending, (state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(fetchMe.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.isAuthenticated = true
                    state.status = 'succeeded';
                })
                .addCase(fetchMe.rejected, (state, action) => {
                    state.user = null;
                    state.status = 'failed';
                    state.error = action.payload;
                })
            builder
                .addCase(updateUser.pending, (state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(updateUser.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.status = 'succeeded';
                })
                .addCase(updateUser.rejected, (state, action) => {
                    state.user = null;
                    state.status = 'failed';
                    state.error = action.payload;
                })
    }

})

export default authSlice.reducer