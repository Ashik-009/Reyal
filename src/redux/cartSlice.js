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
      const priceNumber = Number(newItem.price.replace(/[^0-9.-]+/g, ""));
      state.totalAmount += priceNumber;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          priceNumber: priceNumber,
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
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.isCartOpen = false;
    }
  },
});

export const { addToCart, toggleCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;