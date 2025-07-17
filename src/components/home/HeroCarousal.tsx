import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroCarousal({ banners }: any) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider
        {...settings}
        className=" h-96 md:h-[70vh] rounded-2xl overflow-hidden border-none"
      >
        {banners?.map((src: any, index: number) => (
          <img
            onClick={() => {
             window.open(src?.cta_link,"_self")
            }}
            key={`banner-image-${index}`}
            src={src.media_url}
            alt={`hero-${index}`}
            className="w-full h-full cursor-pointer object-cover"
          />
        ))}
      </Slider>
    </div>
  );
}
