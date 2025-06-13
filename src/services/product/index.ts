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

export const useFilterByFeatureProducts = (param: string, token: string) => {
  return useQuery({
    queryKey: ["filterbyfeature", param],
    queryFn: () => filterbyFeatureProducts(param, token),
    select:(data)=>data?.data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
