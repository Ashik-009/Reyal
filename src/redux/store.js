import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 2. Subscribe to the store. Every time state changes, save it to Local Storage!
store.subscribe(() => {
  try {
    const cartState = store.getState().cart;
    // Convert the JavaScript object into a JSON string to save it
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem('reyalCart', serializedState);
  } catch (error) {
    console.warn("Failed to save cart to local storage", error);
  }
});