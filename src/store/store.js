import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../create-slice/auth-slice"
import songReducer from "../create-slice/song-slice"
import productReducer from "../create-slice/product-slice"
import cartReducer from "../create-slice/cart-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        song: songReducer,
        product: productReducer,
        cart: cartReducer
    }
})

export default store