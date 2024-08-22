import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cardReducer from './slices/cardSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        card: cardReducer
    },
})