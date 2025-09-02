import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";
import productReducer from "./ProductSlice"
import userReducer from "./UserSlice"

const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        user: userReducer
    }
})

export default store;