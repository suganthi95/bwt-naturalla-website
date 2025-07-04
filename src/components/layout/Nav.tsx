import Slider from "react-slick";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Heart,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavData } from "./data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ASSETS } from "../../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartSheet from "../addToCartProducts/CartSheet";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuToggle from "@/animation/MenuToggle";
import { useGetCartItems } from "@/services/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItems,
  setCartItems,
  setTaxDetails,
} from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useGetWishListItems } from "@/services/whistlist";
import WishlistItemes from "../wishlist/WishlistItemes";
import { removeWishlist, setWishItems } from "@/redux/slices/wishSlice";
import { useGetCategories } from "@/services/home";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfileInfo } from "@/services/profile";
const messages = [
  "🎉 Flat 30% Off on Selected Products | Use Code : DEAL30 🎉",
  "🚚 Free Shipping on Orders Above ₹999 🚚",
  "🔥 New Deals Every Day — Don't Miss Out! 🔥",
];

export default function Nav() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [IsProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const { items: wishlistitems } = useSelector(
    (state: RootState) => state.wish
  );

  const { data, isSuccess, isLoading, isError, isFetching } = useGetCartItems(
    auth?.token
  );
  const { data: profileInfo } = useGetProfileInfo(auth?.token);

  const { data: categories } = useGetCategories(auth.token);
  const {
    data: wishlist,
    isSuccess: iswishisSuccess,
    isLoading: iswishishLoading,
    isError: iswishishError,
    isFetching: iswishishFetching,
  } = useGetWishListItems(auth?.token);
  const [Isopen, setIsopen] = useState(false);
  const [IsopenWishlist, setIsopenWishlist] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    dispatch(setCartItems(data?.data));
    dispatch(setTaxDetails(data?.tax_detail));
  }, [data, isSuccess]);

  useEffect(() => {
    dispatch(setWishItems(wishlist?.data));
  }, [wishlist, iswishisSuccess]);
  const settings = {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const [IsMenuopen, setIsMenuopen] = useState<boolean>(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [openMobileDropdownId, setOpenMobileDropdownId] = useState<
    string | null
  >(null);

  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // const handleclick = () => {
  //   setIsMenuopen((prev) => !prev);
  // };
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === "Enter" && searchTerm.trim()) {
  //     navigate(`/products/${searchTerm}`, {
  //       state: { product_name: searchTerm },
  //     });

  //     navigate(`/products/by-search?product_name=${searchTerm}`);
  //   }
  // };

  const handleSearchSubmit = () => {
    navigate(`/products/${searchTerm}`, {
      state: { product_name: searchTerm },
    });
  };

  // const [hidden, Sethidden] = useState<boolean>(false);

  const handleclick = () => {
    setIsMenuopen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      // navigate(`/products/${searchTerm}`, { state: { product_name: searchTerm } })

      navigate(`/products/by-search?product_name=${searchTerm}`);
    }
  };
  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const previous = scrollY.getPrevious() ?? 0;
  //   if (latest > previous && latest > 200) {
  //     Sethidden(true);
  //   } else {
  //     Sethidden(false);
  //   }
  // });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      // animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky top-0 z-50"
    >
      <div className="w-full bg-primary  mx-auto px-4 py-1 overflow-hidden">
        <Slider {...settings}>
          {messages.map((msg, index) => (
            <div key={index}>
              <p className="text-center text-menu text-xs md:text-sm font-semibold truncate">
                {msg}
              </p>
            </div>
          ))}
        </Slider>
      </div>

      <motion.nav className=" py-5 bg-offWhite">
        <div className="container mx-auto ">
          <div className="flex  items-center justify-between  ">
            <div className="flex items-center">
              <div className="flex xl:hidden items-center gap-3">
                <MenuToggle open={IsMenuopen} handleclick={handleclick} />
              </div>
              <img
                onClick={() => navigate("/")}
                src={ASSETS.LOGO}
                alt="hero-image"
                className="w-24 md:w-40"
              />
            </div>
            <ul className="xl:flex items-center hidden  justify-center gap-x-7">
              {NavData.map((item, index) => {
                const IsDropDown = [2, 3, 4].includes(index);

                return (
                  <li key={item.id} className="relative">
                    {IsDropDown ? (
                      <div
                        onMouseEnter={() => setOpenDropdownId(item.id)}
                        onMouseLeave={() => setOpenDropdownId(null)}
                        className="relative"
                      >
                        <Popover open={openDropdownId === item.id}>
                          <PopoverTrigger asChild>
                            <button
                              className={`text-primary font-semibold flex items-center gap-x-1 tracking-wide py-2 cursor-pointer ${
                                pathname === item.link
                                  ? "font-bold underline underline-offset-8 decoration-2"
                                  : "font-normal no-underline"
                              }`}
                            >
                              {item.name}
                              {openDropdownId === item.id ? (
                                <ChevronUp className="w-3" />
                              ) : (
                                <ChevronDown className="w-3" />
                              )}
                            </button>
                          </PopoverTrigger>

                          <PopoverContent
                            align="start"
                            className="-mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-50"
                            sideOffset={8}
                            avoidCollisions={false}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-4"
                            >
                              {categories
                                ?.filter((cat: any) =>
                                  cat.category_title.includes(item.name)
                                )
                                ?.map((category: any) => (
                                  <div key={category.category_id}>
                                    <p
                                      onClick={() => {
                                        queryClient.invalidateQueries({
                                          queryKey: ["filterbyfeature"],
                                        });
                                        navigate(
                                          `/products/${category.category_title}?category=${category.category_id}&sub=${category.category_title}`,
                                          {
                                            state: {
                                              category_id: `${category.category_id}`,
                                              title: `${category.category_title}`,
                                            },
                                          }
                                        );
                                        setOpenDropdownId(null);
                                      }}
                                      className="text-sm font-semibold text-gray-800 cursor-pointer"
                                    >
                                      {category.category_title}
                                    </p>
                                    <ul className="ml-2 mt-2 space-y-1">
                                      {category?.subcategories?.map(
                                        (sub: any) => (
                                          <li key={sub.subcategory_id}>
                                            <Link
                                              onClick={() => {
                                                queryClient.invalidateQueries({
                                                  queryKey: ["filterbyfeature"],
                                                });
                                                setOpenDropdownId(null);
                                              }}
                                              to={`/products/${sub.subcategory_name.toLowerCase()}?category_id=${
                                                category.category_id
                                              }&subcategory_id=${
                                                sub.subcategory_id
                                              }`}
                                              state={{
                                                title: sub.subcategory_name,
                                              }}
                                              className="text-sm text-gray-600 hover:text-primary transition"
                                            >
                                              {sub.subcategory_name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                ))}
                            </motion.div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : [0, 5].includes(index) ? (
                      <button
                        onClick={() => {
                          if (index === 5) {
                            queryClient.invalidateQueries({
                              queryKey: ["filterbyfeature"],
                            });
                            navigate(
                              "/products/combo?best_selling=true",
                              { state: { title: "Combo's" } }
                            );
                          } else {
                            queryClient.invalidateQueries({
                              queryKey: ["filterbyfeature"],
                            });
                            navigate(
                              "/products/today-offer?isin_todays_deal=true",
                              { state: { title: "Today's Offer" } }
                            );
                          }
                        }}
                        className={`text-primary font-semibold cursor-pointer tracking-wide py-2 ${
                          pathname === "/products/best-selling"
                            ? "font-bold underline underline-offset-8 decoration-2"
                            : "font-normal no-underline"
                        }`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        onClick={() =>
                          queryClient.invalidateQueries({
                            queryKey: ["filterbyfeature"],
                          })
                        }
                        to={item.link}
                        className={`text-primary font-semibold tracking-wide py-2 ${
                          pathname === item.link
                            ? "font-bold underline underline-offset-8 decoration-2"
                            : "font-normal no-underline"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-10 pr-8 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setIsMobileSearchOpen((prev) => !prev)}
                className="block md:hidden"
              >
                <Search className="w-5 h-5 text-primary transition" />
              </button>
              <Sheet open={IsopenWishlist} onOpenChange={setIsopenWishlist}>
                <SheetTrigger
                  className="cursor-pointer relative"
                  onClick={() => setIsopenWishlist(true)}
                >
                  <Heart className="w-5 h-5 text-primary transition" />

                  {Array.isArray(wishlistitems) && wishlistitems.length > 0 && (
                    <span className="absolute -top-1   -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {wishlistitems.length}
                    </span>
                  )}
                </SheetTrigger>

                <SheetContent>
                  <WishlistItemes
                    onClose={setIsopenWishlist}
                    isLoading={iswishishLoading}
                    isError={iswishishError}
                    isFetching={iswishishFetching}
                    Product={wishlist?.data}
                  />
                </SheetContent>
              </Sheet>
              <Sheet open={Isopen} onOpenChange={setIsopen}>
                <SheetTrigger
                  className="cursor-pointer relative"
                  onClick={() => setIsopen(true)}
                >
                  <ShoppingCart className="w-5 h-5 text-primary transition" />
                  {Array.isArray(items) && items.length > 0 && (
                    <span className="absolute -top-1   -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </SheetTrigger>

                <SheetContent>
                  <CartSheet
                    onClose={setIsopen}
                    isLoading={isLoading}
                    isError={isError}
                    isFetching={isFetching}
                    Product={data}
                  />
                </SheetContent>
              </Sheet>
              {auth.status ? (
                <Popover open={IsProfile} onOpenChange={setIsProfile}>
                  <PopoverTrigger asChild>
                    {profileInfo && profileInfo[0]?.profile_pic ? (
                      <Avatar className="w-8 h-8 cursor-pointer bg-primary">
                        <AvatarImage
                          src={profileInfo && profileInfo[0]?.profile_pic}
                          alt="profile"
                        />
                        {auth?.status && (
                          <AvatarFallback className="bg-primary text-white font-semibold">
                            {auth.first_name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ) : (
                      <Avatar className="w-8 h-8 cursor-pointer bg-primary">
                        <AvatarImage
                          src={
                            "https://ik.imagekit.io/nd8r7mpaev/Atlants/user.png?updatedAt=1738227108834"
                          }
                          alt="profile"
                        />
                      </Avatar>
                    )}
                  </PopoverTrigger>

                  <PopoverContent
                    sideOffset={8}
                    className="z-50 w-56 rounded-xl bg-white shadow-xl p-4 outline-none"
                    asChild
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-2">
                        {auth.status && (
                          <>
                            <p className="text-sm font-medium text-gray-800">
                              Welcome, {auth?.first_name}
                            </p>
                            <hr />
                          </>
                        )}
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <Link
                            onClick={() => setIsProfile(false)}
                            to="/my-profile"
                            className="block hover:text-primary"
                          >
                            Profile
                          </Link>
                          {auth?.status ? (
                            <p
                              onClick={() => {
                                dispatch(logout());
                                dispatch(removeCartItems());
                                dispatch(removeWishlist());
                                setIsProfile(false);
                                toast.success("logout successfull");
                              }}
                              className="block cursor-pointer w-full text-left hover:text-red-500"
                            >
                              Logout
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                navigate("/login");
                              }}
                              className="block cursor-pointer w-full text-left hover:text-primary"
                            >
                              Login
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button onClick={() => navigate("/login")}>Login</Button>
              )}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block md:hidden px-4 pb-4 pt-3 w-full bg-white z-50 shadow-sm"
            >
              <div className="relative mb-3">
                <input
                  type="search"
                  inputMode="search"
                  enterKeyHint="search"
                  autoFocus
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <button
                onClick={() => {
                  handleSearchSubmit();
                  setIsMobileSearchOpen(false);
                }}
                className="w-full bg-primary text-white py-2 rounded-full text-sm font-medium active:scale-[0.98] transition"
              >
                Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {IsMenuopen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg xl:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold text-neutral-800">Menu</h2>
              <button
                onClick={() => setIsMenuopen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <span className="sr-only">Close menu</span>✕
              </button>
            </div>

            {/* <ul className="flex flex-col px-4 py-6 gap-4">
              {NavData.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => setIsMenuopen(false)}
                  className={`text-base text-neutral-800 transition-colors duration-200 ${
                    pathname === item.link
                      ? "font-semibold text-primary underline underline-offset-4 decoration-primary"
                      : "hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </ul> */}
            <ul className="flex flex-col px-4 py-6 gap-4">
              {NavData.map((item, index) => {
                const isDropdownOpen = openMobileDropdownId === item.id;
                const IsDropDown = [2, 3, 4].includes(index);

                if (IsDropDown) {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <button
                        onClick={() =>
                          setOpenMobileDropdownId(
                            isDropdownOpen ? null : item.id
                          )
                        }
                        className={`flex justify-between items-center text-base text-neutral-800 w-full ${
                          pathname === item.link
                            ? "font-semibold text-primary underline underline-offset-4"
                            : "hover:text-primary"
                        }`}
                      >
                        {item.name}
                        {isDropdownOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 mt-2 flex flex-col gap-2"
                          >
                            {categories
                              ?.filter((cat: any) =>
                                cat.category_title.includes(item.name)
                              )
                              ?.map((category: any) => (
                                <div key={category.category_id}>
                                  <p
                                    onClick={() => {
                                      queryClient.invalidateQueries({
                                        queryKey: ["filterbyfeature"],
                                      });
                                      navigate(
                                        `/products/${category.category_title}?category=${category.category_id}&sub=${category.category_title}`,
                                        {
                                          state: {
                                            category_id: `${category.category_id}`,
                                            title: `${category.category_title}`,
                                          },
                                        }
                                      );
                                      setOpenMobileDropdownId(null);
                                      setIsMenuopen(false);
                                    }}
                                    className="text-sm font-medium text-gray-700"
                                  >
                                    {category.category_title}
                                  </p>
                                  <ul className="ml-2 mt-1 space-y-1">
                                    {category?.subcategories?.map(
                                      (sub: any) => (
                                        <li key={sub.subcategory_id}>
                                          <Link
                                            onClick={() => {
                                              queryClient.invalidateQueries({
                                                queryKey: ["filterbyfeature"],
                                              });
                                              setOpenMobileDropdownId(null);
                                              setIsMenuopen(false);
                                            }}
                                            to={`/products/${sub.subcategory_name.toLowerCase()}?category_id=${
                                              category.category_id
                                            }&subcategory_id=${
                                              sub.subcategory_id
                                            }`}
                                            state={{
                                              title: `${sub.subcategory_name}`,
                                            }}
                                            className="text-sm text-gray-600 hover:text-primary transition"
                                          >
                                            {sub.subcategory_name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if ([0, 5].includes(index)) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        queryClient.invalidateQueries({
                          queryKey: ["filterbyfeature"],
                        });
                        if (index === 5) {
                          navigate("/products/combo`s?best_selling=true", {
                            state: { title: "Combo's" },
                          });
                        } else {
                          navigate(
                            "/products/today-offer?isin_todays_deal=true",
                            {
                              state: { title: "Today's Offer" },
                            }
                          );
                        }
                        setIsMenuopen(false);
                      }}
                      className={`text-base text-neutral-800 text-left ${
                        pathname === item.link
                          ? "font-semibold text-primary underline underline-offset-4"
                          : "hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={() => {
                      queryClient.invalidateQueries({
                        queryKey: ["filterbyfeature"],
                      });
                      setIsMenuopen(false);
                    }}
                    className={`text-base text-neutral-800 ${
                      pathname === item.link
                        ? "font-semibold text-primary underline underline-offset-4"
                        : "hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Custom Arrow Components
function CustomPrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 cursor-pointer"
    >
      <ChevronLeft className="text-white w-4 h-4" />
    </div>
  );
}

function CustomNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 cursor-pointer"
    >
      <ChevronRight className="text-white w-4 h-4" />
    </div>
  );
}
