import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface Props{
    onClose:(val:boolean)=>void
}
export default function CartSheet({onClose}:Props) {
    const navigae = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  return (
    <ScrollArea className="space-y-6 p-4  h-screen">
      <h2 className="text-lg font-bold text-title"> Cart</h2>
      <div className="space-y-1.5 mb-4">
        <p className="font-semibold  text-sm">
          🎉 Congrats!
          <span className="text-[#111411]">
            You{"’"}ve earned free shipping!
          </span>
        </p>
        <div className="bg-primary h-2 rounded-2xl w-full"></div>
      </div>
      <div className="flex gap-4 items-start   pb-4">
        <img
          src={ASSETS.PRODUCT1}
          alt="Product"
          className="w-28 h-36 object-cover rounded-md border"
        />

        <div className="flex flex-col  gap-y-2.5 flex-1">
          <div className="flex justify-between items-start text-textPrimary">
            <div>
              <h3 className="font-semibold  text-textPrimary md:text-lg">
                Product Title
              </h3>
              <p className="text-sm text-[13px] flex gap-x-1 items-center ">
                <span className="text-[13px] text-[#939393] px-2 ">1 unit</span>{" "}
                ₹500 <span className="border-l h-3 border-gray-300"></span>
                <span className="text-[13px]  text-[#939393]">Size</span> 100 ML
              </p>
              <div className="mt-1">
                <span className="text-base font-bold md:text-[22px] text-title">
                  ₹1,000
                </span>
                <span className="line-through ml-2 text-sm text-gray-400">
                  ₹1,200
                </span>
                <span className="ml-2 text-sm text-green-600 font-semibold">
                  20% off
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="flex items-center gap-2 border w-fit  px-4 rounded-lg">
              <Button
                variant="outline"
                size="icon"
                className="border-none cursor-pointer  w-fit text-xl font-semibold"
                onClick={handleDecrease}
              >
                {" −"}
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-10    font-semibold border-none text-center"
                min={1}
              />
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer  border-none  w-fit text-xl font-semibold"
                onClick={handleIncrease}
              >
                +
              </Button>
            </div>{" "}
            <button className="text-gray-500 cursor-pointer hover:text-red-500">
              <Icons.Remove />
            </button>
          </div>
        </div>
      </div>
 <div className="flex gap-4 items-start   pb-4">
        <img
          src={ASSETS.PRODUCT1}
          alt="Product"
          className="w-28 h-36 object-cover rounded-md border"
        />

        <div className="flex flex-col  gap-y-2.5 flex-1">
          <div className="flex justify-between items-start text-textPrimary">
            <div>
              <h3 className="font-semibold  text-textPrimary md:text-lg">
                Product Title
              </h3>
              <p className="text-sm text-[13px] flex gap-x-1 items-center ">
                <span className="text-[13px] text-[#939393] px-2 ">1 unit</span>{" "}
                ₹500 <span className="border-l h-3 border-gray-300"></span>
                <span className="text-[13px]  text-[#939393]">Size</span> 100 ML
              </p>
              <div className="mt-1">
                <span className="text-base font-bold md:text-[22px] text-title">
                  ₹1,000
                </span>
                <span className="line-through ml-2  fnttext-sm text-gray-400">
                  ₹1,200
                </span>
                <span className="ml-2 text-sm text-green-600 font-semibold">
                  20% off
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="flex items-center gap-2 border w-fit  px-4 rounded-lg">
              <Button
                variant="outline"
                size="icon"
                className="border-none cursor-pointer  w-fit text-xl font-semibold"
                onClick={handleDecrease}
              >
                {" −"}
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-10    font-semibold border-none text-center"
                min={1}
              />
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer  border-none  w-fit text-xl font-semibold"
                onClick={handleIncrease}
              >
                +
              </Button>
            </div>{" "}
            <button className="text-gray-500 cursor-pointer hover:text-red-500">
              <Icons.Remove />
            </button>
          </div>
        </div>
      </div> <div className="flex gap-4 items-start   pb-4">
        <img
          src={ASSETS.PRODUCT1}
          alt="Product"
          className="w-28 h-36 object-cover rounded-md border"
        />

        <div className="flex flex-col  gap-y-2.5 flex-1">
          <div className="flex justify-between items-start text-textPrimary">
            <div>
              <h3 className="font-semibold  text-textPrimary md:text-lg">
                Product Title
              </h3>
              <p className="text-sm text-[13px] flex gap-x-1 items-center ">
                <span className="text-[13px] text-[#939393] px-2 ">1 unit</span>{" "}
                ₹500 <span className="border-l h-3 border-gray-300"></span>
                <span className="text-[13px]  text-[#939393]">Size</span> 100 ML
              </p>
              <div className="mt-1">
                <span className="text-base font-bold md:text-[22px] text-title">
                  ₹1,000
                </span>
                <span className="line-through ml-2 text-sm text-gray-400">
                  ₹1,200
                </span>
                <span className="ml-2 text-sm text-green-600 font-semibold">
                  20% off
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-1.5">
            <div className="flex items-center gap-2 border w-fit  px-4 rounded-lg">
              <Button
                variant="outline"
                size="icon"
                className="border-none cursor-pointer  w-fit text-xl font-semibold"
                onClick={handleDecrease}
              >
                {" −"}
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-10    font-semibold border-none text-center"
                min={1}
              />
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer  border-none  w-fit text-xl font-semibold"
                onClick={handleIncrease}
              >
                +
              </Button>
            </div>{" "}
            <button className="text-gray-500 cursor-pointer hover:text-red-500">
              <Icons.Remove />
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <div className="space-y-2 text-sm font-medium text-title">
          <h3 className="font-semibold text-xl">Price Details</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="">-₹200</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between font-semibold text-base">
            <span className="font-semibold text-[#0B130B]">Total</span>
            <span className="text-[#0B130B] font-bold">₹1,150</span>
          </div>
          <Button className="w-full h-10  cursor-pointer" onClick={()=>{
            navigae('/checkout')
            onClose(false)

          }}>
            Checkout{" "}
            <ul className="flex -space-x-2 ">
              <li>
                <img src={ASSETS.PAYTM} alt="" className="w-6" />
              </li>
              <li>
                <img src={ASSETS.PHONEPAY} alt="" className="w-6" />
              </li>

              <li>
                <img src={ASSETS.GPAY} alt="" className="w-6" />
              </li>

              <li>
                <img src={ASSETS.FRAMEPAY} alt="" className="w-6" />
              </li>
            </ul>{" "}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
