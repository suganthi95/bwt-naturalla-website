import Slider from "react-slick";
import { useRef, useState, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icons } from "@/assets/icons";
import { Input } from "../ui/input";

const productImages = [
  ASSETS.PRODUCT1,
  ASSETS.PRODUCT2,
  ASSETS.PRODUCT3,
  ASSETS.PRODUCT1,
  ASSETS.PRODUCT2,
  ASSETS.PRODUCT3,
];

export default function ProductSection() {
  const mainSliderRef = useRef<Slider>(null);
  const thumbSliderRef = useRef<Slider>(null);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  return (
    <div className="flex flex-col container mx-auto lg:flex-row  ">
      <div className="flex w-full lg:w-1/2 gap-4 ">
        <div className="w-24">
          <Slider
            {...thumbnailSliderSettings}
            ref={thumbSliderRef}
            className="h-full"
          >
            {productImages.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Thumb ${index + 1}`}
                  className={`h-24 w-32 object-cover rounded-lg border cursor-pointer transition-opacity duration-300 ${
                    index === activeSlide
                      ? "opacity-100 border-2 border-black"
                      : "opacity-60"
                  }`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex-1   overflow-hidden">
          <Slider {...mainSliderSettings} ref={mainSliderRef}>
            {productImages.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Product ${index + 1}`}
                  className="w-11/12  rounded-2xl h-auto object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full  space-y-4">
        <div className="flex items-start w-full justify-between">
          <div>
            <h2 className="text-[32px] font-semibold ">
              Red Wine Face Wash -Brightening - Anti-oxidant - Hydration -pure
              natural
            </h2>
            <p className="text-lead font-medium text-lg">
              Brightening Effect | Antioxidant Protection | Anti-Aging
              Properties | Hydration & Soothing | Pore Cleansing & Minimization
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <p className="flex items-center gap-x-0.5 text-sm">
          <Icons.Star /> <Icons.Star />
          <Icons.Star />
          <Icons.Star /> <span className="font-medium">4/5</span>
        </p>
        <div className="flex items-center gap-x-2">
          <p className=" font-bold text-title md:text-[32px]">₹ 168</p>
          <p className="md:text-2xl line-through text-lead">₹ 199</p>

          <p className="md:text-2xl font-bold text-green-600">20% OFF</p>
          <p className="md:text-xl text-orange-600 font-semibold">
            You{"’"}ll save ₹ 32.00{" "}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-x-1.5 text-lead">
            Price <span> : </span>{" "}
            <span className="text-title font-bold t">Rs 168</span>
          </p>
        </div>
        <div className="flex items-center gap-2 border w-fit p-1 px-4 rounded-lg">
          <Button variant="outline" size="icon" className="border-none cursor-pointer  w-fit text-xl font-semibold" onClick={handleDecrease}>
           {' −'}
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-10  text-2xl  font-semibold border-none text-center"
            min={1}
          /> 
          <Button variant="outline" size="icon"   className="cursor-pointer  border-none  w-fit text-xl font-semibold"  onClick={handleIncrease}>
            +
          </Button>
        </div>{" "}
        <div className="flex items-center gap-x-2">
          <Button className=" py-3 px-11">Buy Now</Button>
          <Button className="bg-primary/10  py-3 px-11 text-primary border border-primary">
            Add to Cart
          </Button>

          <Button variant="outline" className="cursor-pointer">
            <Icons.Swap className="text-xl" />
          </Button>
        </div>
     <div className="flex items-center gap-2 border rounded-md px-2 py-1 w-fit">
  <Input
    type="number"
    placeholder="Enter PIN code to check delivery date"
    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-8 md:w-72 text-sm px-2"
  />
  <Button className="h-6 rounded px-3  text-sm">Check</Button>
</div>

      </div>
    </div>
  );
}
