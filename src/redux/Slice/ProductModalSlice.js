import { createSlice } from "@reduxjs/toolkit";

const ProductModalSlice = createSlice({
    name:"pmslice",
    initialState:false,
    reducers: {
        showProductModalAction: (state,action) => {
            return action.payload;
        }
    }
})

export const {showProductModalAction} = ProductModalSlice.actions;
export default ProductModalSlice.reducer;