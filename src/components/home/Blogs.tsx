import Slider from "react-slick";
import { Button } from "../ui/button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetTopBlogs } from "@/services/blogs";
import type { Blog } from "@/types/type";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: TopBlogs } = useGetTopBlogs(token ?? "");
const navigate =  useNavigate()
 

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
    <>
      {TopBlogs?.length > 0 ? (
        <div className="overflow-hidden px-4 sm:px-6 lg:px-16 py-10">
          <div className="container mx-auto flex justify-between items-center font-semibold text-xl">
            <p className="text-title cursor-pointer text-center sm:text-left">
              Latest News and Blogs
            </p>
            <p
              className="text-title text-sm md:text-base cursor-pointer hover:underline underline-primary"
              onClick={() =>
                navigate("/blogs")
              }
            >
              View more
            </p>
          </div>

          <div className="mt-10 ">
            <Slider {...settings}>
              {TopBlogs?.map((item: Blog, index: number) => (
                <div key={index} className="px-2">
                  <div className=" space-y-3 p-4 rounded-xl  h-full">
                    <img
                      src={item.blog_image_url}
                      alt={`blog-${index}`}
                      className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-lg"
                    />
                    <p className="text-lead text-lg font-semibold">
                      {item.blog_title}
                    </p>
                    <p className="text-primary text-sm line-clamp-3">
                      {item.blog_desc}
                    </p>
                    <div className="pt-2">
                      <Button 
                       onClick={() =>
                navigate(`/blogs/detail/${item.blog_id}`)
              }
                      className="rounded-full text-sm px-4 py-2 hover:bg-transparent text-primary border bg-primary/10 border-primary">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
