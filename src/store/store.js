import { configureStore } from "@reduxjs/toolkit";
import authReducers from './authSlice'
import postReducers from './postSlice'

const store = configureStore({
    reducer: {
        auth: authReducers,
        posts: postReducers,
    }
});

export default store;