import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../functions/fetchData'

export const store = configureStore({
    reducer: dataReducer
})