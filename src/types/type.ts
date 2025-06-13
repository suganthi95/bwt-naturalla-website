export type OrderPayload = {
  product_data: {
    product_id: number;
    quantity: number;
    order_amount: number;
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
