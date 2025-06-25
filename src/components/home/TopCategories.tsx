import { ASSETS } from "@/assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Category } from "@/types/type";
import { useNavigate } from "react-router-dom";
interface Props {
  categories: Category[];
}
export default function TopCategories({ categories }: Props) {
  const navigate = useNavigate();
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

  const Description = [
    {
      id: "1",
      img: ASSETS.CURLEY,
      text: "Cruelty Free",
    },
    {
      id: "2",
      img: ASSETS.NONTOXIC,
      text: "Non Toxic Chemicals",
    },
    {
      id: "3",
      img: ASSETS.SLIDEICON,
      text: "GMO Free",
    },
    {
      id: "4",
      img: ASSETS.SLIDEICON2,
      text: "Paraben Free",
    },
    {
      id: "5",
      img: ASSETS.SLIDEICON3,
      text: "Handmade",
    },
    {
      id: "6",
      img: ASSETS.SLIDEICON4,
      text: "100% Natural",
    },
    {
      id: "7",
      img: ASSETS.NONTOXIC,
      text: "Non Toxic Chemicals",
    },
    {
      id: "8",
      img: ASSETS.SLIDEICON,
      text: "GMO Free",
    },
    {
      id: "9",
      img: ASSETS.SLIDEICON2,
      text: "Paraben Free",
    },
    {
      id: "10",
      img: ASSETS.SLIDEICON3,
      text: "Handmade",
    },
    {
      id: "11",
      img: ASSETS.SLIDEICON4,
      text: "100% Natural",
    },
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl  roundica md:text-[32px] text-primary font-semibold">
            Top Categories of This Month
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 place-items-center  gap-8  lg:gap-4 xl:px-40  mt-8">
            {categories?.slice(0,3)?.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  // navigate('/products/top-categories',{state:{category_id:`${item.category_id}`}})
                  navigate(
                    `/products/top-categories?category_id=${item.category_id}`
                ,{state:{title:'Top Categories'}}  );
                }}
                className="text-center cursor-pointer space-y-2"
              >
                <img
                  src={item?.category_thumbnail_image}
                  alt={`img-${item?.category_id}`}
                  className={`rounded-2xl w-[160px] h-[160px]  md:h-[240px] md:w-[240px] `}
                />
                <p className="text-textPrimary font-medium text-base sm:text-lg md:text-xl">
                  {item?.category_title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-primary p-1 mt-10 mb-10 w-full">
        <div className=" ml-2 mx-auto">
          <Slider {...settings}>
            {Description.map((item, index) => (
              <div key={index} className="!flex !items-center !gap-x-3">
                <img
                  src={item.img}
                  className={` object-contain ${
                    index === 2 ? "w-14 h-14" : "w-16 h-16"
                  } `}
                  alt={`img-${index}`}
                />
                <h3 className="text-sm  roundica  sm:text-xl text-[#FFFFFF] font-normal ">
                  {item.text}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
