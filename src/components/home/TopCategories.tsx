import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Category } from "@/types/type";
import { useNavigate } from "react-router-dom";
  import {
  Footprints,
  Wind,
  Leaf,
  Droplets,
  Hammer,
  ShieldCheck,
  Grip,
  Feather,
  Sparkles,
  Move,
  Recycle,
  Activity,
} from "lucide-react";
interface Props {
  categories: Category[];
}
export default function TopCategories({ categories }: Props) {
  
  const navigate = useNavigate();


 const Description = [
  {
    id: "1",
    icon: Footprints,
    text: "All-Day Comfort",
  },
  {
    id: "2",
    icon: Wind,
    text: "Breathable Material",
  },
  {
    id: "3",
    icon: Leaf,
    text: "Eco-Friendly Materials",
  },
  {
    id: "4",
    icon: Droplets,
    text: "Water Resistant",
  },
  {
    id: "5",
    icon: Hammer,
    text: "Handcrafted Quality",
  },
  {
    id: "6",
    icon: ShieldCheck,
    text: "High Durability",
  },
  {
    id: "7",
    icon: Grip,
    text: "Anti-Slip Sole",
  },
  {
    id: "8",
    icon: Feather,
    text: "Lightweight Design",
  },
  {
    id: "9",
    icon: Sparkles,
    text: "Odor Control",
  },
  {
    id: "10",
    icon: Move,
    text: "Flexible Fit",
  },
  {
    id: "11",
    icon: Recycle,
    text: "Sustainably Made",
  },
  {
    id: "12",
    icon: Activity,
    text: "Ergonomic Comfort Fit",
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

      {/* <div className="bg-primary p-1 mt-10 mb-10 w-full">
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
      </div> */}
       <div className="logo-carousel  bg-primary">
      <div className="logo-track justify-around items-center  p-2 ">
        {[...Description, ...Description , ...Description].map((src, idx) => (
          <div className="logo flex items-center gap-x-4 justify-center" key={idx}>
            <src.icon className="text-white"/>
                 <h3 className="text-sm  roundica  sm:text-xl text-[#FFFFFF] font-normal ">
                  {src.text}
                </h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
