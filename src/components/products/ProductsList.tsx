import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
interface Props {
  Products: Product[];
}
export default function ProductsList({ Products }: Props) {
  //   const { items } = useSelector((state: RootState) => state.cart)
  const [sortBy, setSortBy] = useState("a-z");
  const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { mutate } = useAddToCart();
  return (
    <div className="space-y-4 w-full">
      <h1 className="font-semibold text-2xl">Products</h1>

      <div className="flex  flex-row w-full items-center gap-4">
        <h2 className="font-medium text-sm text-title">Sort By:</h2>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a-z">A - Z</SelectItem>
            <SelectItem value="z-a">Z - A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ul className="grid md:grid-cols-4 gap-4">
        {Products?.slice()
          ?.sort((a, b) => {
            if (sortBy === "a-z")
              return a.product_name.localeCompare(b.product_name);
            if (sortBy === "z-a")
              return b.product_name.localeCompare(a.product_name);
            return 0;
          })
          .map((item, index) => (
            <li className="space-y-2 md:w-fit relative ">
              <img
                src={item?.thumbnail_image_url}
                alt={`img-${index}`}
                className="rounded-xl md:w-60 mx-auto cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.product_id}`);
                }}
              />

              <p
                className="text-title hover:text-primary transition-colors duration-300 text-xl font-medium line-clamp-1 cursor-pointer"
                onClick={() => {
                  navigate(`/product/${item.product_id}`);
                }}
              >
                {item?.product_name.length > 12
                  ? `${item.product_name.slice(0, 12)}...`
                  : item.product_name}
              </p>

              <div className="flex flex-col items-center">
                <p className="text-textPrimary text-xl lato font-bold">
                  Rs. {item?.unit_price}
                  <span className="text-lg text-lead font-normal line-through ml-2">
                    Rs. {item?.strike_through_price}
                  </span>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
