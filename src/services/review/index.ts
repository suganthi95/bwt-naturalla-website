import { updateReview, writeReview } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useWriteReview = () => {
  return useMutation({
    mutationKey: ["writereview"],
    mutationFn: (args: { token: string; formData: FormData }) =>
      writeReview(args.token, args.formData),
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationKey: ["updatereview"],
    mutationFn: (args: { token: string; id:string,formData: FormData }) =>
      updateReview(args.token, args.id, args.formData),
  });
};
