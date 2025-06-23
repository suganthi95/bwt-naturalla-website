import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/Home";



type CartState = {
  items: Product[];

};

const initialState: CartState = {
  items: [],

};

 

export const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    removeCartItems:(state)=>{
    state.items = []
    },
    addWishItem: (state, action: PayloadAction<Product>) => {
    //   const existingItem = state.items.find(
    //     (item) => item.cart_id === action.payload.cart_id
    //   );

    //   if (existingItem) {
    //     return
    //   } else {
        state.items.push(action.payload);
  

    },
        addItemTotalAmount: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.cart_id === action.payload.cart_id
      );

      if (existingItem) {
        existingItem.total_amount = action.payload.total_amount;
      } else {
        state.items.push(action.payload);
      }

    },

  
  
    removeWishlistItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.cart_id !== action.payload
      );
    },
    removeWishlist : ()=>{
      return initialState
    }
    // clearCart: (state) => {
    //   state.items = [];
    //   Object.assign(state, calculateTotals([]));
    // },
   
  },
});

export const {
  setWishItems,
  addWishItem,
  removeWishlist,
  removeWishlistItem
} = wishSlice.actions;

export default wishSlice.reducer;
