import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/Home";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSortByAlphabetic } from "@/redux/slices/filterSlice";
import { useAddToCart } from "@/services/cart";
import { addItem } from "@/redux/slices/cartSlice";
import { toast } from "sonner";
interface Props {
  Products: Product[];
}
export default function ProductsList({ Products }: Props) {
  const {
    categories,
    keywords,
    maxPrice,
    minPrice,
    searchInput,
    sortByDate,
    sortByPrice,
    sorybyAlphabetic,
  } = useSelector((state: RootState) => state.filter);
  const [sortBy, setSortBy] = useState("a-z");
  const [filteredProducts, setFiltered] = useState<Product[]>();
  const { token, status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useAddToCart();
  useEffect(() => {
    let filtered = Products;

    if (keywords.length > 0) {
      filtered = filtered.filter((item) =>
        item.benefit_keys.some((key) => keywords.includes(key))
      );
    }

    filtered = filtered.filter(
      (item) => item.unit_price >= minPrice && item.unit_price <= maxPrice
    );

    if (categories.length > 0) {
      filtered = filtered.filter(
        (item) =>
          item.category_title && categories.includes(item.category_title)
      );
    }

    setFiltered(filtered);
  }, [
    categories,
    searchInput,
    keywords,
    maxPrice,
    minPrice,
    sortByDate,
    sortByPrice,
  ]);
  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-2xl">Products</h1>

        <div className="flex items-center gap-4">
          <h2 className="font-medium text-sm text-title">Sort By:</h2>
          <Select
            value={sortBy}
            onValueChange={(val) => {
              setSortBy;
              dispatch(setSortByAlphabetic(val));
            }}
          >
            <SelectTrigger className="min-w-[120px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a-z">A - Z</SelectItem>
              <SelectItem value="z-a">Z - A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className="grid md:grid-cols-4 gap-4">
        {filteredProducts
          ?.slice()
          ?.sort((a, b) => {
            if (sorybyAlphabetic === "a-z")
              return a.product_name.localeCompare(b.product_name);
            if (sorybyAlphabetic === "z-a")
              return b.product_name.localeCompare(a.product_name);
            if (sortByPrice === "price-asc") {
              return a.unit_price - b.unit_price;
            } else if (sortByPrice === "price-desc") {
              return b.unit_price - a.unit_price;
            }

            if (sortByDate === "date-asc") {
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              );
            } else if (sortByDate === "date-desc") {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              );
            }
            return 0;
          })
          .map((item, index) => (
            <li key={index} className="space-y-2 md:w-fit relative">
              <div className="relative w-fit mx-auto group">
                <motion.div
                  className="absolute top-2 right-2 z-10  text-primary"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Heart className="w-5 h-5 opacity-0 group-hover:opacity-100" />
                </motion.div>

                <img
                  src={item?.thumbnail_image_url}
                  alt={item?.product_name}
                  className="w-60 h-60 md:w-[240px] md:h-[240px] rounded-xl object-cover mx-auto cursor-pointer"
                  onClick={() => navigate(`/product/${item.slug}`)}
                />

                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-black cursor-pointer hover:bg-primary hover:text-white px-4 py-2 rounded-md font-semibold"
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
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>

              <p
                className="text-title hover:text-primary transition-colors duration-300 text-lg font-semibold line-clamp-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.slug}`)}
              >
                {item?.product_name.length > 12
                  ? `${item.product_name.slice(0, 12)}...`
                  : item.product_name}
                <span className="text-sm text-lead">
                  ({item?.product_size})
                </span>
              </p>

              <div className="flex flex-col ">
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
