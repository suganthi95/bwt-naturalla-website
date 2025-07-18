import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; 

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-black text-white p-2 rounded-full"
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-1/2 z-20 -translate-y-1/2 cursor-pointer bg-black/50 hover:bg-black text-white p-2 rounded-full"
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );
}

export default function HeroCarousal({ banners }: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings} className="h-96 md:h-[70vh] rounded-2xl overflow-hidden">
        {banners?.map((src: any, index: number) => (
          <img
            key={`banner-image-${index}`}
            src={src.media_url}
            alt={`hero-${index}`}
            onClick={() => window.open(src?.cta_link, "_self")}
            className="w-full h-full cursor-pointer object-cover"
          />
        ))}
      </Slider>
    </div>
  );
}
