import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../fireBaseInit';
import { collection, doc, updateDoc, deleteDoc, getDoc, getDocs, setDoc } from "firebase/firestore";

const INITIAL_STATE = {
  items: [], // Array to hold items in the cart
  totalItems: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of all items in the cart
};

export const fetchCartItemsAsyncThunk = createAsyncThunk('cart/fetchSuccess', async(arg, thunkAPI) => {
    const querySnapshot = await getDocs(collection(db, "cartItems"));
    const data=[]
    querySnapshot.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()})
    });
      thunkAPI.dispatch(fetchCartItems(data)) 
})

export const addToCartAsyncThunk = createAsyncThunk('cart/fetchCartItems', async(item, thunkAPI) => {
  try {
    const itemDocRef = doc(db, 'cartItems', item.id.toString())
    const itemDoc = await getDoc(itemDocRef);

      if (itemDoc.exists()) {
        // If the document exists, update the quantity
        await updateDoc(itemDocRef, {
          quantity: item.quantity+1 // Increment the quantity
        });
      } else {
        // If the document doesn't exist, set it with initial quantity
        await setDoc(itemDocRef, {
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          quantity: item.quantity
        });
      }
      thunkAPI.dispatch(addItemToCart(item))
    } catch(err) {
      console.log(err)
    }
})

export const removeFromCartAsyncThunk = createAsyncThunk('cart/removeItemFromCart', async(id, thunkAPI) => {
  try {
    const itemDocRef = doc(db, 'cartItems', id.toString())
    const itemDoc = await getDoc(itemDocRef);

    if (itemDoc.exists()) {
      const currentItem = itemDoc.data();
    
    if (currentItem.quantity > 1) {
      // If quantity is greater than 1, update the quantity
      await updateDoc(itemDocRef, {
        quantity: currentItem.quantity - 1
      });
    } else {
      // If quantity is 1 or less, delete the document
      await deleteDoc(itemDocRef);
    }}
    thunkAPI.dispatch(removeItemFromCart(id))
  } catch(err) {
    console.log(err)
  }
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        // If item already exists in cart, increase its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(newItem);
      }

      // Update total items and total price
      state.totalItems += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        // Decrease quantity of the item
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          // Remove item from cart if quantity drops to zero
          state.items = state.items.filter(item => item.id !== itemId);
        }
        
        // Update total items and total price
        state.totalItems -= 1;
        state.totalPrice -= existingItem.price;
      }
    },
    fetchCartItems: (state, action) => {
      state.items = action.payload
      state.totalItems = action.payload.length
      state.totalPrice = action.payload.reduce((total, item) => {
        return total + (item.quantity * item.price);
      }, 0);
    }
  },
});

export const { addItemToCart, removeItemFromCart, fetchCartItems } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
