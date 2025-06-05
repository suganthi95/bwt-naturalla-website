import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Heart, Search, ShoppingCart } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavData } from "./data";
import { Link, useLocation } from "react-router-dom";
import { ASSETS } from "../assets/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const messages = [
  "🎉 Flat 30% Off on Selected Products | Use Code : DEAL30 🎉",
  "🚚 Free Shipping on Orders Above ₹999 🚚",
  "🔥 New Deals Every Day — Don't Miss Out! 🔥",
];

export default function Nav() {
  const { pathname } = useLocation();
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

  return (
    <header className="">
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
      <nav className="container mx-auto  py-5 bg-offWhite">
        <div className="flex  items-center justify-between px-10">
          <img src={ASSETS.LOGO} alt="hero-image" className="w-40" />
          <ul>
            <ul className="flex items-center justify-center gap-x-3.5">
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
          </ul>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>

            <button>
              <Heart className="w-5 h-5 text-primary transition" />
            </button>

            <button className="relative">
              <ShoppingCart className="w-5 h-5 text-primary transition" />
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                2
              </span> */}
            </button>

            <Avatar className="w-8 h-8 cursor-pointer bg-primary">
              <AvatarImage src="/avatar.jpg" alt="profile" />
              <AvatarFallback className="bg-primary text-white font-semibold" >B</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </header>
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
