import { ASSETS } from "@/assets/assets";

export default function TopCategories() {
  const Products = [
    {
      id: "1",
      img: ASSETS.SHAMPOO,
      name: "Shampoo",
    },
    {
      id: "2",
      img: ASSETS.SHOAP,
      name: "Soaps",
    },
    {
      id: "3",
      img: ASSETS.FASHWASH,
      name: "Face wash",
    },
    {
      id: "4",
      img: ASSETS.FASHGEL,
      name: "Face gel",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center grid place-items-center">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] text-primary font-semibold">
          Top Categories of This Month
        </h2>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 lg:gap-x-14 lg:px-20 mt-8">
          {Products.map((item, index) => (
            <li key={index} className="text-center space-y-2">
              <img
                src={item.img}
                alt={`img-${item.id}`}
                className=" rounded-2xl "
              />
              <p className="text-textPrimary font-medium text-base sm:text-lg md:text-xl">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
