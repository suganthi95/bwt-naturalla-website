import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/Home";
import type { OrderItem, PriceSummary, ShippingTaxDetail } from "@/types/type";

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  same_billing_address?: boolean;
  billing_first_name?: string | null;
  billing_last_name?: string | null;
  billing_address?: string | null;
  billing_email?: string | null;
  billing_phone_no?: string | null;
  billing_city?: string | null;
  billing_state?: string | null;
  billing_pincode?: string | null;
};

type CartState = {
  items: Product[];
  price_summary: PriceSummary;
  products_data:OrderItem[]
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
  price_summary:{
    add_for_freeship:0,
    bag_discount:0,
    discount:0,
    grand_total:0,
    shipping_fee:0,
    sub_total:0,
    tax:0,
    total_mrp:0
  },
  products_data:[],
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
    setCartItemsPrice_Summary:(state,action:PayloadAction<PriceSummary>)=>{
      state.price_summary = action.payload;
    },
    setCartProducts_Data:(state,action:PayloadAction<OrderItem[]>)=>{
      state.products_data = action.payload
    },
    removeCartItems: (state) => {
      state.items = [];
      state.price_summary={
        add_for_freeship:0,
        bag_discount:0,
        discount:0,
        grand_total:0,
        shipping_fee:0,
        sub_total:0,
        tax:0,
        total_mrp:0
      }
      state.products_data = []
      state.subtotal = 0;
      state.tax = 0;
      state.discount = 0;
      state.shipping = 0;
      state.total = 0;
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
        existingItem.coupon_amount = action.payload.coupon_amount ?? null;
        existingItem.coupon_id = action.payload.coupon_id ?? null;
        existingItem.prodcut_tax = action.payload.prodcut_tax;
        existingItem.product_sub_total = action.payload.product_sub_total;
      } else {
        state.items.push(action.payload);
      }

      Object.assign(state, calculateTotals(state.items));
    },

    setTaxDetails: (state, action: PayloadAction<ShippingTaxDetail>) => {
      state.tax_detail = action.payload;
    },
    removeTaxDetails: (state) => {
      state.tax_detail = {
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
      };
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
  setCartItemsPrice_Summary,
  setCartProducts_Data,
  addItemTotalAmount,
  removeTaxDetails,
  removeCartItems,
  addItem,
  setTaxDetails,
  decreaseQuantity,
  removeItem,
  increaseQuantity,
  setShippingAddress,
  clearShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
