import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Icons } from "@/assets/icons";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useDeleteCart, useUpdateCart } from "@/services/cart";
import CartLoadingSkeleton from "@/common/CartLoadingSkeleton";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/redux/slices/cartSlice";
import EmptyCart from "./EmptyCart";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onClose: (val: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  Product: Product[];
}
export default function CartSheet({ onClose, isError, isLoading }: Props) {
  const navigae = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { items, tax_detail } = useSelector((state: RootState) => state.cart);
  const { token } = useSelector((state: RootState) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const { mutate } = useUpdateCart();
  const { mutate: removeCart } = useDeleteCart();
  const handleDecrease = (cart_id: number, quan: number) => {
    if (quan <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: -1,
      token: token,
    });
    dispatch(decreaseQuantity(cart_id));
  };

  const handleIncrease = (cart_id: number) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: 1,
      token: token,
    });
    dispatch(increaseQuantity(cart_id));
  };

  const handleRemoveProduct = (cart_id: number, quantity: number) => {
    setRemovingItemId(cart_id);
    removeCart({
      cart_id,
      quantity,
      token: token,
    });
    dispatch(removeItem(cart_id));
  };
  if (isLoading) {
    return <CartLoadingSkeleton />;
  }
  if (isError) {
    return <div className="text-red-600">Error</div>;
  }
  const subtotal = items?.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  );
  const tax = items?.reduce((acc, item) => {
    const productTax =
      (item.unit_price * item.quantity * item.tax_percent) / 100;
    return acc + Math.round(productTax);
  }, 0);
  const discount = 0;
  const shipping =
    tax_detail?.min_amount <= subtotal ? 0 : tax_detail?.shipping_fee;

  const total = Math.round((subtotal + shipping ) - discount);

  return (
    <ScrollArea className="space-y-6 p-4  h-screen">
      <h2 className="text-lg font-bold text-title"> Cart</h2>
      {items?.length === 0 ? (
        <EmptyCart onClose={onClose} />
      ) : (
        <>
          {shipping === 0 && (
            <div className="space-y-1.5 mb-4">
              <p className="font-semibold   text-xs md:text-sm">
                🎉 Congrats!{" "}
                <span className="text-[#111411]">
                  You{"’"}ve earned free shipping!
                </span>
              </p>
              <div className="bg-primary h-2 rounded-2xl w-full"></div>
            </div>
          )}
          <ul>
            {items?.map((item, index) => {
              return (
                <>
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <img
                      src={item?.thumbnail_image_url}
                      alt="Product"
                      className="w-full sm:w-28 h-36 object-cover rounded-md border"
                    />

                    <div className="flex flex-col gap-y-2.5 flex-1">
                      <div className="flex justify-between items-start text-textPrimary">
                        <div>
                          <h3 className="font-semibold line-clamp-3 text-textPrimary text-base md:text-lg">
                            {item?.product_name}
                          </h3>

                          <p className="text-sm flex flex-wrap gap-x-2 items-center mt-0.5 text-[#939393]">
                            <span className="text-[13px]">1 unit</span> ₹
                            {item.unit_price}
                            <span className="hidden sm:inline border-l h-3 border-gray-300"></span>
                           
                            <span className="text-[13px]">Size</span>{" "}
                            {item?.units}
                          </p>

                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-base font-bold md:text-[22px] text-title">
                              ₹{Math.round(item.unit_price * item.quantity)}
                            </span>
                            {item.strike_through_price && (
                              <>
                                <span className="line-through text-sm text-gray-400">
                                  ₹{item.strike_through_price}
                                </span>
                                <span className="text-sm text-green-600 font-semibold">
                                  20% off
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-x-2 flex-wrap">
                        <div className="flex items-center gap-1 border px-3 py-1 rounded-lg">
                          <Button
                            variant="outline"
                            disabled={item?.quantity < 2}
                            size="icon"
                            className="border-none p-0 text-xl font-semibold w-6 h-6"
                            onClick={() =>
                              handleDecrease(item.cart_id, item.quantity)
                            }
                          >
                            −
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                            className="w-10 text-center border-none p-0 font-semibold"
                            min={1}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            disabled={item?.quantity >= item?.current_stock}
                            className="border-none p-0 text-xl font-semibold w-6 h-6"
                            onClick={() => handleIncrease(item.cart_id)}
                          >
                            +
                          </Button>
                        </div>

                        <button
                          onClick={() =>
                            handleRemoveProduct(item.cart_id, item?.quantity)
                          }
                          className="text-gray-500 hover:text-red-500"
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
                            Product only {item?.current_stock}{" "}
                            quantity available
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>

                  <hr className="my-4 border-gray-300" />
                </>
              );
            })}
          </ul>

          <div
            // style={{ boxShadow: "-10px -10px 30px -4px rgba(0,0,0,0.1)" }}
            className="py-2 mt-5 backdrop-blur-2xl"
          >
            <div className="space-y-2 text-sm font-medium text-title">
              <h3 className="font-semibold text-xl">Price Details</h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal - tax}</span>
              </div>
              <div className="flex justify-between items-start text-sm text-muted-foreground">
                <p className="flex flex-col leading-tight">
                  <span className="text-foreground font-medium">Tax</span>
                  <span className="text-xs">Inclusive of 18% tax</span>
                </p>
                <span className="text-foreground font-semibold text-base">
                  ₹{tax}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="">Shipping</span>
                <span
                  className={`font-semibold  ${
                    shipping === 0 ? "text-green-600 " : "text-primary"
                  } gap-x-1.5 flex items-center`}
                >
                  {shipping === 0 && (
                    <span className="text-xs  line-through text-lead">
                      {tax_detail?.shipping_fee}
                    </span>
                  )}
                  ₹{shipping === 0 ? shipping : shipping}
                </span>
              </div>
              {shipping === 0 ? (
                <span className=" text-green-600 font-semibold text-xs animate-pulse">
                  (Free Delivery 🎉)
                </span>
              ) : (
                <span className=" text-red-500 text-xs font-medium italic animate-shake">
                  (Spend ₹{tax_detail.min_amount - subtotal} more for free
                  shipping)
                </span>
              )}

              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between font-semibold text-base">
                <span className="font-semibold text-[#0B130B]">Total</span>
                <span className="text-[#0B130B] font-bold">₹{total}</span>
              </div>
              <Button
                className="w-full h-10  cursor-pointer"
                onClick={() => {
                  navigae("/checkout");
                  onClose(false);
                  queryClient.invalidateQueries({ queryKey: ["getcart"] });
                }}
              >
                Checkout{" "}
                {/* <ul className="flex -space-x-2 ">
              <li>
                <img src={ASSETS.PAYTM} alt="" className="w-6" />
              </li>
              <li>
                <img src={ASSETS.PHONEPAY} alt="" className="w-6" />
              </li>

              <li>
                <img src={ASSETS.GPAY} alt="" className="w-6" />
              </li>

              <li>
                <img src={ASSETS.FRAMEPAY} alt="" className="w-6" />
              </li>
            </ul>{" "} */}
              </Button>
            </div>
          </div>
        </>
      )}
    </ScrollArea>
  );
}
