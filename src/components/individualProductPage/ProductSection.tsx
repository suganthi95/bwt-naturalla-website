import Slider from "react-slick";
import { useRef, useState, useEffect } from "react";
import { Ban, Heart, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icons } from "@/assets/icons";
import { Input } from "../ui/input";
import type { Product } from "@/types/Home";
import { usePincodeEnquiry } from "@/services/product";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useAddToWishList, useDeleteWishlist } from "@/services/whistlist";
import { addWishItem, removeWishlistItem } from "@/redux/slices/wishSlice";
import { useAddToCart } from "@/services/cart";
import axios from "axios";
import { Truck, BadgeDollarSign } from "lucide-react";
import ShareButton from "./ShareButton";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

// const productImages = [
//   ASSETS.PRODUCT1,
//   ASSETS.PRODUCT2,
//   ASSETS.PRODUCT3,
//   ASSETS.PRODUCT1,
//   ASSETS.PRODUCT2,
//   ASSETS.PRODUCT3,
// ];
type MediaItem = {
  media_url: string;
};

type Props = {
  media: MediaItem[];
  products: Product;
};
const baseUrl = import.meta.env.VITE_FRONTEND_URL;

const policies = [
  {
    title: "Shipping Policy",
    icon: <Truck className="w-4 h-4 md:w-5 md:h-5 text-primary" />,
    url: `${baseUrl}/shipping-policy`,
  },

  {
    title: "Return & Refund Policy",
    icon: <BadgeDollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary" />,
    url: `${baseUrl}/returns-and-refunds`,
  },
];

