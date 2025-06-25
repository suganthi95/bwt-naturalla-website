import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import { useUpdateReview } from "@/services/review";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import type { ProductReview } from "@/types/type";
import { Button } from "@/components/ui/button";
interface Props {
  product: ProductReview;
  onClose: (val: boolean) => void;
  orderCode: string;
}

export default function UpdateReview({
  product,
  orderCode,
  onClose,
}: Props) {
  const [title, setTitle] = useState<string | null>(product?.review_title);
  const { token } = useSelector((state: RootState) => state.auth);
  const [description, setDescription] = useState<string | null>(
    product?.review_txt
  );
  const [rating, setRating] = useState<number | null>(product?.ratings);
  const { mutate, isPending } = useUpdateReview();
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order_code", orderCode);
    formData.append("product_id", "");
    formData.append("review_title", title ?? "");
    formData.append("review_txt", description ?? "");
    formData.append("ratings", rating?.toString() ?? "0");

    mutate(
      { token: token, id:String(product.review_id), formData: formData },
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
      <div className="flex items-center gap-x-2">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
          <img
            src={product.product_thumbnail_image}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h5 className="font-medium">{product.product_name}</h5>
          <div className="flex justify-between mt-2">
            <div className="text-gray-600">
              <p>
                Qty:{" "}
                <span className="font-semibold text-textPrimary">
                  {product.quantity}
                </span>
              </p>
              <p>
                {" "}
                Price{" "}
                <span className="font-semibold text-textPrimary">
                  Rs. {product.order_amount}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Title
        </label>
        <input
          type="text"
          className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter review title"
          value={title ?? ""}
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
          value={description ?? ""}
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

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-primary text-white rounded px-5 py-2 text-sm font-medium hover:bg-primary/90"
      >
        {isPending ? <Loader2 className="animate-spin" /> : " Update Review"}
      </Button>
    </div>
  );
}
