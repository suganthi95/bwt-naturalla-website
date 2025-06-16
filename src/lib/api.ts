import type { OrderPayload } from "@/types/type";
import { api } from "./axiosInstance";



export const signup = async(first_name:string,last_name:string,phone_no:number,email:string,password:string)=>{
const response = await api.post('v1/auth/signup',{first_name,last_name,phone_no,email,password})
return response.data
}
export const login =async(phone_no:number)=>{
 const response = await api.post('v1/auth/login',{phone_no})
 return response.data
}
export const verifyAccount = async(otp:number,phone_no:number,signup:boolean)=>{
const response  = await api.post('v1/auth/verify-otp',{otp,phone_no,signup})
return response.data
}
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

export const updateCartItems = async (cart_id:number,  quantity:number,token: string) => {
  const response = await api.put("v1/cart",{cart_id,quantity}, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const deleteCartItems = async (cart_id:number,  quantity:number,token: string) => {
  const response = await api.delete(`v1/cart/${cart_id}`,{
    data:{
        cart_id,
        quantity
    },
    headers:{
        Authorization:token
    }
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

export const addToWhislistItems = async (
  product_id: number,
  token: string
) => {
  const response = await api.post(
    "v1/wishlist",
    { product_id},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );
  return response.data;
};

export const deleteWhislistItems = async (cart_id:number,  quantity:number,token: string) => {
  const response = await api.delete(`v1/cart/${cart_id}`,{
    data:{
        cart_id,
        quantity
    },
    headers:{
        Authorization:token
    }
  });
  return response.data;
};


export const createOrder = async(OrderPayload:OrderPayload,token:string)=>{
const response = await api.post('v1/order',{OrderPayload},{
    headers:{
        Authorization:token
    }

})
return response.data
}


export const verifyPhonePayPayment = async(merchantTransactionId:string,token:string)=>{
    const response = await api.post('v1/order/verify/phonepe/payment', {merchantTransactionId},{
        headers:{
            Authorization:token
        }
    })

    return response.data
}
export const verifyRazorPayPayment = async(razorpay_payment_id:string, razorpay_signature:string ,razorpay_order_id:string,token:string)=>{
    const response = await api.post('v1/order/verify/razorpay/payment', {razorpay_order_id,razorpay_payment_id,razorpay_signature},{
        headers:{
            Authorization:token
        }
    })

    return response.data
}

export const  checkCoupoCode  = async (couponCode:string,token:string)=>{
  const response  = await api.get(`v1/order/coupon/${couponCode}`,{
    headers:{
      Authorization:token
    }
  })
  return response.data

}

export const filterValues = async(token:string)=>{
 const response = await api.get('v1/product/filter/values',{
  headers:{
    Authorization:token
  }
 })
 return response.data
}
 

export const filterbyFeatureProducts =async(param:string,token:string)=>{
  const response = await api.get(`v1/product/filter/by-feature/?${param}`,{
    headers:{
      Authorization:token
    }
  })
  return response.data
  
} 