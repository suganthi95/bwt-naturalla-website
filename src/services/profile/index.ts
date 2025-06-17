import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddress,
  getDashboard,
  getOrders,
  getProfileInfo,
  updateProfileImage,
} from "@/lib/api";
import type { AddressPayload } from "@/types/type";
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

export const useUpdateProfileImage = ()=>{
    return useMutation({
        mutationKey:['updateprofile'],
        mutationFn:(args:{token:string,formdata:FormData})=>updateProfileImage(args.token,args.formdata)
    })
}
export const useGetOrders = (token: string) => {
  return useQuery({
    queryKey: ["getorder"],
    queryFn: () => getOrders(token),
    select: (data) => data?.data,
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

export const useGetAddress = (token: string) => {
  return useQuery({
    queryKey: ["getaddress"],
    queryFn: () => getAddress(token),
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
