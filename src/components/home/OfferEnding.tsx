import type { RootState } from "@/redux/store";
import { useAddToCart } from "@/services/cart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/types/Home";
import { addItem } from "@/redux/slices/cartSlice";

interface Props {
  products: Product[];
}

export default function OfferEnding({ products }: Props) {

  const navigate = useNavigate();
  const { mutate } = useAddToCart();
  const dispatch = useDispatch();
  const { token, status } = useSelector((state: RootState) => state.auth);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between font-semibold text-xl items-center">
        <p className="text-title text-sm md:text-base cursor-pointer ">
          Offer Ending Soon</p>
        <p
          className="text-title text-sm md:text-base cursor-pointer hover:underline underline-primary"
          onClick={() =>
            // navigate("/products/offer-ending-soon", { state: { offer_ending_soon: "true" } })
            navigate("/products/offer-ending-soon?offer_ending_soon=true",{state:{title:'Offer ending Soon'}})
          }
        >
          View more
        </p>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 md:gap-14 lg:gap-x-10 mt-4 md:mt-8">
        {products?.slice(0, 5)?.map((item, index) => {
          return (
            <li key={index} className="space-y-2 relative">
              <img
                src={item?.thumbnail_image_url}
                alt={item?.product_name}
                className="w-52 h-44 md:w-[240px] md:h-[240px] rounded-lg md:rounded-[20px] object-cover mx-auto cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
              />

              <p
                className="text-title  hover:text-primary transition-colors duration-300 text-sm md:text-xl font-medium line-clamp-1 cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.slug}`);
                }}
              >
                {item?.product_name}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="flex items-center gap-x-2.5 text-textPrimary text-sm md:text-xl lato font-bold">
                  Rs. {item?.unit_price}
                  <span className="text-xs md:text-lg text-lead  font-normal line-through">
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
  );
}
