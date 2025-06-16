import Slider from "react-slick";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingCart,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavData } from "./data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ASSETS } from "../../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartSheet from "../addToCartProducts/CartSheet";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import MenuToggle from "@/animation/MenuToggle";
import { useGetCartItems } from "@/services/cart";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems, setTaxDetails } from "@/redux/slices/cartSlice";
import type { RootState } from "@/redux/store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useGetWishListItems } from "@/services/whistlist";
import WishlistItemes from "../wishlist/WishlistItemes";
import { setWishItems } from "@/redux/slices/wishSlice";
const messages = [
  "🎉 Flat 30% Off on Selected Products | Use Code : DEAL30 🎉",
  "🚚 Free Shipping on Orders Above ₹999 🚚",
  "🔥 New Deals Every Day — Don't Miss Out! 🔥",
];

export default function Nav() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
    const { items:wishlistitems } = useSelector((state: RootState) => state.wish);

  const { data, isSuccess, isLoading, isError, isFetching } = useGetCartItems(
    auth?.token
  );
  const {
    data: wishlist,
    isSuccess: iswishisSuccess,
    isLoading: iswishishLoading,
    isError: iswishishError,
    isFetching: iswishishFetching,
  } = useGetWishListItems(auth?.token);
  const [Isopen, setIsopen] = useState(false);
  const [IsopenWishlist, setIsopenWishlist] = useState(false);

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
  const [hidden, Sethidden] = useState<boolean>(false);
  const handleclick = () => {
    setIsMenuopen((prev) => !prev);
  };
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 200) {
      Sethidden(true);
    } else {
      Sethidden(false);
    }
  });
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className=""
    >
      {/* offer slider  */}
      <div className="w-full bg-primary  mx-auto px-4 py-1 overflow-hidden">
        <Slider {...settings}>
          {messages.map((msg, index) => (
            <div key={index}>
              <p className="text-center text-menu text-sm font-semibold truncate">
                {msg}
              </p>
            </div>
          ))}
        </Slider>
      </div>
      {/* navbar */}

      <motion.nav className=" py-5 bg-offWhite">
        <div className="container mx-auto ">
          <div className="flex  items-center justify-between  xl:px-10">
            {/* <div className="xl:hidden">
              <Menu />
            </div> */}
            <div className="flex items-center gap-3">
              <MenuToggle open={IsMenuopen} handleclick={handleclick} />
            </div>
            <img
              onClick={() => navigate("/")}
              src={ASSETS.LOGO}
              alt="hero-image"
              className="w-40"
            />
            <ul className="xl:flex items-center hidden  justify-center gap-x-3.5">
              {NavData.map((item, index) => {
                const IsDropDown = [2, 3, 4, 5].includes(index);

                return (
                  <Link
                    key={item.id}
                    to={IsDropDown ? "#" : item.link}
                    state={{ param: "" }}
                    className={`text-primary  flex items-center gap-x-1   tracking-wide  ${
                      pathname === item.link
                        ? "font-bold underline underline-offset-8 decoration-2"
                        : "font-normal no-underline"
                    } py-2`}
                  >
                    {item.name}
                    {IsDropDown && <ChevronDown className="w-3 " />}
                  </Link>
                );
              })}
            </ul>
            <div className="flex items-center gap-4">
              <div className="relative  hidden lg:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              </div>
              <button className="block md:hidden">
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer bg-primary">
                      <AvatarImage
                        src="https://ik.imagekit.io/nd8r7mpaev/Atlants/user.png?updatedAt=1738227108834"
                        alt="profile"
                      />
                      {auth?.status && (
                        <AvatarFallback className="bg-primary text-white font-semibold">
                          {auth.first_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
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
                            to="/my-profile"
                            className="block hover:text-primary"
                          >
                            Profile
                          </Link>
                          {auth?.status ? (
                            <p
                              onClick={() => {
                                dispatch(logout());
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
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {IsMenuopen && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ duration: 0.5 }}
            className="block xl:hidden sticky top-0 z-20   bg-white h-svh py-4  "
          >
            <ul className="flex flex-col p-2 px-4 items-start gap-y-6 ">
              {NavData.map((item) => {
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className={`text-primary    tracking-wide  ${
                      pathname === item.link
                        ? "font-bold underline underline-offset-8 decoration-2"
                        : "font-normal no-underline"
                    } py-2`}
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
