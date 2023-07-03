import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slice/CartSlice";
import ProductModalSlice from "./Slice/ProductModalSlice";




const store = configureStore({
    reducer: {
        cart: CartSlice,
        pm:ProductModalSlice
    }
})

export default store;