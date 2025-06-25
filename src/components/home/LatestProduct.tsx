import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { useAddToCart } from "@/services/cart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
interface Props {
  title: string;
  Products: Product[];
}
export default function LatestProduct({ title, Products }: Props) {
  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  const dispatch = useDispatch();
  const { token ,status} = useSelector((state: RootState) => state.auth);

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
          <p className="text-title text-sm md:text-base cursor-pointer ">{title}</p>
          <p
            className="text-title text-sm md:text-base cursor-pointer hover:underline underline-primary"
            onClick={() =>
              // navigate("/products/latest-products", { state: { param: "is_featured=true" } })

              navigate("/products/latest-products?latest_product=true",{state:{title:'Latest Products'}})

            }
          >
            View more
          </p>
        </div>
      <ul className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-14 lg:gap-x-10 mt-4 md:mt-8">
          {Products?.slice(0, 5)?.map((item, index) => {
            return (
              <li key={index} className="space-y-2 relative">
                <img
                  src={item?.thumbnail_image_url}
                  alt={item?.product_name}
                className="w-52 h-44 md:w-[240px] md:h-[240px] rounded-lg md:rounded-[20px] object-cover mx-auto cursor-pointer"
                  onClick={() => navigate(`/product/${item.slug}`)}
                />
                <p
                  onClick={() => navigate(`/product/${item.slug}`)}
                className="text-title  hover:text-primary transition-colors duration-300 text-sm md:text-xl font-medium line-clamp-1 cursor-pointer"
                >
                  {item?.product_name}
                </p>
                <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-sm md:text-xl lato font-bold">
                    Rs. {item?.unit_price}
                  <span className="text-xs md:text-lg text-lead  font-normal line-through">
                      Rs. {item?.strike_through_price}
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
                    }}
                  className="rounded-md font-bold transition-all duration-300 ease-in-out md:px-5 md:py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-lg"
                  >
                  <ShoppingCart className="md:w-5 md:h-5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className="bg-primary relative p-1 h-24 lg:h-28 place-items-center  grid grid-cols-2 mt-10 mb-10 w-full">
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
          <p className="font-semibold text-title text-[14px] sm:text-[28px] md:text-[32px] flex  gap-x-1 flex-col md:flex-row text-center">
            Use Code :
            <span className="text-title font-bold text-[14px] sm:text-[28px] md:text-[32px]">
              NATURA20
            </span>
          </p>
        </div>
      </div> */}
    </div>
  );
}
