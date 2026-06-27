import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import authReducer from './authSlice';
import subCategoryReducer from './subCategorySlice'


// Load saved cart
const loadState = () => {
    try {
        const data = localStorage.getItem('cart')
        return data ? JSON.parse(data) : undefined
    } catch (error) {
        return undefined
    }
}

// Save cart
const saveState = (state) => {
    localStorage.setItem('cart', JSON.stringify(state))
}

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        category: categoryReducer,
        product: productReducer,
        auth: authReducer,
        subCategory: subCategoryReducer,
    },
    preloadedState: {
        cart: loadState()
    }
})

// subscribe to store changes
store.subscribe(() => {
    saveState(store.getState().cart)
})