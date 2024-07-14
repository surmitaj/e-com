import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./redux/Reducers/productReducer";
import { cartReducer } from "./redux/Reducers/cartReducer";
import { notificationReducer } from "./redux/Reducers/notificationReducer";


export const store = configureStore({
    reducer: { productsReducer, cartReducer, notificationReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})