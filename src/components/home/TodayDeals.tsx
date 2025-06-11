import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useAddToCart } from "@/services/product";
interface Props {
  Products: Product[];
}
export default function TodayDeals({ Products }: Props) {
  const navigate = useNavigate();
  const {mutate} = useAddToCart()
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
        <p className="text-title cursor-pointer ">View more</p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8">
        {Products?.slice(0, 3)?.map((item, index) => {
          return (
            <li className="space-y-2 relative">
              <img
                src={item.thumbnail_image_url}
                alt={`img-${index}`}
                className="rounded-xl cursor-pointer w-full"
                onClick={() => navigate(`/product/${item.product_id}`)}
              />
              <div className="absolute bg-[#E95144] text-white rounded  text-sm font-medium top-4 left-3  px-4">
                20 % off
              </div>
              <p
                onClick={() => navigate(`/product/${item.product_id}`)}
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
                <Button onClick={()=>{
                  mutate({
                    product_id:item.product_id,
                    quantity:1
                  })
                }} className="rounded-full hover:bg-transparent cursor-pointer  px-5 bg-white text-primary border border-primary">
                  Add Cart
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
