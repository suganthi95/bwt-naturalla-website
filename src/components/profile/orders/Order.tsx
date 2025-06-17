
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { X } from "lucide-react";
import dayjs from 'dayjs'
import { useState } from "react";
import OrderDetails from "./OrderDetails";
import type { Order } from "@/types/type";
interface Props{
  Orders:Order[]
}
export default function Order({Orders}:Props) {

  const [Isopen,setIsopen] = useState(false)
 
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <ul className="flex items-center  gap-x-2">
          <li className="text-title flex items-center gap-1.5">
            Order placed on{" "}
            <span className="text-title font-medium text-[15px]">
             { dayjs(Orders[0].order_date).format('DD MMMM YYYY') }
            </span>
          </li>
          <li className="text-title flex items-center gap-1.5">
            Order number
            <span className="text-title font-medium text-[15px]">
  {Orders[0].order_code}
            </span>
          </li>
        </ul>
        <p className="text-title flex items-center gap-1.5">
          Excepted Delivery
          <span className="text-title font-medium text-[15px]">
              {Orders[0]?.assign_delivery}
          </span>
        </p>{" "}
      </div>
      <div>
        <ul className="space-y-3">
          {Orders?.map((item, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between border p-4   "
              >
                <div className="flex items-start gap-x-4">
                  <img
                    src={item.product_thumbnail_image}
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
                      {item.quantity}
                      </span>
                      <span className="border-l h-3 border-gray-300"></span>
                      <span className="text-[13px]  text-[#939393]">
                        Size
                      </span>{" "}
                      <span className="text-xl font-semibold">
                        {/* {item?.product_size} */}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-16 items-center">
                  <div className="text-center text-title">
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <p className="text-[15px] text-title ">{item?.payment_method}</p>
                  </div>
                  <div className="text-title text-center space-y-2">
                    <div className="text-start">
                      <h3 className="text-lg font-semibold">Ship to</h3>
                      <p className="text-[15px] text-title  ">
                       {item?.address}
                       {item?.city}
                       {item?.state} {item?.pincode}

                      </p>
                      <p className="text-[15px] text-title ">
                        {" "}
                        {item?.shipmet_first_name}
                      </p>
                    </div>
                    <div className=" text-start">
                      <h3 className="text-lg font-semibold">Contact no</h3>
                      <p className="text-[15px] text-title ">{item?.shipment_phone_no}</p>
                    </div>
                  </div>
                  <div className="space-y-3  w-64 text-sm font-medium text-title">
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{item.sub_total}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm text-muted-foreground">
                      <p className="flex flex-col leading-tight">
                        <span className="text-foreground font-medium">Tax</span>
                        <span className="text-xs">Inclusive of 18% tax</span>
                      </p>
                      <span className="text-foreground font-semibold text-base">
                        ₹{item.tax}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="">-₹{item.discount_amount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex flex-col">Shipping Cost</span>
                      <span
                        className={`font-semibold  
                         gap-x-1.5 flex items-center`}
                      >
                        ₹{item?.shipping_fee}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-base">
                      <span className="font-semibold text-[#0B130B]">
                        Grand Total
                      </span>
                      <span className="text-[#0B130B] font-bold">₹{item.amount}</span>
                    </div>
                  </div>

                  <Dialog open={Isopen} onOpenChange={setIsopen}>
                    <DialogTrigger className="cursor-pointer">
                      <Button>Order Details</Button>
                    </DialogTrigger>
                    <DialogContent className="md:!max-w-7xl max-h-10/12 overflow-y-auto [&>button]:hidden   !p-0">
                      <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                        <DialogTitle>Order Details  <Button variant={"outline"} className="font-semibold text-sm text-blue-500">Download Invoice</Button></DialogTitle>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setIsopen(false);
                          }}
                        >
                          <X />
                        </div>
                      </DialogHeader>
                      <OrderDetails />
                    </DialogContent>
                  </Dialog>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
