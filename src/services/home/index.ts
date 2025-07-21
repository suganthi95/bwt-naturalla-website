import {
  contactUs,
  getCategories,
  getPromoLists,
  landingPageDetails,
} from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetLandingPageDetails = () => {
  return useQuery({
    queryKey: ["landingpageDetails"],
    queryFn: landingPageDetails,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useGetCategories = (token: string) => {
  return useQuery({
    queryKey: ["getcategories"],
    queryFn: () => getCategories(token),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useGetPromoLists = () => {
  return useQuery({
    queryKey: ["getAllPromoLists"],
    queryFn: () => getPromoLists(),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export const useContactUs = () => {
  return useMutation({
    mutationKey: ["contactus"],
    mutationFn: (data: any) => contactUs(data),
  });
};
