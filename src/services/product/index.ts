import {
  filterbyFeatureProducts,
  filterValues,
  pincodeEnquiry,
  productDetailById,
} from "@/lib/api";
import {  useMutation, useQuery } from "@tanstack/react-query";

export const useProductDetailsById = (id: string) => {
  return useQuery({
    queryKey: ["productdetail", id],
    queryFn: () => productDetailById(id),
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data,
    retry: 1,
  });
};
export const usePincodeEnquiry = () => {
  return useMutation({
    mutationKey: ["pincodeEnquiry"],
    mutationFn: (args:{pincode: number,product_id:number}) => pincodeEnquiry(args.pincode,args.product_id),
    retry: 1,
  });
};

export const useFilterValues = (token: string) => {
  return useQuery({
    queryKey: ["filtervalue"],
    queryFn: () => filterValues(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};


export const useFilterByFeatureProducts = (
  token: string,
  category_id?: string,
  subcategory_id?:string,
  latest_product ?:string,
  offer_ending_soon ?:string,
  isin_todays_deal?: string,
  is_featured?: string,
  best_selling?: string,
  product_name?: string
) => {
  return useQuery({
    queryKey: [
      "filterbyfeature",
      token,
      product_name,
      category_id,
      offer_ending_soon,
      latest_product,
      subcategory_id,
      is_featured,
      isin_todays_deal,
      isin_todays_deal
    ],
    queryFn: () =>
      filterbyFeatureProducts(
      token,
        category_id,
        subcategory_id,
        latest_product,
        offer_ending_soon,
        isin_todays_deal,
        is_featured,
        best_selling,
        product_name
      ),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
