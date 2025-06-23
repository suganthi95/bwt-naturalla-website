export type OrderPayload = {
  product_data: {
    product_id: number;
    quantity: number;
    order_amount: number;
    coupon_id?: number | null;
    coupon_amount?: number | null;
  }[];
  address: string;
  discount_amount: number | null;
  coupon_discount: number | null;
  tax: number;
  sub_total: number;
  order_amount: number;
  shipping_fee: number;
  cash_on_delivery: boolean;
  payment_provider: string;
  pincode: number;
  shipmet_first_name: string;
  shipment_last_name: string;
  shipment_email: string;
  shipment_phone_no: number;
  city: string;
  state: string;
};
export type ShippingTaxDetail = {
  shipping_type_id: number;
  shipping_fee_type: "invoice_based" | "product_based";
  default_rate: number;
  cash_on_delivery: boolean;
  created_at: string; // ISO date string
  shipping_days: number;
  min_amount: number;
  max_amount: number | null;
  shipping_fee: number;
  status: "active" | "inactive" | string; // Extend if other statuses possible
};
export interface Category {
  category_id: number;
  category_title: string;
  category_thumbnail_image: string;
}

export interface PriceRange {
  min_price: number;
  max_price: number;
}

export interface FilterData {
  status: boolean;
  category: Category[];
  price_range: PriceRange[];
  benefits: string[];
}

export interface CouponState {
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

export interface AuthState {
  token: string;
  message: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_no?: string;
  status: boolean;
}

export interface Category {
  category_id: number;
  category_title: string;
  category_thumbnail_image: string;
}
export interface AddressPayload {
  address_first_name: string;
  address_last_name: string;
  address_email: string;
  address_phone_no: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
  default_address: boolean;
  address_id?: number;
}

export type Order = {
  product: any;
  order_id: number;
  user_id: number;
  order_date: string;
  quantity: number;
  address: string;
  city: string;
  state: string;
  country: string | null;
  pincode: string;
  order_amount: number;
  cash_on_delivery: boolean;
  payment_method: string | null;
  order_code: string;
  phone_number: string | null;
  payment_status: string;
  delivery_status: string;
  shipping_type_id: number | null;
  sub_total: number;
  discount_amount: number;
  coupon_discount: number | null;
  tax: number;
  shipping_fee: number;
  product_ids: number[];
  assign_delivery: boolean;
  order_status: string;
  shipmet_first_name: string;
  shipment_last_name: string;
  shipment_email: string;
  shipment_phone_no: string;
  coupon_id: number | null;
  cart_ids: number | null;
  coupon_dis_amount: number | null;
  amount: number;
  product_name: string;
  product_thumbnail_image: string;
  shipment_status: string | null;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  otp_verified: boolean;
  verify_email: boolean;
  profile_pic: string;
};

export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: number;
  password?: string;
};
