import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/Home";
import type { ShippingTaxDetail } from "@/types/type";

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  callingCode: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
};

type CartState = {
  items: Product[];
  tax_detail: ShippingTaxDetail;
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: Address | null;
};

const initialState: CartState = {
  items: [],
  tax_detail: {
    shipping_type_id: 0,
    shipping_fee_type: "invoice_based",
    default_rate: 0,
    cash_on_delivery: false,
    created_at: new Date().toISOString(),
    shipping_days: 0,
    min_amount: 0,
    max_amount: null,
    shipping_fee: 0,
    status: "inactive",
  },
  subtotal: 0,
  tax: 0,
  discount: 0,
  shipping: 0,
  total: 0,
  shippingAddress: null,
};

const calculateTotals = (items: Product[]) => {
  const subtotal = items?.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );
  const tax = +(subtotal * 0.18).toFixed(2);
  const discount = 200;
  const shipping = 50;
  const total = +(subtotal + tax + shipping - discount).toFixed(2);

  return { subtotal, tax, discount, shipping, total };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      Object.assign(state, calculateTotals(state.items));
    },
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.cart_id === action.payload.cart_id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      Object.assign(state, calculateTotals(state.items));
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

      Object.assign(state, calculateTotals(state.items));
    },

    setTaxDetails: (state, action: PayloadAction<ShippingTaxDetail>) => {
      state.tax_detail = action.payload;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.cart_id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.cart_id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.cart_id !== action.payload
      );
      Object.assign(state, calculateTotals(state.items));
    },
    // clearCart: (state) => {
    //   state.items = [];
    //   Object.assign(state, calculateTotals([]));
    // },
    setShippingAddress: (state, action: PayloadAction<Address>) => {
      state.shippingAddress = action.payload;
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
    },
  },
});

export const {
  setCartItems,
  addItemTotalAmount,
  addItem,
  setTaxDetails,
  decreaseQuantity,
  removeItem,
  increaseQuantity,
  setShippingAddress,
  clearShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
