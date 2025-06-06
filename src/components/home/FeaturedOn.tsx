import { ASSETS } from "@/assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function FeaturedOn() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    
      const Products = [
        {
          id: "1",
          img: ASSETS.BW,
        },
        {
          id: "2",
          img: ASSETS.DECAN,
        },
        {
          id: "3",
          img: ASSETS.VERVE,
        },
        {
          id: "4",
          img: ASSETS.BW,
        },
         {
          id: "5",
          img: ASSETS.LD,
        },
         {
          id: "6",
          img: ASSETS.THEHIN,
        },
         {
          id: "7",
          img: ASSETS.STORY,
        },
      ];
  return (
    <div className="">
        <div className="grid place-items-center"> 
      <h1 className="text-2xl sm:text-3xl  roundica md:text-[32px]  font-normal">
       Featured on
      </h1>

        </div>
        <div className="mt-10 mb-10 w-full">
        <div className=" ml-2 mx-auto">
          <Slider {...settings}>
            {Products.map((item, index) => (
              <div key={index} className="!flex !items-center !gap-x-3">
                <img
                  src={item.img}
                  className={` object-contain size-48`}
                  alt={`img-${index}`}
                />
               
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
