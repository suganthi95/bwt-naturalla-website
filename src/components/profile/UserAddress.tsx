import { Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddAddress from "./AddAddress";
import { useState } from "react";

export default function UserAddress() {
  const [Isopen, setIsopen] = useState(false);
  return (
    <div className="flex gap-x-14  mt-4">
      <div className="border-2 w-64 px-4 border-dashed  grid place-items-center rounded-lg">
        <Dialog open={Isopen} onOpenChange={setIsopen}>
          <DialogTrigger className="cursor-pointer">
            <div className="grid place-items-center">
              <div className="bg-[#ECF9EB] rounded-full p-1">
                <Plus />
              </div>
              <h2 className="text-textPrimary font-semibold text-xl">
                Add Address
              </h2>
            </div>
          </DialogTrigger>
          <DialogContent className="!max-w-3xl [&>button]:hidden  !p-0">
            <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
              <DialogTitle>Add your address</DialogTitle>
              <div className="cursor-pointer" onClick={()=>{
                setIsopen(false)
              }}>
                <X />
              </div>
            </DialogHeader>
            <AddAddress />
          </DialogContent>
        </Dialog>
      </div>

      <ul className="flex">
        <li className=" border rounded-lg p-2 px-4 space-y-3.5 ">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Vasanth</h2>
            <Badge className="border-primary w-20  bg-primary/10 text-primary">
              Default
            </Badge>
          </div>
          <div className="text-textPrimary ">
            <p>28, Mayor Shivashanmugam St,</p>
            <p>Seetha Nagar,</p>
            <p>Nungambakkam, Chennai,</p>
            <p> Tamil Nadu - 600034.</p>
          </div>
          <p className="font-medium text-textPrimary">Ph: +91-9876543210</p>
          <div className="flex items-center gap-x-2">
            <Button className="bg-[#007AFF] w-28 ">Edit</Button>
            <Button variant={"outline"} className="text-red-500 w-28">
              Remove
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
}