import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../create-slice/auth-slice"
import songReducer from "../create-slice/song-slice"
import productReducer from "../create-slice/product-slice"
import cartReducer from "../create-slice/cart-slice"
import reviewReducer from "../create-slice/review-slice"
import qnaReducer from "../create-slice/qna-slice"
import albumReducer from "../create-slice/album-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        song: songReducer,
        product: productReducer,
        cart: cartReducer,
        review: reviewReducer,
        qna: qnaReducer,
        album: albumReducer
    }
})

export default store