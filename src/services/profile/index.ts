import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddress,
  getDashboard,
  getOrders,
  getOrdersDetails,
  getProfileInfo,
  getRecentOrders,
  updateProfile,
  updateProfileImage,
} from "@/lib/api";
import type { AddressPayload, Profile } from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfileInfo = (token: string) => {
  return useQuery({
    queryKey: ["getprofile"],
    queryFn: () => getProfileInfo(token),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["updateprofile"],
    mutationFn: (args: { token: string; payload: Profile }) =>
      updateProfile(args.token, args.payload),
  });
};
export const useUpdateProfileImage = () => {
  return useMutation({
    mutationKey: ["updateprofileimage"],
    mutationFn: (args: { token: string; formdata: FormData }) =>
      updateProfileImage(args.token, args.formdata),
  });
};
export const useGetOrders = (token: string) => {
  return useQuery({
    queryKey: ["getorder"],
    queryFn: () => getOrders(token),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useGetOrdersDetails = (token: string, order_id: number) => {
  return useQuery({
    queryKey: ["getorderdetails", order_id],
    queryFn: () => getOrdersDetails(token, order_id),
    select: (data) => data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
export const useGetDashboard = (token: string) => {
  return useQuery({
    queryKey: ["getdashboard"],
    queryFn: () => getDashboard(token),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
export const useGetRecentOrders = (token: string) => {
  return useQuery({
    queryKey: ["getrecentorders"],
    queryFn: () => getRecentOrders(token),
    select: (data) => data?.data,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useGetAddress = (token: string) => {
  return useQuery({
    queryKey: ["getaddress"],
    queryFn: () => getAddress(token),
    select: (data) => data?.address,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAddAddress = () => {
  return useMutation({
    mutationKey: ["addaddress"],
    mutationFn: (args: { token: string; payload: AddressPayload }) =>
      addAddress(args.token, args.payload),
  });
};

export const useEditAddress = () => {
  return useMutation({
    mutationKey: ["editaddress"],
    mutationFn: (args: { token: string; payload: AddressPayload }) =>
      editAddress(args.token, args.payload),
  });
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationKey: ["deleteaddress"],
    mutationFn: (args: { token: string; id: string }) =>
      deleteAddress(args.token, args.id),
  });
};
