import { addToCart, pincodeEnquiry, productDetailById } from "@/lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useProductDetailsById  = (id:string)=>{
    return useQuery({
        queryKey:['productdetail',id],
        queryFn:()=>productDetailById(id),
        staleTime:1000*60*5,
        select:(data)=>data?.data,
        retry:1
    })
}
export const 
usePincodeEnquiry = (pincode:string)=>{
    return useQuery({
        queryKey:['pincodeEnquiry'],
        queryFn:()=>pincodeEnquiry(pincode),
        staleTime:1000*60*5,
        enabled:!!pincode,
        retry:1
    })
}

export const useAddToCart = ()=>{
    return useMutation({
        mutationKey:['addtocart'],
        mutationFn:(args:{product_id:number,quantity:number})=>addToCart(args.product_id,args.quantity)})
}