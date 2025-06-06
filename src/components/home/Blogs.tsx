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
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: "2",
      img: ASSETS.BLOG2,
      name: "Face Wash helps !",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: "3",
      img: ASSETS.BLOG1,
      name: "Skin Care Must!",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: "4",
      img: ASSETS.BLOG1,
      name: "Organic Oils",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elitLorem ipsum dolor sit amet, consectetur adipiscing elit",
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
    <div className="overflow-hidden">
      <div className="container mx-auto lato font-semibold text-xl ">
        <p className="text-title cursor-pointer">Latest News and Blogs</p>
      </div>

      <div className="overflow-hidden mt-10 ml-20 space-x-10 w-full">
        <Slider {...settings} className="">
          {Blogs.map((item, index) => (
            <div key={item.id} className="">
              <div className="bg-white space-y-2 px-3">
                <img
                  src={item.img}
                  alt={`blog-${index}`}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <p className="text-lead text-lg font-semibold">{item.name}</p>
                <p className="text-primary text-sm line-clamp-2">{item.des}</p>
                <div className="pt-2">
                  <Button className="rounded-full hover:bg-transparent px-5  text-primary border bg-primary/10 border-primary">
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
