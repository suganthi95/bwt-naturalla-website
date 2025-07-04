import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useAddToCart } from "@/services/cart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
import { Ban } from "lucide-react";
interface Props {
  Products: Product[];
}
export default function TodayDeals({ Products }: Props) {
  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const { token, status } = useSelector((state: RootState) => state.auth);

  // const Prodcuts = [
  //   {
  //     id: "1",
  //     img: ASSETS.PRODUCT1,
  //     name: "Handmade Natural Face Gel",
  //     des: "ALOEVERA Face Gel | Moisturiser | Anti Aging | Exfoliation ",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  //   {
  //     id: "2",
  //     img: ASSETS.PRODUCT2,
  //     name: "Natural Face Wash",
  //     des: "Red Wine Face Wash - Brightening - Anti-oxidant - Hydration -pure natural",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  //   {
  //     id: "3",
  //     img: ASSETS.PRODUCT3,
  //     name: "Handmade Natural Soap Bar",
  //     des: "ALOE VERRA hand made bathing soap | Fades Dark Spots | Skin Moisturizer",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  // ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between font-semibold  items-center">
        <p className="text-title text-sm md:text-xl cursor-pointer ">
         Today's Offer
        </p>
        <p
          className="text-title text-sm md:text-xl cursor-pointer hover:underline underline-primary"
          onClick={() =>
            // navigate("/products/today-deals", { state: { isin_todays_deal: "true" } })

            navigate("/products/today-offer?isin_todays_deal=true", {
              state: { title: "Today Offer" },
            })
          }
        >
          View more
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8">
        {Products?.slice(0, 3)?.map((item, index) => {
          return (
            <li key={index} className="space-y-2 relative overflow-hidden">
              <img
                src={item.thumbnail_image_url}
                alt={item?.product_name}
                className="w-[388px] h-[388px] rounded-[16px] object-cover  mx-auto cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
              />
              <div className="  absolute bg-[#E95144] font-bold text-white rounded-r  group-hover:hidden text-sm  right-1 md:right-2 top-0  px-4 py-1">
                {Math.round(Number(item?.discount_percent))}% OFF
              </div>{" "}
              <p
                onClick={() => navigate(`/product/${item.slug}`)}
                className="text-primary font-medium cursor-pointer hover:text-primary transition-colors duration-300 text-xl"
              >
                {item.product_name}
              </p>
              <p className="text-lead font-medium text-lg line-clamp-1">
                {item.short_description}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-xl md:text-[32px] font-bold">
                  Rs. {item.unit_price}
                  <span className="text-sm md:text-lg text-lead  font-normal line-through">
                    Rs.{item?.strike_through_price}
                  </span>
                </p>
                {item?.current_stock > 0 ? (
                  <Button
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
                      setTimeout(() => setClicked(false), 300);
                    }}
                    className={`rounded-full font-semibold px-5 py-2 border transition-all duration-300 ease-in-out
        ${clicked ? "animate-glitch" : ""}
        bg-white text-primary border-primary hover:bg-primary hover:text-white hover:shadow-md hover:scale-105`}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="bg-red-100 text-red-500 cursor-not-allowed flex items-center gap-2"
                  >
                    <Ban className="w-4 h-4" />
                    Out of Stock
                  </Button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
