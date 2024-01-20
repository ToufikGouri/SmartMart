import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchAlldata = "https://dummyjson.com/products?limit=0"
const fetchAllCtg = "https://dummyjson.com/products/categories"


export const fetchAll = createAsyncThunk('fetchAll', async () => {
    const response = await axios.get(fetchAlldata)
    return response.data
})

export const fetchCategories = createAsyncThunk('fetchCategories', async () => {
    const response = await axios.get(fetchAllCtg)
    return response.data
})



export const fetchData = createSlice({
    name: "data",
    initialState: {
        isLoading: false,
        allData: [],
        categories: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allData = action.payload;
        });
        builder.addCase(fetchAll.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true
        });

        
        // Fetch categories
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true
        });
    }
})

// export const { fetchAlldata } = fetchData.actions

export default fetchData.reducer