export default function ProductSection({ media, products }: Props) {
  // const { mutate: UpdateCart } = useUpdateCart();
  const mainSliderRef = useRef<Slider>(null);
  const thumbSliderRef = useRef<Slider>(null);
  const { token, status } = useSelector((state: RootState) => state.auth);
  const { mutate: addtoCart } = useAddToCart();
  const { mutate } = useAddToWishList();
  const { mutate: deleteWishlist } = useDeleteWishlist();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [Pincode, setPincode] = useState("");

  const [Messages, setMessage] = useState("");
  const [liked, setLiked] = useState(false);

  const { mutate: pincodeVerify, isPending, isError } = usePincodeEnquiry();
  const handleDecrease = (cart_id: number) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decreaseQuantity(cart_id));
    }
  };

  const handleIncrease = (cart_id: number) => {
    setQuantity(quantity + 1);

    dispatch(increaseQuantity(cart_id));
  };

  useEffect(() => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      setNav1(mainSliderRef.current);
      setNav2(thumbSliderRef.current);
    }
  }, []);

  // const handleCopyurl = async () => {
  //   await navigator.clipboard.writeText(window.location.href);
  //   toast.info("product url copied");
  // };

  const mainSliderSettings = {
    asNavFor: nav2!,
    arrows: false,
    dots: false,
    fade: true,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };

  const thumbnailSliderSettings = {
    asNavFor: nav1!,
    slidesToShow: 4,
    vertical: true,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    verticalSwiping: true,
  };

  const averageRatings = Math.round(
    products?.review_count[0].total_ratings /
      Number(products?.review_count[0].total_reviews)
  );

  // const savings = Math.round(
  //   (Number(products?.strike_through_price) *
  //     Number(products?.discount_percent)) /
  //     100
  // );

  const checkDeliveryInfo = async () => {
    try {
      pincodeVerify(
        {
          pincode: Number(Pincode),
          product_id: products.product_id,
        },
        {
          onSuccess(data) {
            setMessage(data?.data?.eta);
          },
          onError: (error) => {
            if (axios.isAxiosError(error)) {
              setMessage(error?.response?.data?.message);
            }
          },
        }
      );
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
    }
  };

  useEffect(() => {
    setLiked(products?.in_wishlist);
  }, [products?.in_wishlist]);

  return (
    <div className="flex flex-col container mx-auto space-y-4 xl:flex-row  ">
      <div className="flex w-full lg:w-10/12 xl:w-1/2 gap-4 ">
        <div className="w-20">
          <Slider
            {...thumbnailSliderSettings}
            ref={thumbSliderRef}
            className="h-full"
          >
            {media?.map((src, index) => {
              return (
                <div key={index}>
                  <img
                    src={src.media_url}
                    alt={`Thumb ${index + 1}`}
                    className={` w-28 h-20 md:h-24 md:w-32 object-cover rounded-lg border cursor-pointer transition-opacity duration-300 ${
                      index === activeSlide
                        ? "opacity-100 border-2 border-black"
                        : "opacity-60"
                    }`}
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="flex-1   overflow-hidden">
          <Slider {...mainSliderSettings} ref={mainSliderRef}>
            {media?.map((src, index) => (
              <div key={index}>
                <img
                  src={src?.media_url}
                  alt={`Product ${index + 1}`}
                  className="  xl:w-11/12  rounded-2xl h-[410px] xl:h-[484px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full  space-y-2 md:space-y-3">
        <div className="flex items-start w-full justify-between">
          <div className="space-y-2.5">
            <h2 className="text-xl md:text-[32px] font-semibold ">
              {products?.product_name}
            </h2>
            <p className="font-medium text-sm md:text-base line-clamp-3">
              {products?.short_description}
            </p>
            <ul className="flex items-center flex-wrap gap-2  md:gap-4">
              {products?.icon_data?.slice(0, 3)?.map((item) => {
                return (
                  <li className="flex items-center gap-x-1.5">
                    <img
                      src={item.icon_url}
                      className="size-4 md:size-7"
                      alt={`icon-${item.icon_id}`}
                    />
                    <p className="font-medium text-[#656877]">
                      {item.icon_text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-y-5">
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:scale-90"
                  // onClick={handleCopyurl}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ShareButton url={window.location.href} />
              </DialogContent>
            </Dialog>
            <button
              disabled={products?.current_stock <= 0}
              onClick={() => {
                setLiked((prev) => !prev);
                if (status && !liked) {
                  mutate({
                    product_id: products.product_id,
                    quantity: 1,
                    token: token,
                  });
                  dispatch(addWishItem(products));
                } else if (liked && status) {
                  deleteWishlist({
                    cart_id: products.product_id,
                    token: token,
                  });
                  dispatch(removeWishlistItem(products.cart_id));
                } else {
                  toast.error("Please login to continue");
                  navigate("/login");
                }
              }}
              className="relative w-10 h-10  cursor-pointer flex items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: liked ? 1.3 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                }}
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    liked ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </motion.div>

              <AnimatePresence>
                {liked && (
                  <motion.div
                    key="pulse"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-5 h-5 rounded-full bg-red-500"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {averageRatings ? (
          <p className="flex items-center gap-x-0.5 text-sm">
            {Array.from({ length: 5 }).map((_, i) =>
              i < averageRatings ? (
                <Icons.Star key={i} className="text-yellow-500 w-4 h-4" />
              ) : (
                <Icons.Un_Star key={i} className="text-gray-300 w-4 h-4" />
              )
            )}
            <span className="font-semibold ml-1">
              {isNaN(averageRatings) ? 0 : averageRatings} / 5
            </span>
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center gap-x-2">
          <p className=" font-bold text-title  text-sm md:text-[32px]">
            Rs. {products?.unit_price}
          </p>
          <p className="md:text-2xl  text-sm  line-through text-lead">
            Rs. {products?.strike_through_price}
          </p>
          {products?.discount_percent && (
            <p className="md:text-3xl text-sm   font-bold text-green-600">
              {Math.round(Number(products?.discount_percent))}% OFF
            </p>
          )}
          {products?.discount_percent && (
            <p className="md:text-xl text-sm  text-[#FF9500] font-semibold">
              You{"’"}ll save ₹ {products?.discounted_price}.00{" "}
            </p>
          )}
        </div>
        <div className="flex md:flex-col items-center lg:items-start  justify-between">
          <div className="flex flex-col items-start md:flex-row md:items-center gap-x-3 md:justify-center">
            <p className="flex items-center gap-x-1.5 text-lead">
              Price <span> : </span>{" "}
              <span className="text-title font-bold t">
                Rs {products?.unit_price}
              </span>
            </p>
            <p className="  text-xs md:text-sm  text-neutral-700  font-medium">
              ({products?.units})
            </p>
          </div>

          <div className="flex items-center gap-2 border w-fit p-1 mt-2 px-2 md:px-4 rounded-lg">
            <Button
              variant="outline"
              size="icon"
              disabled={products?.quantity < 2}
              className="border-none cursor-pointer  w-fit md:text-xl font-semibold"
              onClick={() => handleDecrease(products?.cart_id)}
            >
              {" −"}
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className=" w-13  text-xl  font-semibold border-none text-center"
              min={1}
            />
            <Button
              disabled={quantity >= products?.current_stock}
              variant="outline"
              size="icon"
              className="cursor-pointer  border-none  w-fit md:text-xl font-semibold"
              onClick={() => handleIncrease(products.cart_id)}
            >
              +
            </Button>
          </div>
          <AnimatePresence>
            {quantity >= products?.current_stock && (
              <motion.p
                className="text-xs font-medium text-red-500 mt-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Product only {products?.current_stock} quantity available
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {(products?.minimum_stock_warning === null &&
          products?.current_stock <= 1) ||
        products?.current_stock < products?.minimum_stock_warning ? (
          <Button
            disabled
            className="bg-red-100 text-red-500 cursor-not-allowed flex items-center gap-2"
          >
            <Ban className="w-4 h-4" />
            Out of Stock
          </Button>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() => {
                if (status) {
                  addtoCart({
                    product_id: products.product_id,
                    quantity: quantity,
                    token: token,
                  });
                  navigate("/checkout", { replace: true });
                } else {
                  toast.error("Please login to continue");
                }
                // dispatch(addItem(products));
              }}
              className=" lg:py-3  px-8 lg:px-11"
            >
              Buy Now
            </Button>
            <Button
              onClick={() => {
                if (status) {
                  addtoCart(
                    {
                      product_id: products.product_id,
                      quantity:
                        products.current_stock < quantity
                          ? products.current_stock
                          : quantity,
                      token: token,
                    },
                    {
                      onSuccess() {
                        dispatch(addItem(products));
                      },
                    }
                  );
                } else {
                  toast.error("Please login to continue");
                }
              }}
              className="bg-primary/10  px-8 lg:py-3 lg:px-11 text-primary border border-primary"
            >
              Add to Cart
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between border rounded-md px-1 py-1 w-full lg:w-fit">
          <div className="relative w-full md:w-[254px]">
            <Input
              type="number"
              value={Pincode ?? ""}
              placeholder="Enter Pincode for Delivery"
              onChange={(e) => setPincode(e.target.value)}
              className="border-none placeholder:text-sm focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm pr-8 pl-2"
            />
          </div>
          <Button
            onClick={checkDeliveryInfo}
            className="h-6 rounded cursor-pointer px-3 text-sm"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Check"}
          </Button>
        </div>
        <p
          className={`text-sm font-medium ${
            isError ? "text-red-500" : "text-green-500"
          }`}
        >
          {Messages && (isError ? Messages : `Delivery by ${Messages}`)}
        </p>
        <div className="flex items-center gap-4 mt-6">
          {policies.map((item, index) => (
            <div
              key={index}
              onClick={() => window.open(item.url, "_blank")}
              className="flex items-center gap-3 cursor-pointer text-sm  rounded-xl transition-all "
            >
              <div className="bg-primary/10 p-2  rounded-full">{item.icon}</div>
              <p className="text-xs md:text-sm font-medium text-neutral-700">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
