import {
  filterbyFeatureProducts,
  filterValues,
  pincodeEnquiry,
  productDetailById,
} from "@/lib/api";
import {  useQuery } from "@tanstack/react-query";

export const useProductDetailsById = (id: string) => {
  return useQuery({
    queryKey: ["productdetail", id],
    queryFn: () => productDetailById(id),
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data,
    retry: 1,
  });
};
export const usePincodeEnquiry = (pincode: string) => {
  return useQuery({
    queryKey: ["pincodeEnquiry"],
    queryFn: () => pincodeEnquiry(pincode),
    staleTime: 1000 * 60 * 5,
    enabled: !!pincode,
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
      is_featured,
      isin_todays_deal,
      isin_todays_deal
    ],
    queryFn: () =>
      filterbyFeatureProducts(
      token,
        category_id,
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
