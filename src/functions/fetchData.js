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
        cartItems: [],
        isError: false,
    },
    reducers: {
        addToCart: (state, action) => {

            // delivery time logic
            const time = new Date()
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            const randomDates = Math.round((Math.random() * 5) + 1)
            time.setDate(time.getDate() + randomDates) //random number between 1 t0 6
            const date = time.toLocaleDateString('en-US', options)

            // adding logic
            const isItemExist = state.cartItems.find(item => item.id === action.payload.id)  //if find then return that value else return undfined

            if (isItemExist) {
                isItemExist.quantity += 1
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1,date: date })
            }
        },
        removeFromCart: (state, action) => {
            const isItemExist = state.cartItems.find(item => item.id === action.payload.id)

            if (isItemExist) {
                if (isItemExist.quantity > 1) {
                    isItemExist.quantity -= 1
                }
                else {
                    state.cartItems = state.cartItems.filter((val) => val.id !== action.payload.id) //No need still used 
                }
            }
        },
        removeAll: (state, action) => {
            state.cartItems = state.cartItems.filter((val) => val.id !== action.payload.id)
        },

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

export const { addToCart, removeFromCart, removeAll } = fetchData.actions


export const cartItemCount = state => {
    const cartItems = state.cartItems;

    if (cartItems.length > 0) {
        return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    } else {
        return 0;
    }
};


export default fetchData.reducer