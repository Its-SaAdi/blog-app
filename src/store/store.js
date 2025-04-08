import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import postReducers from './postSlice'

const store = configureStore({
    reducer: {
        auth: authReducers,
        post: postReducers,
    }
});

export default store;