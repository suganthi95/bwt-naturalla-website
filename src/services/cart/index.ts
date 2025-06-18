import { addToCart, checkCoupoCode, createOrder, deleteCartItems, getCartItems, updateCartItems, verifyPhonePayPayment, verifyRazorPayPayment } from "@/lib/api";
import type { OrderPayload } from "@/types/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToCart = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["addtocart"],
    mutationFn: ({
      product_id,
      quantity,
      token,
    }: {
      product_id: number;
      quantity: number;
      token: string;
    }) => addToCart(product_id, quantity, token),

    onSuccess: () => {
      toast.success("Product added to cart!");
     queryClient.invalidateQueries({queryKey:['getcart']})
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to add product to cart.";
      toast.error(message);
    },
  });
};

export const useGetCartItems = (token:string)=>{
    return useQuery({
        queryKey:['getcart'],
        queryFn:()=>getCartItems(token),
        select:(data)=>data,
        staleTime:1000*60*5,
        retry:1
    })
}

export const useUpdateCart = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updatecart"],
    mutationFn: ({
      cart_id,
      quantity,
      token,
    }: {
      cart_id: number;
      quantity: number;
      token: string;
    }) => updateCartItems(cart_id, quantity, token),

    onSuccess: () => {
    //   toast.success("Product added to cart!");
     queryClient.invalidateQueries({queryKey:['getcart']})
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update product to cart.";
      toast.error(message);
    },
  });
};


export const useDeleteCart = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deletecart"],
    mutationFn: ({
      cart_id,
      quantity,
      token,
    }: {
      cart_id: number;
      quantity: number;
      token: string;
    }) => deleteCartItems(cart_id, quantity, token),

    onSuccess: () => {
    //   toast.success("Product added to cart!");
     queryClient.invalidateQueries({queryKey:['getcart']})
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to update product to cart.";
      toast.error(message);
    },
  });
};

export const useCheckCouponCode = ()=>{
  return useMutation({
    mutationKey:['checkcoupon'],
    mutationFn:(args:{couponCode:string,token:string})=>checkCoupoCode(args.couponCode,args.token)
  })
}
export const useCreateOrder = ()=>{
    return useMutation({
        mutationKey:['createorder'],
        mutationFn:(args:{OrderPayload:OrderPayload,token:string})=>createOrder(args.OrderPayload,args.token)
    })
}

export const useVerifyPhonepay = (merchantTransactionId:string,token:string)=>{
    return useQuery({
        queryKey:['verifyphonepay',merchantTransactionId],
        queryFn:()=>verifyPhonePayPayment(merchantTransactionId,token),
        enabled:false
    })
}
export const useVerifyrazorpay = ()=>{
    return useMutation({
        mutationKey:['verifyrazorpay'],
        mutationFn:(args:{razorpay_payment_id:string, razorpay_signature:string ,razorpay_order_id:string,token:string})=>verifyRazorPayPayment(args.razorpay_payment_id,args.razorpay_signature,args.razorpay_order_id, args.token),
    })
}

