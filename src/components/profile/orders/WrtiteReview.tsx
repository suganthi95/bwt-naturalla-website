import React, { useState } from "react";
import { Loader2, Star, Upload, X } from "lucide-react";
import { useWriteReview } from "@/services/review";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import type { ProductReview } from "@/types/type";
import { Button } from "@/components/ui/button";
interface Props {
  onClose: (val: boolean) => void;
  orderCode: string;
  product_id: string;
  Product: ProductReview;
}
export default function WriteReview({
  onClose,
  orderCode,
  product_id,
  Product,
}: Props) {
  const [title, setTitle] = useState("");
  const { token } = useSelector((state: RootState) => state.auth);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | null>(null);
const [image, setImage] = useState<File | null>(null);
  const { mutate, isPending } = useWriteReview();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      return;
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      return;
    }
  };
  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (!title || !description || !rating) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("order_code", orderCode);
    formData.append("product_id", product_id);
    formData.append("review_title", title);
    formData.append("review_txt", description);
    formData.append("ratings", rating.toString());
    formData.append("review_images",image ?? "")

    mutate(
      { formData, token },
      {
        onSuccess(data) {
          onClose(false);
          toast.success(data?.message || "Review submitted successfully");
          setTitle("");
          setDescription("");
          setRating(null);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(
              error.response?.data?.message || "Something went wrong"
            );
          } else {
            toast.error("Something went wrong");
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
            src={Product?.product_thumbnail_image}
            alt={Product?.product_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h5 className="font-medium">{Product?.product_name}</h5>
          <div className="flex justify-between mt-2">
            <div className="text-gray-600">
              <p>
                Qty:{" "}
                <span className="font-semibold text-textPrimary">
                  {Product?.quantity}
                </span>
              </p>
              <p>
                {" "}
                Price{" "}
                <span className="font-semibold text-textPrimary">
                  Rs. {Product?.order_amount}
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="block  font-medium  text-gray-700">Rating</p>
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
            <span className=" text-sm text-gray-600">({rating} / 5)</span>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Review Title
        </label>
        <input
          type="text"
          className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter review title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Review Description
        </label>
        <textarea
          rows={3}
          className="w-full border rounded px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Image
        </label>
        <div
          onDrop={handleDrop}
          className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors"
        >
          {!image &&
          <>
          <label htmlFor="upload" className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-[#BFBFBF] text-sm font-medium">
              Drag and drop or click to upload
            </p>
            <p className="  text-blue-500  font-medium text-sm">
              browse to upload
            </p>
          </label>

          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          </>
}

          {image && (
            <div className="relative w-72 h-72 mx-auto">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : ''
                }
                alt="Preview"
                className="object-contain w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null)
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isPending}
        className="bg-primary text-white rounded px-5 py-2 text-sm font-medium hover:bg-primary/90"
      >
        {isPending ? <Loader2 className="animate-spin" /> : " Submit Review"}
      </Button>
    </div>
  );
}
