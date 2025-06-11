import Slider from "react-slick";
import { ASSETS } from "@/assets/assets";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  ASSETS.HERO_IMG,
  ASSETS.HERO_IMG,
  ASSETS.HERO_IMG,
];

export default function HeroCarousal() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, 
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`hero-${index}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
