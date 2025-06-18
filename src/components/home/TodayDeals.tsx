import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useAddToCart } from "@/services/cart";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
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
      <div className="flex justify-between font-semibold text-xl items-center">
        <p className="text-title cursor-pointer ">Todays Deals</p>
        <p
          className="text-title cursor-pointer hover:underline underline-primary"
          onClick={() =>
            navigate("/products", { state: { isin_todays_deal: "true" } })
          }
        >
          View more
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8">
        {Products?.slice(0, 3)?.map((item, index) => {
          return (
            <li key={index} className="space-y-2 relative">
              <img
                src={item.thumbnail_image_url}
                alt={item?.product_name}
                className="w-[388px] h-[388px] rounded-[16px] object-coover  mx-auto cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
              />

              <div className="absolute bg-[#E95144] text-white rounded  text-sm font-medium top-4 left-3  px-4">
                20 % off
              </div>
              <p
                onClick={() => navigate(`/product/${item.slug}`)}
                className="text-lead cursor-pointer hover:text-primary transition-colors duration-300 text-lg"
              >
                {item.product_name}
              </p>
              <p className="text-primary font-medium text-xl line-clamp-2">
                {item.short_description}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-[32px] font-bold">
                  Rs. {item.unit_price}
                  <span className="text-lg text-lead  font-normal line-through">
                    Rs.{item?.strike_through_price}
                  </span>
                </p>
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
