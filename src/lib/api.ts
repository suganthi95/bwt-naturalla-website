import type { AddressPayload, OrderPayload, Profile } from "@/types/type";
import { api } from "./axiosInstance";

export const signup = async (
  first_name: string,
  last_name: string,
  phone_no: number,
  email: string,
  password: string
) => {
  const response = await api.post("v1/auth/signup", {
    first_name,
    last_name,
    phone_no,
    email,
    password,
  });
  return response.data;
};
export const login = async (phone_no: number) => {
  const response = await api.post("v1/auth/login", { phone_no });
  return response.data;
};
export const verifyAccount = async (
  otp: number,
  phone_no: number,
  signup: boolean
) => {
  const response = await api.post("v1/auth/verify-otp", {
    otp,
    phone_no,
    signup,
  });
  return response.data;
};
export const landingPageDetails = async () => {
  const response = await api.get("v1/product/deals-sellings");
  return response.data;
};

export const productDetailById = async (id: string) => {
  const response = await api.get(`v1/product/detail/${id}`);
  return response.data;
};

export const pincodeEnquiry = async (pincode: string) => {
  const response = await api.get(`v1/order/check/delivery/${pincode}`);
  return response.data;
};

export const addToCart = async (
  product_id: number,
  quantity: number,
  token: string
) => {
  const response = await api.post(
    "v1/cart",
    { product_id, quantity },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const getCartItems = async (token: string) => {
  const response = await api.get("v1/cart", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const updateCartItems = async (
  cart_id: number,
  quantity: number,
  token: string
) => {
  const response = await api.put(
    "v1/cart",
    { cart_id, quantity },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const deleteCartItems = async (
  cart_id: number,
  quantity: number,
  token: string
) => {
  const response = await api.delete(`v1/cart/${cart_id}`, {
    data: {
      cart_id,
      quantity,
    },
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getWhislistItems = async (token: string) => {
  const response = await api.get("v1/wishlist", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const addToWhislistItems = async (product_id: number, token: string) => {
  const response = await api.post(
    "v1/wishlist",
    { product_id },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const deleteWhislistItems = async (
  product_id: number,
  token: string
) => {
  const response = await api.delete(`v1/wishlist/${product_id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const createOrder = async (
  OrderPayload: OrderPayload,
  token: string
) => {
  const response = await api.post(
    "v1/order",
    { OrderPayload },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const verifyPhonePayPayment = async (
  merchantTransactionId: string,
  token: string
) => {
  const response = await api.post(
    "v1/order/verify/phonepe/payment",
    { merchantTransactionId },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};
export const verifyRazorPayPayment = async (
  razorpay_payment_id: string,
  razorpay_signature: string,
  razorpay_order_id: string,
  token: string
) => {
  const response = await api.post(
    "v1/order/verify/razorpay/payment",
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const checkCoupoCode = async (couponCode: string, token: string) => {
  const response = await api.get(`v1/order/coupon/${couponCode}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};


export const getCategories= async(token:string)=>{
  const response = await api.get('v1/product/category',{
    headers:{
      Authorization:token
    }
  })
  return response.data
}
export const filterValues = async (token: string) => {
  const response = await api.get("v1/product/filter/values", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const filterbyFeatureProducts = async (
  token: string,
  category_id?: string,
  subcategory_id?:string,
  isin_todays_deal?: string,
  is_featured?: string,
  best_selling?: string,
  product_name?: string
) => {
  const response = await api.get(
    `v1/product/filter/by-feature/?category_id=${
      category_id || ""
    }&subcategory_id=${
      subcategory_id || ""
    }&isin_todays_deal=${isin_todays_deal || ""}&is_featured=${
      is_featured || ""
    }&best_selling=${best_selling || ""}&product_name=${product_name || ""}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data;
};

export const getProfileInfo = async (token: string) => {
  const response = await api.get("v1/profile", {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};
export const updateProfile = async (token: string, payload: Profile) => {
  const response = await api.put("v1/profile/update", payload, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
export const updateProfileImage = async (token: string, formData: FormData) => {
  const response = await api.put("v1/profile/profilepic/update", formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getOrders = async (token: string) => {
  const response = await api.get("v1/profile/orders", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getOrdersDetails = async (token: string, order_id: number) => {
  const response = await api.get(`v1/profile/order/${order_id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getDashboard = async (token: string) => {
  const response = await api.get("v1/profile/dashboard", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getRecentOrders = async (token: string) => {
  const response = await api.get("v1/profile/recent/order", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getAddress = async (token: string) => {
  const response = await api.get("v1/profile/address", {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const addAddress = async (token: string, payload: AddressPayload) => {
  const response = await api.post("v1/profile/address", payload, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const editAddress = async (token: string, payload: AddressPayload) => {
  const response = await api.put("v1/profile/address", payload, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const deleteAddress = async (token: string, id: string) => {
  const response = await api.delete(`v1/profile/address/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
