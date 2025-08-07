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
import { removeWishlistItem } from "@/redux/slices/wishSlice";
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
  console.log("items: ", items);
  const { token, status } = useSelector((state: RootState) => state.auth);
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
    return <EmptyWishlist onClose={onClose} />;
  }

  return (
    <ScrollArea className="space-y-6 p-4 h-full  md:h-screen">
      <h2 className="text-lg font-bold text-title mb-3">Wishlist</h2>
      {items?.length === 0 || !items ? (
        <EmptyWishlist onClose={onClose} />
      ) : (
        <>
          <ul>
            {items?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 border-b mb-4 pb-4 items-start"
                >
                  <img
                    src={item?.thumbnail_image_url}
                    alt="Product"
                    className="w-full sm:w-28 h-36 object-cover rounded-md border"
                  />

                  <div className="flex flex-col flex-1 gap-y-2.5">
                    <div className="flex justify-between text-textPrimary">
                      <div>
                        <h3 className="font-semibold line-clamp-2 text-base sm:text-lg">
                          {item?.product_name}
                        </h3>
                        <p className="text-sm flex flex-wrap items-center gap-x-2 mt-0.5 text-[#939393]">
                          <span>1 unit</span>₹{item?.unit_price}
                          <span className="hidden sm:inline border-l h-3 border-gray-300"></span>
                          {/* <span>Size</span> */}
                          {item?.units}
                        </p>

                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="text-lg font-bold text-title">
                            ₹{item?.unit_price}
                          </span>
                          {item?.strike_through_price && (
                            <>
                              <span className="line-through text-sm text-gray-400">
                                ₹{item?.strike_through_price}
                              </span>
                              <span className="text-sm text-green-600 font-semibold">
                                {Math.round(Number(item?.discount_percent))}%
                                off
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center mt-1">
                      <motion.button
                        className="text-white bg-primary hover:bg-primary/90 text-sm px-5 py-2 rounded-md font-semibold transition"
                        onClick={() => {
                          if (status) {
                            mutate({
                              product_id: item?.product_id,
                              quantity: 1,
                              token,
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
                        onClick={() => handleRemoveProduct(item?.product_id)}
                        className="text-gray-500 cursor-pointer hover:text-red-500 transition"
                      >
                        {removingItemId === item?.cart_id ? (
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
                    </AnimatePresence>
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
