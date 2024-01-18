import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const api = "https://dummyjson.com/products?limit=0"


export const fetchAll = createAsyncThunk('fetchAll', async () => {
    const response = await axios.get(api)
    return response.data
})

export const fetchData = createSlice({
    name: "data",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAll.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true
        });
    }
})

// export const { fetchAlldata } = fetchData.actions

export default fetchData.reducer