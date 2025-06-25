import Slider from "react-slick";
import { useRef, useState, useEffect } from "react";
import { Heart, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icons } from "@/assets/icons";
import { Input } from "../ui/input";
import type { Product } from "@/types/Home";
import { usePincodeEnquiry } from "@/services/product";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { useAddToWishList, useDeleteWishlist } from "@/services/whistlist";
import { addWishItem, removeWishlistItem } from "@/redux/slices/wishSlice";
import { useAddToCart } from "@/services/cart";

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

export default function ProductSection({ media, products }: Props) {

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
  // const [Pincode, setPincode] = useState(() => localStorage.getItem("pincode"));
  const [Pincode, setPincode] = useState("");
  // const [Messages, setMessage] = useState(() =>
  //   localStorage.getItem("delivery")
  // );
  const [Messages, setMessage] = useState("");
  const [Isloading, setIsloading] = useState(false);
  const [liked, setLiked] = useState(false);

  const { refetch, isError } = usePincodeEnquiry(Pincode ?? "");
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    if (mainSliderRef.current && thumbSliderRef.current) {
      setNav1(mainSliderRef.current);
      setNav2(thumbSliderRef.current);
    }
  }, []);

  const handleCopyurl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.info("product url copied");
  };

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

    // localStorage.setItem("pincode", Pincode ?? "");
    
    try {
      setIsloading(true);
      const { data, isError, error } = await refetch();

      if (data?.status === true) {
        setMessage(data.message);
        // localStorage.setItem("delivery", data?.message);
      }
      if (isError || error) {
        setMessage("We are not shipping for this Location");
        toast.error("We are not shipping for this Location");
        // localStorage.setItem(
        //   "delivery",
        //   "We are not shipping for this Location"
        // );
      }
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setIsloading(false);
    }
  }

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
                    className={ ` w-28 h-20 md:h-24 md:w-32 object-cover rounded-lg border cursor-pointer transition-opacity duration-300 ${
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

      <div className="w-full  space-y-4">
        <div className="flex items-start w-full justify-between">
          <div>
            <h2 className="text-2xl md:text-[32px] font-semibold ">
              {products?.product_name}
            </h2>
            <p className="text-lead font-medium text-sm md:text-lg">
              {products?.short_description}
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <Button
              variant="outline"
              size="icon"
              className="hover:scale-90"
              onClick={handleCopyurl}
            >
              <Share2 className="w-5 h-5" />
            </Button>
         
            <button
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
     
        <p className="flex items-center gap-x-0.5 text-sm">
          {Array.from({ length: 5 }).map((_, i) =>
            i < averageRatings ? (
              <Icons.Star key={i} className="text-yellow-500 w-4 h-4" />
            ) : (
              <Icons.Un_Star key={i} className="text-gray-300 w-4 h-4" />
            )
          )}
          <span className="font-medium ml-1">{averageRatings}/5</span>
        </p>
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

        <div>
          <p className="flex items-center gap-x-1.5 text-lead">
            Price <span> : </span>{" "}
            <span className="text-title font-bold t">
              Rs {products?.unit_price}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 border w-fit p-1 px-4 rounded-lg">
          <Button
            variant="outline"
            size="icon"
            className="border-none cursor-pointer  w-fit text-xl font-semibold"
            onClick={handleDecrease}
          >
            {" −"}
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-10  text-2xl  font-semibold border-none text-center"
            min={1}
          />
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer  border-none  w-fit text-xl font-semibold"
            onClick={handleIncrease}
          >
            +
          </Button>
        </div>{" "}
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => {
              addtoCart({
                product_id: products.product_id,
                quantity: 1,
                token: token,
              });
              dispatch(addItem(products));
              navigate("/checkout");
            }}
            className=" lg:py-3  px-8 lg:px-11"
          >
            Buy Now
          </Button>
          <Button
            onClick={() => {
              addtoCart({
                product_id: products.product_id,
                quantity: 1,
                token: token,
              });
              dispatch(addItem(products));
            }}
            className="bg-primary/10  px-8 lg:py-3 lg:px-11 text-primary border border-primary"
          >
            Add to Cart
          </Button>

          <Button variant="outline" className="cursor-pointer">
            <Icons.Swap className="text-xl" />
          </Button>
        </div>
        <div className="flex items-center gap-2 border rounded-md px-2 py-1 w-full lg:w-fit">
          <Input
            type="number"
            value={Pincode ?? ""}
            placeholder="Enter PIN code to check delivery date"
            onChange={(e) => setPincode(e.target.value)}
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 md:w-72 text-sm px-2"
          />
          <Button
            onClick={checkDeliveryInfo}
            className="h-6 rounded cursor-pointer px-3  text-sm"
          >
            {Isloading ? <Loader2 className="animate-spin" /> : "Check"}
          </Button>
        </div>
        <p
          className={`${
            isError ? "text-red-500" : "text-green-500"
          } text-sm font-medium`}
        >
          {Messages}
        </p>
      </div>
    </div>
  );
}
