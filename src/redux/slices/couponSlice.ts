import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CouponState {
  status: boolean;
  coupon_id: number | null;
  coupon_type: string;
  coupon_code: string;
  start_at: string;
  end_at: string;
  discount_type: string;
  discount: number;
  created_at: string;
  created_by: string | null;
  mini_shipping: number;
  max_discount: number;
  product_id: number | null;
  product_ids: number[];
}

const initialState: CouponState = {
  status: false,
  coupon_id: null,
  coupon_type: "",
  coupon_code: "",
  start_at: "",
  end_at: "",
  discount_type: "",
  discount: 0,
  created_at: "",
  created_by: null,
  mini_shipping: 0,
  max_discount: 0,
  product_id: null,
  product_ids: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupon(state, action: PayloadAction<CouponState>) {
      return { ...state, ...action.payload };
    },
    removeCoupon() {
      return initialState;
    },
  },
});

export const { setCoupon,removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;
