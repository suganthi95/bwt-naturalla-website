import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useUpdateReview } from "@/services/review";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
interface Props {
    product:any
    onClose:(val:boolean)=>void
    orderCode:string
}

export default function UpdateReview({product,orderCode,onClose}:Props) {
      const [title, setTitle] = useState<string | null>(product?.review_title);
  const { token } = useSelector((state: RootState) => state.auth);
  const [description, setDescription] = useState<string | null>(product?.review_txt);
  const [rating, setRating] = useState<number | null>(product?.ratings);
  const { mutate, isPending } = useUpdateReview();
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order_code", orderCode);
    formData.append("product_id", '');
    formData.append("review_title", title ?? '');
    formData.append("review_txt", description ?? '');
    formData.append("ratings", rating?.toString() ?? "0");

    mutate(
      { formData: formData, token: token },
      {
        onSuccess(data) {
          onClose(false);
          toast.success(data?.message);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  return (
    <div className="  bg-white p-4 px-6  space-y-6">

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Title
        </label>
        <input
          type="text"
          className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter review title"
          value={title ?? ''}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Description
        </label>
        <textarea
          rows={4}
          className="w-full border rounded px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience..."
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Rating
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition ${
                rating && rating >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(star)}
              fill={rating && rating >= star ? "currentColor" : "none"}
            />
          ))}
          {rating && (
            <span className="ml-2 text-sm text-gray-600">({rating} / 5)</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-primary text-white rounded px-5 py-2 text-sm font-medium hover:bg-primary/90"
      >
        {isPending ? <Loader2 className="animate-spin" /> : " Update Review"}
      </button>
    </div>
  );
 
}
