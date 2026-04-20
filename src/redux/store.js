import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 2. Subscribe to the store with an "Enterprise Debounce"
let saveTimeout = null;

store.subscribe(() => {
  // If a new action fires before the timer finishes, cancel the old timer!
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  // Start a new timer. It will only save if 800ms pass without another click.
  saveTimeout = setTimeout(() => {
    try {
      const cartState = store.getState().cart;
      // Convert the JavaScript object into a JSON string to save it
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem('reyalCart', serializedState);
    } catch (error) {
      console.warn("Failed to save cart to local storage", error);
    }
  }, 800); // 800 milliseconds
});