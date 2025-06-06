import { ASSETS } from "@/assets/assets";

export default function OfferEnding() {
  const Prodcuts = [
    {
      id: "1",
      img: ASSETS.PRODUCT1,
      name: "Red Wine Face Wash …",
      des: "ALOEVERA Face Gel | Moisturiser | Anti Aging | Exfoliation ",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
    {
      id: "2",
      img: ASSETS.PRODUCT2,
      name: "Red Wine Face Wash …",
      des: "Red Wine Face Wash - Brightening - Anti-oxidant - Hydration -pure natural",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
    {
      id: "3",
      img: ASSETS.PRODUCT3,
      name: "Red Wine Face Wash …",
      des: "ALOE VERRA hand made bathing soap | Fades Dark Spots | Skin Moisturizer",
      price: "Rs. 168",
      StrikeoutPrice: "Rs 158",
    },
  ];
  return (
    <div className="container mx-auto">
        <div className="w-full  grid place-items-center">
      <h2 className="font-semibold text-title text-xl">Offer Ending Soon</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-8 lg:gap-x-10 lg:px-40  mt-8">
        {Prodcuts.map((item, index) => (
          <li key={index} className="text-center space-y-2">
            <img
              src={item.img}
              alt={`img-${item.id}`}
              className={`rounded-2xl size-64`}
            />
            <p className="text-textPrimary line-clamp-1 lato font-medium text-base sm:text-lg md:text-xl">
              {item.name}
            </p>
          </li>
        ))}
      </ul>

        </div>
    </div>
  );
}
