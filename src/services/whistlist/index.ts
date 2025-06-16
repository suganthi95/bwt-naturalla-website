import {  addToWhislistItems, deleteWhislistItems, getWhislistItems } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToWishList = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["addtowhistlelist"],
    mutationFn: ({
      product_id,
      token,
    }: {
      product_id: number;
      quantity: number;
      token: string;
    }) => addToWhislistItems(product_id, token),

    onSuccess: () => {
      toast.success("WishList added to cart!");
     queryClient.invalidateQueries({queryKey:['getwishlist']})
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to add product to wishlist.";
      toast.error(message);
    },
  });
};

export const useGetWishListItems = (token:string)=>{
    return useQuery({
        queryKey:['getwishlist'],
        queryFn:()=>getWhislistItems(token),
        select:(data)=>data,
        staleTime:1000*60*5,
        retry:1
    })
}




export const useDeleteWishlist = () => {
    const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deletewishlist"],
    mutationFn: ({
      cart_id,
      token,
    }: {
      cart_id: number;
      token: string;
    }) => deleteWhislistItems(cart_id, token),

    onSuccess: () => {
    //   toast.success("Product added to cart!");
     queryClient.invalidateQueries({queryKey:['getwishlist']})
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to  remove wishlist.";
      toast.error(message);
    },
  });
};

