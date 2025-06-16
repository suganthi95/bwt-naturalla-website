import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Order() {
  const { items } = useSelector((state: RootState) => state.cart);
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <ul className="flex items-center  gap-x-2">
          <li className="text-title flex items-center gap-1.5">
            Order placed on{" "}
            <span className="text-title font-medium text-[15px]">
              29 May 2025
            </span>
          </li>
          <li className="text-title flex items-center gap-1.5">
            Order number
            <span className="text-title font-medium text-[15px]">
              576-876-8760
            </span>
          </li>
        </ul>
        <p className="text-title flex items-center gap-1.5">
          Excepted Delivery
          <span className="text-title font-medium text-[15px]">
            Date 10 June 2025
          </span>
        </p>{" "}
      </div>
      <div>
        <ul>
          {items?.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between border p-4   "
              >
                <div className="flex items-start gap-x-4">
                  <img
                    src={item.thumbnail_image_url}
                    alt={`${item.product_name}`}
                    className="w-[131px] h-[131px] rounded-2xl object-cover"
                  />
                  <div className="space-y-2.5">
                    <h2 className=" font-semibold text-lg">
                      {item.product_name}
                    </h2>
                    <p className="text-sm text-[13px] flex gap-x-1 items-center ">
                      <span className="text-[13px] text-[#939393] px-2 ">
                        1 unit
                      </span>{" "}
                      <span className="text-textPrimary font-semibold text-xl">
                        2
                      </span>
                      <span className="border-l h-3 border-gray-300"></span>
                      <span className="text-[13px]  text-[#939393]">
                        Size
                      </span>{" "}
                      <span className="text-xl font-semibold">
                        {item?.product_size}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-20 items-center">
                  <div className="text-center text-title">
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <p className="text-[15px] text-title ">BHIM UPI</p>
                  </div>
                  <div className="text-title text-center space-y-2">
                    <div className="text-start">
                      <h3 className="text-lg font-semibold">Ship to</h3>
                      <p className="text-[15px] text-title  ">
                        Suite 756 031 Ines Riverway
                      </p>
                      <p className="text-[15px] text-title ">
                        {" "}
                        Rhiannonchester
                      </p>
                    </div>
                    <div className=" text-start">
                      <h3 className="text-lg font-semibold">Contact no</h3>
                      <p className="text-[15px] text-title ">+91-9876543210</p>
                    </div>
                  </div>
                  <div className="space-y-3  w-64 text-sm font-medium text-title">
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹699</span>
                    </div>
                    <div className="flex justify-between items-start text-sm text-muted-foreground">
                      <p className="flex flex-col leading-tight">
                        <span className="text-foreground font-medium">Tax</span>
                        <span className="text-xs">Inclusive of 18% tax</span>
                      </p>
                      <span className="text-foreground font-semibold text-base">
                        ₹40
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="">-₹30</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex flex-col">Shipping Cost</span>
                      <span
                        className={`font-semibold  
                         gap-x-1.5 flex items-center`}
                      >₹50</span>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between font-semibold text-base">
                      <span className="font-semibold text-[#0B130B]">
                       Grand Total
                      </span>
                      <span className="text-[#0B130B] font-bold">₹400</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
