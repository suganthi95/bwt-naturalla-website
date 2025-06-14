import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useAddToCart } from "@/services/cart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
interface Props {
  title: string;
  Products: Product[];
}
export default function BestSelling({ title, Products }: Props) {
  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  const dispatch = useDispatch()
    const {token} = useSelector((state:RootState)=>state.auth)
  // const Prodcuts = [
  //   {
  //     id: "1",
  //     img: ASSETS.PRODUCT1,
  //     name: "Red Wine Face Wash …",
  //     des: "ALOEVERA Face Gel | Moisturiser | Anti Aging | Exfoliation ",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  //   {
  //     id: "2",
  //     img: ASSETS.PRODUCT2,
  //     name: "Red Wine Face Wash …",
  //     des: "Red Wine Face Wash - Brightening - Anti-oxidant - Hydration -pure natural",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  //   {
  //     id: "3",
  //     img: ASSETS.PRODUCT3,
  //     name: "Red Wine Face Wash …",
  //     des: "ALOE VERRA hand made bathing soap | Fades Dark Spots | Skin Moisturizer",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  //   {
  //     id: "4",
  //     img: ASSETS.PRODUCT2,
  //     name: "Red Wine Face Wash …",
  //     des: "Red Wine Face Wash - Brightening - Anti-oxidant - Hydration -pure natural",
  //     price: "Rs. 168",
  //     StrikeoutPrice: "Rs 158",
  //   },
  // ];
  return (
    <div className="container mx-auto">
      <div className="flex justify-between font-semibold text-xl items-center">
        <p className="text-title cursor-pointer ">{title}</p>
        <p className="text-title cursor-pointer ">View more</p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8">
        {Products?.slice(0, 4)?.map((item, index) => {
          return (
            <li className="space-y-2 relative">
              <img
                src={item?.thumbnail_image_url}
                alt={`img-${index}`}
                className="rounded-xl md:w-80 cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.product_id}`);
                }}
              />
              <p
                className="text-title  hover:text-primary transition-colors duration-300 text-xl font-medium line-clamp-1 cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.product_id}`);
                }}
              >
                {item?.product_name}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-xl lato font-bold">
                  Rs. {item?.unit_price}
                  <span className="text-lg text-lead  font-normal line-through">
                    Rs.{item?.strike_through_price}
                  </span>
                </p>
                <Button
                  onClick={() => {
                    mutate({
                      product_id: item.product_id,
                      quantity: 1,
                      token:token                    });
                    dispatch(addItem(item))
                  }}
                  className="rounded-md font-bold transition-all duration-300 ease-in-out px-5 py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
