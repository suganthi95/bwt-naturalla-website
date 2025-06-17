import { Loader2, Plus, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import AddAddress from "./AddAddress";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useDeleteAddress, useGetAddress } from "@/services/profile";
import type { AddressPayload } from "@/types/type";
import EditAddress from "./EditAddress";
import { toast } from "sonner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function UserAddress() {
  const [Isopen, setIsopen] = useState(false);
  const [Isopen2, setIsopen2] = useState(false);
  const queryClinet = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetAddress(token);
  const { mutate, isPending } = useDeleteAddress();
const [selectedAddress, setSelectedAddress] = useState<AddressPayload | null>(null);

  const handleDeleteAddress = (id: number) => {
    mutate(
      {
        id: id.toString(),
        token: token,
      },
      {
        onSuccess() {
          toast.success("Address deleted");
          queryClinet.invalidateQueries({ queryKey: ["getaddress"] });
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };
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
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsopen(false);
                }}
              >
                <X />
              </div>
            </DialogHeader>
            <AddAddress onClose={setIsopen} />
          </DialogContent>
        </Dialog>
      </div>

      <ul className="flex gap-x-3.5">
        {data?.address?.map((item: AddressPayload,index:number) => {
          return (
            <li key={index}  className=" border rounded-lg p-2 px-4 space-y-3.5 ">
              <div className="flex items-center gap-x-4 justify-between">
                <h2 className="font-semibold text-lg">
                  {item?.address_first_name} {item?.address_last_name}
                </h2>
                {item?.default_address && (
                  <Badge className="border-primary w-20  bg-primary/10 text-primary">
                    Default
                  </Badge>
                )}
              </div>
              <div className="text-textPrimary ">
                <p>{item?.address}</p>
                {/* <p>Seetha Nagar,</p> */}
                <p>{item?.city}</p>
                <p>
                  {" "}
                  {item?.state} - {item?.pincode}.
                </p>
              </div>
              <p className="font-medium text-textPrimary">
                Ph:+91{item?.address_phone_no}
              </p>
              <div className="flex items-center gap-x-2">
                <Dialog open={Isopen2} onOpenChange={setIsopen2}>
                  <DialogTrigger>
                    <Button onClick={()=>setSelectedAddress(item)} className="bg-[#007AFF] w-28 ">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="!max-w-3xl [&>button]:hidden  !p-0">
                    <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                      <DialogTitle>Update address</DialogTitle>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          setIsopen2(false);
                        }}
                      >
                        <X />
                      </div>
                    </DialogHeader>
                    <EditAddress onClose={setIsopen} address={selectedAddress} />
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => handleDeleteAddress(item.address_id ?? 0)}
                  variant={"outline"}
                  className="text-red-500 w-28"
                >
                  {isPending ? <Loader2 className="animate-spin" /> : "Remove"}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
