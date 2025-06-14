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

  const [quantity, setQuantity] = useState(1);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const { mutate } = useUpdateCart();
  const { mutate: removeCart } = useDeleteCart();
  const handleDecrease = (cart_id: number) => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: -1,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
    });
    dispatch(decreaseQuantity(cart_id));
  };

  const handleIncrease = (cart_id: number) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: 1,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
    });
    dispatch(increaseQuantity(cart_id));
  };

  const handleRemoveProduct = (cart_id: number, quantity: number) => {
    setRemovingItemId(cart_id);
    removeCart({
      cart_id,
      quantity,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
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
  const tax = subtotal * 0.18;
  const discount = 0;
  const shipping =
    tax_detail.min_amount <= subtotal ? 0 : tax_detail.shipping_fee;

  const total = Math.round(subtotal + tax + shipping - discount);

  return (
    <ScrollArea className="space-y-6 p-4  h-screen">
      <h2 className="text-lg font-bold text-title"> Cart</h2>
      {shipping === 0 && (
        <div className="space-y-1.5 mb-4">
          <p className="font-semibold  text-sm">
            🎉 Congrats!
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
            <li key={index} className="flex gap-4 items-start   pb-4">
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
                        ₹{Math.round(item.unit_price * item.quantity)}
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
                  <div className="flex items-center gap-2 border w-fit  px-4 rounded-lg">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-none cursor-pointer  w-fit text-xl font-semibold"
                      onClick={() => handleDecrease(item.cart_id)}
                    >
                      {" −"}
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-10    font-semibold border-none text-center"
                      min={1}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer  border-none  w-fit text-xl font-semibold"
                      onClick={() => handleIncrease(item.cart_id)}
                    >
                      +
                    </Button>
                  </div>{" "}
                  <button
                    onClick={() =>
                      handleRemoveProduct(item.cart_id, item?.quantity)
                    }
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                  >
                    {removingItemId === item.cart_id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                    ) : (
                      <Icons.Remove />
                    )}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div style={{ boxShadow: '-10px -10px 30px -4px rgba(0,0,0,0.1)' }} className="py-2 mt-5 backdrop-blur-2xl">
        <div className="space-y-2 text-sm font-medium text-title">
          <h3 className="font-semibold text-xl">Price Details</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="">-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="">
              Shipping
              {shipping === 0 ? (
                <span className="ml-2 text-green-600 font-semibold animate-pulse">
                  (Free Delivery 🎉)
                </span>
              ) : (
                <span className="ml-2 text-red-500 text-xs font-medium italic animate-shake">
                  (Spend ₹{tax_detail.min_amount - subtotal} more for free
                  shipping)
                </span>
              )}
            </span>
            <span
              className={`font-semibold ${
                shipping === 0 ? "text-green-600" : "text-primary"
              }`}
            >
              ₹{shipping === 0 ? "0" : shipping}
            </span>
          </div>

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
    </ScrollArea>
  );
}
