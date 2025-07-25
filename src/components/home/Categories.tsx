import { ASSETS } from "@/assets/assets";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <ul className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {[
        {
          img: ASSETS.CAT_FASHGEL,
          label: "Face Gel",
          link: "/products/face%20gel?category_id=3&subcategory_id=69",
          offer: " 40% Off",
        },
        {
          img: ASSETS.CAT_SHAMPOO,
          label: "Shampoo",
          link: "/products/shampoo?category_id=1&subcategory_id=62",
          offer: "Under ₹399",
        },
        {
          img: ASSETS.CAT_FASHWASH,
          label: "Serum",
          link: "/products/serum?category_id=3&subcategory_id=72",
          offer: "Under ₹399",
        },
        {
          img: ASSETS.CAT_SOAP,
          label: "Exclusive Products",
          link: "/products/buy%201%20get%201%20free?category_id=4&subcategory_id=89",
          offer: "Buy 1 Get 1",
        },
      ].map((item, index) => (
        <li
          key={index}
          className="bg-[#F8F6F2] rounded-xl cursor-pointer border border-xl flex items-center justify-center p-4 gap-x-4 min-h-[180px]"
          onClick={() =>
            // navigate(`/products/${item.label} ` , {
            //   state: { category_id: `` },
            // })
            navigate(item.link, { state: { title: item.label } })
          }
        >
          <img
            src={item.img}
            alt={item.label}
            className="w-[100px] h-[100px] object-contain"
          />
          <div
            className={`${
              index === 3 ? "w-[140px]" : "w-[100px]"
            } text-center space-y-1`}
          >
            <p className="text-textPrimary font-medium text-sm leading-snug">
              {item.label}
            </p>
            <h2 className="text-primary font-extrabold text-2xl">
              {item.offer}
            </h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
