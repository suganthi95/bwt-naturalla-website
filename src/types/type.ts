export type OrderPayload = {
  product_data: {
    product_id: number;
    quantity: number;
    order_amount: number;
    unit_price: number;
    coupon_id?: number | null;
    coupon_amount?: number | null;
    product_sub_total?: number | null;
    prodcut_tax?: number | null;
  }[];
  address: string;
  discount_amount: number | null;
  coupon_discount: number | null;
  coupon_id?: number | null;

  tax: number | null;
  sub_total: number | null;
  order_amount: number | null;
  shipping_fee: number | null;
  cash_on_delivery: boolean;
  payment_provider: string;
  pincode: number;
  shipmet_first_name: string;
  shipment_last_name: string;
  shipment_email: string;
  shipment_phone_no: number;
  same_billing_address?: boolean;
  billing_first_name?: string | null;
  billing_last_name?: string | null;
  billing_address?: string | null;
  billing_email?: string | null;
  billing_phone_no?: number | null;
  billing_city?: string | null;
  billing_state?: string | null;
  billing_pincode?: string | null;
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

export type ProductReview = {
  quantity: number;
  order_amount: number;
  product_name: string;
  product_thumbnail_image: string;
  has_reviewed: boolean;
  review_id: number | null;
  review_txt: string | null;
  review_title: string | null;
  ratings: number | null;
  created_at: string | null;
  review_author_id: number | null;
  product_id: number;
};
export interface Category {
  category_id: number;
  category_title: string;
  category_thumbnail_image: string;
  subcategories: {
    subcategory_id: number,
    subcategory_name: string
  }[]
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
  same_billing_address?: boolean;
  billing_first_name?: string | null;
  billing_last_name?: string | null;
  billing_address?: string | null;
  billing_email?: string | null;
  billing_phone_no?: string | null;
  billing_city?: string | null;
  billing_state?: string | null;
  billing_pincode?: string | null;
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
  same_billing_address?: true;
  billing_first_name?: string | null;
  billing_last_name?: string | null;
  billing_address?: string | null;
  billing_email?: string | null;
  billing_phone_no?: string | null;
  billing_city?: string | null;
  billing_state?: string | null;
  billing_pincode?: string | null;
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
  password?: string | null;
};
export interface OrderAddressPayload {
  address_first_name: string;
  address_last_name: string;
  address_email: string;
  address_phone_no: number;
  address: string;
  city: string;
  state: string;
  pincode: number;
}

export type Blog = {
  blog_id: number;
  blog_title: string;
  blog_desc: string;
  blog_home_image: string | null;
  blog_status: "draft" | "published";
  blog_tags: string[];
  created_by: number;
  created_at: string;
  updated_at: string | null;
  publish: boolean;
  blog_content: string;
  blog_images: number;
  blog_image_url: string;
  created_time:string
};


export type ContactUsTicket = {
  contactus_id: number;
  first_name: string;
  last_name: string;
  contact_email: string;
  contact_phone_no: string;
  subject: string | null;
  message_body: string;
  attachment: string[];
  priority: string;
  status: string;
  customer_id: number;
  created_at: string; // ISO date string
  issue_type_id: number;
  subissue_id: number;
  admin_read_status: boolean;
  customer_read_status: boolean;
  issue_type: string;
  sub_issue: string;
  created_time: string; // formatted date string
  attachment_data: string[];
};


export type SubIssue = {
  sub_issue: string;
  subissue_id: number;
};

export type IssueType = {
  issue_type_id: number;
  issue_type: string;
  created_at: string;
  created_by: string | null;
  sub_issues: SubIssue[];
};

export type PriceSummary = {
  add_for_freeship:number | null
  grand_total: number | null;
  sub_total:number | null;
  tax:number | null;
  shipping_fee: number | null;
  discount: number | null;
  total_mrp: number | null;
  bag_discount: number | null;
};
