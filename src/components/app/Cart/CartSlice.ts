import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "../../../types"
import { handleProductQuantity } from "../../../validation"

interface InitialState {
    cart: IProduct[]
}

let initialState: InitialState = {
    cart: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = handleProductQuantity(state.cart, action.payload)            
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((prod) => prod.id !== action.payload)            
        },

        clearCart: (state) => {
            state.cart = [];
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;