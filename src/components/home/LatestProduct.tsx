import { ASSETS } from "@/assets/assets";
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
export default function LatestProduct({ title, Products }: Props) {
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
    <div className="">
      <div className="container mx-auto">
        <div className="flex justify-between font-semibold text-xl items-center">
          <p className="text-title cursor-pointer ">{title}</p>
          <p className="text-title cursor-pointer ">View more</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 md:gap-x-14 lg:gap-x-20 mt-4 md:mt-8 mb-14 md:mb-20">
          {Products?.slice(0, 4)?.map((item, index) => {
            return (
              <li className="space-y-2 relative">
                <img
                  src={item?.thumbnail_image_url}
                  alt={`img-${index}`}
                  className="rounded-xl  cursor-pointer md:w-80"
                  onClick={() => navigate(`/product/${item.product_id}`)}
                />
                <p
                  onClick={() => navigate(`/product/${item.product_id}`)}
                  className="text-title text-xl  cursor-pointer hover:text-primary transition-colors duration-300 font-medium line-clamp-1"
                >
                  {item?.product_name}
                </p>
                <div className="flex items-center justify-between w-full">
                  <p className="flex items-center gap-x-2.5 text-textPrimary text-xl lato font-bold">
                    Rs. {item?.unit_price}
                    <span className=" text-lead  font-normal line-through">
                      Rs. {item?.strike_through_price}
                    </span>
                  </p>
  <Button
                  onClick={() => {
                    mutate({
                      product_id: item.product_id,
                      quantity: 1,
                      token:token
                                        });
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
      <div className="bg-primary relative p-1 h-24 lg:h-28 place-items-center  grid grid-cols-2 mt-10 mb-10 w-full">
        <div className="container mx-auto">
          <div className="absolute -top-12 md:-top-10 left-2 lg:left-20 bg-[#70BF44] text-white lato font-extrabold text-2xl rounded-full aspect-square size-24 lg:size-32 grid place-items-center rotate-[-20deg] shadow-lg">
            <div className="flex flex-col items-center justify-center leading-tight rotate-[-1deg]">
              <p className="tracking-wider text-sm md:text-xl">Flat</p>
              <p className="md:text-3xl">20 %</p>
              <p className="tracking-wider text-sm md:text-xl">OFF</p>
            </div>
          </div>
          <img
            src={ASSETS.ALOWERA_FRAME}
            alt="img"
            className="absolute w-8/12 z-50 2xl:w-1/4  lg:left-44 -top-10 lg:-top-24 "
          />
          <div className="absolute left-12 xl:left-96  top-7 ">
            <img
              src={ASSETS.PRODUCT_BANNER}
              alt="productbanner"
              className="w-3/12 -ml-10"
            />
            <div className="absolute top-2 flex items-center justify-center">
              <p className="text-primary text-sm sm:text-lg  font-semibold text-center">
                Aloevera Moisturizer
              </p>
            </div>{" "}
          </div>
        </div>
        <div className="p-2 px-4 h-auto sm:h-14 w-full sm:w-7/12 rounded-xl bg-white border-2 border-dashed border-black flex items-center justify-center">
          <p className="font-semibold text-title text-[20px] sm:text-[28px] md:text-[32px] flex  gap-x-2 text-center">
            Use Code :
            <span className="text-title font-bold text-[20px] sm:text-[28px] md:text-[32px]">
              NATURA20
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
