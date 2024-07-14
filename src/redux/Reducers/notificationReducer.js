import { createSlice } from "@reduxjs/toolkit"
import { addItemToCart, removeItemFromCart } from "./cartReducer";


const INITIAL_STATE = {
    message: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        clearMessage(state) {
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart, (state, action) => {
                state.message = 'Item Added To Cart';
            })
            .addCase(removeItemFromCart, (state, action) => {
                state.message = 'Item Removed From Cart';
            });
    }
})

export const { clearMessage } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
export const notificationSelector = (state)=> state.notificationReducer;