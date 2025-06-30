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
import { AnimatePresence, motion } from "framer-motion";
import { Eye, FunnelPlus, Heart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { setSortByAlphabetic } from "@/redux/slices/filterSlice";
import { useAddToCart } from "@/services/cart";
import { addItem } from "@/redux/slices/cartSlice";
import { toast } from "sonner";
import { useAddToWishList, useDeleteWishlist } from "@/services/whistlist";
import { addWishItem, removeWishlistItem } from "@/redux/slices/wishSlice";
import NoProducts from "./NoProducts";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import FilterSidebar from "./FilterSidebar";
import { useFilterValues } from "@/services/product";
interface Props {
  Products: Product[];
  title: string | null;
}
export default function ProductsList({ Products, title }: Props) {
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
  const { data } = useFilterValues(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useAddToCart();
  const { mutate: addWishlist } = useAddToWishList();
  const { mutate: deleteWishlist } = useDeleteWishlist();
  const [likedProducts, setLikedProducts] = useState<{ [id: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const initialLikes = Products.reduce((acc, product) => {
      acc[product.product_id] = !!product.in_wishlist;
      return acc;
    }, {} as { [id: number]: boolean });

    setLikedProducts(initialLikes);
  }, [Products]);

  useEffect(() => {
    let filtered = Products;

    if (keywords.length > 0) {
      filtered = filtered?.filter((item) =>
        item.benefit_keys?.some((key) => keywords.includes(key))
      );
    }

    filtered = filtered?.filter(
      (item) => item.unit_price >= minPrice && item.unit_price <= maxPrice
    );

    if (categories.length > 0) {
      filtered = filtered?.filter(
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
      <div className="flex  flex-col  lg:flex-row justify-between xl:items-center w-full">
        <h1 className="font-semibold text-2xl">{title ? title : "Products"}</h1>

        <div className="flex justify-between items-center xl:gap-4">
          <Sheet>
            <SheetTrigger className="flex  lg:hidden  items-center gap-x-1.5">
              <FunnelPlus />{" "}
              <span className="text-title text-sm font-medium">Filter</span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="[&>button]:hidden overflow-y-auto  p-4"
            >
              <SheetHeader className="p-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Filters</h2>

                  <SheetClose>
                    <X />
                  </SheetClose>
                </div>
              </SheetHeader>
              <FilterSidebar filterValues={data} />
            </SheetContent>
          </Sheet>

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
      </div>
      {filteredProducts?.length === 0 ? (
        <NoProducts />
      ) : (
        <ul className="grid grid-cols-2   md:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-4 xl:gap-4">
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
            .map((item, index) => {
              const isLiked = likedProducts[item.product_id];
              return (
                <li
                  key={index}
                  className="w-full   md:w-fit space-y-3 xl:p-3 relative overflow-hidden "
                >
                  <div
                    className="relative w-full cursor-pointer overflow-hidden transition-all duration-300"
                    // onClick={() => navigate(`/product/${item.slug}`)}
                  >
                    <div className="absolute top-2 right-2 z-20 flex flex-col items-center gap-2 lg:hidden">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#ECF9EB] rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                      >
                        <button
                          onClick={() => {
                            if (!status) {
                              toast.error("Please login to continue");
                              navigate("/login");
                              return;
                            }

                            setLikedProducts((prev) => ({
                              ...prev,
                              [item.product_id]: !prev[item.product_id],
                            }));

                            if (!isLiked) {
                              addWishlist({
                                product_id: item.product_id,
                                quantity: 1,
                                token,
                              });
                              dispatch(addWishItem(item));
                            } else {
                              deleteWishlist({
                                cart_id: item.product_id,
                                token,
                              });
                              dispatch(removeWishlistItem(item.cart_id));
                            }
                          }}
                          className="w-full h-full flex items-center justify-center relative"
                        >
                          <motion.div
                            initial={false}
                            animate={{ scale: isLiked ? 1.3 : 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                            }}
                          >
                            <Heart
                              className={`w-4 h-4 transition-colors duration-300 ${
                                isLiked
                                  ? "fill-red-500 text-red-500"
                                  : "text-primary"
                              }`}
                            />
                          </motion.div>

                          <AnimatePresence>
                            {isLiked && (
                              <motion.div
                                key="pulse"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute w-5 h-5 rounded-full bg-red-500"
                              />
                            )}
                          </AnimatePresence>
                        </button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#ECF9EB] rounded-full w-6 h-6 flex items-center justify-center shadow-md"
                      >
                        <button
                          onClick={() => navigate(`/product/${item.slug}`)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                      </motion.div>
                    </div>

                    <div className="group relative">
                      <div className=" group-hover:h-44  w-full h-40 sm:h-60 md:w-[240px] md:h-[240px] rounded-xl overflow-hidden transition-all duration-300">
                        <img
                          src={item?.thumbnail_image_url}
                          alt={item?.product_name}
                          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:rotate-3"
                        />
                        <div className=" hidden lg:block absolute bg-[#009951] font-bold text-white rounded  group-hover:hidden text-sm  -right-1 top-0  px-4 py-1">
                          {Math.round(Number(item?.discount_percent))}% OFF
                        </div>{" "}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                        <div className="absolute  lg:block space-y-3 flex top-3 -right-8 duration-300  transition-all items-center justify-center flex-col group-hover:right-3 z-20">
                          <motion.div
                            whileHover={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="bg-white rounded-full  grid place-items-center size-7 shadow-md"
                          >
                            <button
                              onClick={() => {
                                if (!status) {
                                  toast.error("Please login to continue");
                                  navigate("/login");
                                  return;
                                }

                                setLikedProducts((prev) => ({
                                  ...prev,
                                  [item.product_id]: !prev[item.product_id],
                                }));

                                if (!isLiked) {
                                  addWishlist({
                                    product_id: item.product_id,
                                    quantity: 1,
                                    token,
                                  });
                                  dispatch(addWishItem(item));
                                } else {
                                  deleteWishlist({
                                    cart_id: item.product_id,
                                    token,
                                  });
                                  dispatch(removeWishlistItem(item.cart_id));
                                }
                              }}
                              className="w-7 h-7 cursor-pointer flex items-center justify-center relative"
                            >
                              <motion.div
                                initial={false}
                                animate={{ scale: isLiked ? 1 : 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 10,
                                }}
                              >
                                <Heart
                                  className={`w-5 h-5 transition-colors duration-300 ${
                                    isLiked
                                      ? "fill-red-500 text-red-500"
                                      : "text-black"
                                  }`}
                                />
                              </motion.div>

                              <AnimatePresence>
                                {isLiked && (
                                  <motion.div
                                    key="pulse"
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute w-5 h-5 rounded-full bg-red-500"
                                  />
                                )}
                              </AnimatePresence>
                            </button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className=""
                          >
                            <button
                              onClick={() =>
                                // setViewImage(item?.thumbnail_image_url)
                                navigate(`/product/${item.slug}`)
                              }
                              className="bg-white size-7 cursor-pointer  grid place-items-center rounded-full"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </motion.div>
                        </div>
                      </div>
                      <div className="absolute bottom-2  left-1/2 -translate-x-1/2 w-[90%] hidden lg:group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="flex-1 bg-primary cursor-pointer text-white py-2 rounded-md font-medium hover:bg-primary"
                          onClick={() => {
                            if (status) {
                              mutate({
                                product_id: item.product_id,
                                quantity: 1,
                                token,
                              });
                              dispatch(addItem(item));
                            } else {
                              toast.error("Please login to continue");
                              navigate("/login");
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="block lg:hidden mt-2">
                    <button
                      className="w-full bg-primary text-white px-4 py-2 rounded-md font-semibold"
                      onClick={() => {
                        if (status) {
                          mutate({
                            product_id: item.product_id,
                            quantity: 1,
                            token,
                          });
                          dispatch(addItem(item));
                        } else {
                          toast.error("Please login to continue");
                          navigate("/login");
                        }
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex flex-col items-center gap-x-1.5">
                    <p
                      className="text-title hover:text-primary transition text-sm sm:text-lg   font-semibold line-clamp-1 cursor-pointer"
                      onClick={() => navigate(`/product/${item.slug}`)}
                    >
                      {item?.product_name}
                    </p>
                    {item?.units && (
                      <p className="text-xs md:hidden truncate font-medium text-lead text-right">
                        ({item.units})
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row items-center justify-between gap-1 sm:gap-0">
                    <p className="text-textPrimary text-sm sm:text-lg font-bold">
                      Rs. {item?.unit_price}
                      {item?.strike_through_price && (
                        <span className="text-xs sm:text-sm text-lead font-normal line-through ml-2">
                          Rs. {item?.strike_through_price}
                        </span>
                      )}
                    </p>
                    {item?.units && (
                      <p className="hidden  md:block text-sm font-medium text-lead text-right">
                        ({item.units})
                      </p>
                    )}
                    <div className="  md:hidden  text-[#009951] font-bold  rounded   text-xs ">
                      {Math.round(Number(item?.discount_percent))}% OFF
                    </div>{" "}
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}
