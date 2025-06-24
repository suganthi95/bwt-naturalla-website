import Slider from "react-slick";
import { ASSETS } from "@/assets/assets";
import { Button } from "../ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Blogs() {
  const Blogs = [
    {
      id: "1",
      img: ASSETS.BLOG3,
      name: "Natural Face Cream",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: "2",
      img: ASSETS.BLOG2,
      name: "Face Wash helps!",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: "3",
      img: ASSETS.BLOG1,
      name: "Skin Care Must!",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      id: "4",
      img: ASSETS.BLOG1,
      name: "Organic Oils",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden px-4 sm:px-6 lg:px-16 py-10">
      <div className="container mx-auto font-semibold text-xl">
        <p className="text-title cursor-pointer text-center sm:text-left">
          Latest News and Blogs
        </p>
      </div>

      <div className="mt-10">
        <Slider {...settings}>
          {Blogs.map((item, index) => (
            <div key={item.id} className="px-2">
              <div className="bg-white space-y-3 p-4 rounded-xl shadow-sm h-full">
                <img
                  src={item.img}
                  alt={`blog-${index}`}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-lg"
                />
                <p className="text-lead text-lg font-semibold">{item.name}</p>
                <p className="text-primary text-sm line-clamp-3">{item.des}</p>
                <div className="pt-2">
                  <Button className="rounded-full text-sm px-4 py-2 hover:bg-transparent text-primary border bg-primary/10 border-primary">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
