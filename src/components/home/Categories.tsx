import { ASSETS } from "@/assets/assets";

export default function Categories() {
  return (
    <ul className="container mx-auto grid grid-cols-4 gap-5">
      {[
        {
          img: ASSETS.CAT_FASHGEL,
          label: "Hydrating Face Gel",
          offer: "Flat 20% Off",
        },
        {
          img: ASSETS.CAT_SHAMPOO,
          label: "Nourishing Shampoos",
          offer: "Under ₹499",
        },
        {
          img: ASSETS.CAT_FASHWASH,
          label: "Fresh Face Wash",
          offer: "Under ₹299",
        },
        {
          img: ASSETS.CAT_SOAP,
          label: "Soothing Soaps",
          offer: "Buy 2 Get 1 Free",
        },
      ].map((item, index) => (
        <li
          key={index}
          className="bg-[#F8F6F2] rounded-xl border border-xl flex items-center justify-center p-4 gap-x-4 min-h-[180px]"
        >
          <img
            src={item.img}
            alt={item.label}
            className="w-[100px] h-[100px] object-contain"
          />
          <div className={`${index === 3 ? 'w-[140px]':'w-[100px]' } text-center space-y-1`}>
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
