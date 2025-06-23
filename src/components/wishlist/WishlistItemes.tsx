import { useState } from "react";
import { Icons } from "@/assets/icons";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import CartLoadingSkeleton from "@/common/CartLoadingSkeleton";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useDeleteWishlist } from "@/services/whistlist";
import {  removeWishlistItem } from "@/redux/slices/wishSlice";
import { toast } from "sonner";
import { useAddToCart } from "@/services/cart";
import EmptyWishlist from "./EmptyWishlist";
import { addItem } from "@/redux/slices/cartSlice";

interface Props {
  onClose: (val: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  Product: Product[];
}

export default function WishlistItemes({ isError, isLoading, onClose }: Props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wish);
  const { token ,status} = useSelector((state: RootState) => state.auth);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const { mutate } = useAddToCart();
  const { mutate: removeCart } = useDeleteWishlist();

  const handleRemoveProduct = (cart_id: number) => {
    setRemovingItemId(cart_id);
    removeCart({
      cart_id,
      token: token,
    });
    dispatch(removeWishlistItem(cart_id));
  };
  if (isLoading) {
    return <CartLoadingSkeleton />;
  }
  if (isError) {
    return <div className="text-red-600">Error</div>;
  }

  return (
    <ScrollArea className="space-y-6 p-4  h-screen">
      <h2 className="text-lg font-bold text-title mb-3">Wishlist</h2>
      {items?.length === 0 ? (
        <EmptyWishlist onClose={onClose} />
      ) : (
        <>
          <ul>
            {items?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex gap-4 border-b mb-4 items-start   pb-4"
                >
                  <img
                    src={item?.thumbnail_image_url}
                    alt="Product"
                    className="w-28 h-36 object-cover rounded-md border"
                  />

                  <div className="flex flex-col  gap-y-2.5 flex-1">
                    <div className="flex justify-between items-start text-textPrimary">
                      <div>
                        <h3 className="font-semibold line-clamp-3  text-textPrimary md:text-lg">
                          {item?.product_name}
                        </h3>
                        <p className="text-sm text-[13px] flex gap-x-1 items-center ">
                          <span className="text-[13px] text-[#939393] px-2 ">
                            1 unit
                          </span>{" "}
                          ₹{item.unit_price}{" "}
                          <span className="border-l h-3 border-gray-300"></span>
                          <span className="text-[13px]  text-[#939393]">
                            Size
                          </span>{" "}
                          {item?.product_size}
                        </p>
                        <div className="mt-1">
                          <span className="text-base font-bold md:text-[22px] text-title">
                            ₹{item.unit_price}
                          </span>
                          <span className="line-through ml-2 text-sm text-gray-400">
                            ₹{item.strike_through_price}
                          </span>
                          <span className="ml-2 text-sm text-green-600 font-semibold">
                            20% off
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1.5">
                      <motion.button
                        className="text-white text-sm cursor-pointer bg-primary hover:text-white px-6 py-2 rounded-md font-semibold"
                        onClick={() => {
                          if (status) {
                            mutate({
                              product_id: item.product_id,
                              quantity: 1,
                              token: token,
                            });
                            dispatch(addItem(item));
                          } else {
                            toast.error("Please login to continue");
                            navigate("/login");
                          }
                        }}
                      >
                        Add to Cart
                      </motion.button>
                      <button
                        onClick={() => handleRemoveProduct(item.product_id)}
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                      >
                        {removingItemId === item.cart_id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Icons.Remove />
                        )}
                      </button>
                    </div>
                    <AnimatePresence>
                      {item?.quantity >= item?.current_stock && (
                        <motion.p
                          className="text-xs font-medium text-red-500 mt-1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          Product out of stock, only {item?.current_stock}{" "}
                          quantity available
                        </motion.p>
                      )}
                    </AnimatePresence>{" "}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </ScrollArea>
  );
}
