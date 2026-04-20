import { createSlice } from '@reduxjs/toolkit';

// 1. Smart function to check Local Storage on load
const loadFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem('reyalCart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      parsedCart.isCartOpen = false; // Always close drawer on a fresh page load
      return parsedCart;
    }
  } catch (error) {
    console.warn("Failed to load cart from local storage", error);
  }
  
  // Default state if nothing is saved
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isCartOpen: false, 
  };
};

const initialState = loadFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      state.totalQuantity++;
      
      // FIX: Safely check if the price is a String (old data) or Number (MongoDB)
      const priceNumber = typeof newItem.price === 'string' 
        ? Number(newItem.price.replace(/[^0-9.-]+/g, "")) 
        : Number(newItem.price);

      state.totalAmount += priceNumber;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price, // Keep the original format for display
          priceNumber: priceNumber, // Use this for pure math
          image: newItem.image,
          size: newItem.size,
          quantity: 1,
          totalPrice: priceNumber
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += priceNumber;
      }
      
      state.isCartOpen = true; 
    },
    removeItem(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(item => !(item.id === id && item.size === size));
      }
    },
    
    // ➕ NEW: Increase Quantity Logic
    increaseQuantity(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.priceNumber;
        state.totalQuantity++;
        state.totalAmount += existingItem.priceNumber;
      }
    },

    // ➖ NEW: Decrease Quantity Logic
    decreaseQuantity(state, action) {
      const { id, size } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          // If they click minus when quantity is 1, remove the item entirely
          state.totalQuantity--;
          state.totalAmount -= existingItem.priceNumber;
          state.items = state.items.filter(item => !(item.id === id && item.size === size));
        } else {
          // Otherwise, just decrease by 1
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.priceNumber;
          state.totalQuantity--;
          state.totalAmount -= existingItem.priceNumber;
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.isCartOpen = false;
    }
  },
});

// Make sure to export the new actions so the CartDrawer can use them!
export const { 
  addToCart, 
  toggleCart, 
  removeItem, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;