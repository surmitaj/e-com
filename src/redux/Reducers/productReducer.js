import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const INITIAL_STATE = { products:[], isLoading: false, error: null }

export const productsAsyncThunk = createAsyncThunk('products/fetchSuccess', async(arg, thunkAPI) => {
    try {
        const response = await fetch('https://667dab04297972455f65fc4f.mockapi.io/products/list')
        const data = await response.json();
        thunkAPI.dispatch(fetchSuccess(data))
    } catch(e) {
        thunkAPI.dispatch(fetchError())
    } 
})

export const addProductAsyncThunk = createAsyncThunk('products/addProduct', async (newProduct, thunkAPI) => {
    try {
        const response = await fetch('https://667dab04297972455f65fc4f.mockapi.io/products/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });
        const data = await response.json();
        thunkAPI.dispatch(addProduct(data));
        return data;
    } catch (e) {
        thunkAPI.dispatch(fetchError());
        throw e;
    }
    
});

const productSlice= createSlice({
    name: 'products',
    initialState: INITIAL_STATE,
    reducers: {
        fetchStart: (state, action) => {
            state.isLoading = true
        },
        fetchSuccess: (state, action) => {
            state.products = action.payload
            state.isLoading = false
        },
        fetchError: (state, action) => {
            state.error = 'Error in fetching data...'
            state.isLoading = false
        },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        }
    }
})

export const productsReducer = productSlice.reducer
export const { fetchStart, fetchSuccess, fetchError, addProduct } = productSlice.actions

export const productSelector = (state) => state.productsReducer