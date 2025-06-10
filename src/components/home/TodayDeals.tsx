import { ASSETS } from "@/assets/assets";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function TodayDeals() {
  const naviage  =  useNavigate()
  const Prodcuts = [
    {
      id: "1",
      img: ASSETS.PRODUCT1,
      name: "Handmade Natural Face Gel",
      des: "ALOEVERA Face Gel | Moisturiser | Anti Aging | Exfoliation ",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
    {
      id: "2",
      img: ASSETS.PRODUCT2,
      name: "Natural Face Wash",
      des: "Red Wine Face Wash - Brightening - Anti-oxidant - Hydration -pure natural",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
    {
      id: "3",
      img: ASSETS.PRODUCT3,
      name: "Handmade Natural Soap Bar",
      des: "ALOE VERRA hand made bathing soap | Fades Dark Spots | Skin Moisturizer",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between font-semibold text-xl items-center">
        <p className="text-title cursor-pointer ">Todays Deals</p>
        <p className="text-title cursor-pointer ">View more</p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8">
        {Prodcuts.map((item, index) => {
          return (
            <li className="space-y-2 relative" onClick={()=>naviage('/product/12')}>
              <img src={item.img} alt={`img-${index}`} className="rounded-xl" />
              <div className="absolute bg-[#E95144] text-white rounded  text-sm font-medium top-4 left-3  px-4">20 % off</div>
              <p className="text-lead text-lg">{item.name}</p>
              <p className="text-primary font-medium text-xl">{item.des}</p>
              <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-[32px] font-bold">
                  {item.price}
                  <span className="text-2xl text-lead  font-normal line-through">{item.StrikeoutPrice}</span>
                </p>
                <Button className="rounded-full hover:bg-transparent cursor-pointer  px-5 bg-white text-primary border border-primary">Add Cart</Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
