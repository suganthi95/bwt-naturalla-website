import { getBlogDetail, getBlogs, getTopBlogs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogs = (token: string, value: string) => {
  return useQuery({
    queryKey: ["getblogs", value],
    queryFn: () => getBlogs(token, value),
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data,
    retry: 1,
  });
};
export const useGetTopBlogs = (token: string) => {
  return useQuery({
    queryKey: ["gettopblogs"],
    queryFn: () => getTopBlogs(token),
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data,

    retry: 1,
  });
};

export const useGetBlogDetail = (token: string, id: string) => {
  return useQuery({
    queryKey: ["getblogdetail", id],
    queryFn: () => getBlogDetail(token, id),
    staleTime: 1000 * 60 * 5,
    select: (data) => data?.data[0],
    retry: 1,
  });
};
