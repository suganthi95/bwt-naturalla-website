import { Edit, Loader2, Trash2, X } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function UserAddress() {
  const [Isopen, setIsopen] = useState(false);
  const [Isopen2, setIsopen2] = useState(false);
  const [Isdelete, setIsDelete] = useState(false);
  const queryClinet = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: addresses } = useGetAddress(token);
  const { mutate, isPending } = useDeleteAddress();
  const [selectedAddress, setSelectedAddress] = useState<AddressPayload | null>(
    null
  );

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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">My Addresses</h3>
          <p className="text-gray-600 mt-1">Manage your shipping addresses</p>
        </div>
        <Dialog open={Isopen} onOpenChange={setIsopen}>
          <DialogTrigger className="cursor-pointer">
            <Button className="grid place-items-center">Add New Address</Button>
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

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {addresses?.map((address: any) => (
          <div
            key={address?.address_id}
            className="border rounded-lg p-5 relative"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">
                {address?.address_first_name} {address?.address_last_name}
              </h4>
              <div className="space-x-2">
                <Dialog open={Isopen2} onOpenChange={setIsopen2}>
                  <DialogTrigger className="cursor-pointer">
                    <Button
                    onClick={()=>setSelectedAddress(address)}
                      type="button"
                      className="rounded-full text-[#34C759] bg-[#34C759]/10 hover:bg-[#34C7591A]/20"
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
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
                    <EditAddress  address_id={address.address_id}   address={selectedAddress} onClose={setIsopen2} />
                  </DialogContent>
                </Dialog>

                <AlertDialog open={Isdelete} onOpenChange={setIsDelete}>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full text-red-400 bg-red-400/25 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. It will permanently delete
                        the address from the system.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500"
                        onClick={() => handleDeleteAddress(address?.address_id)}
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Delete"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="flex justify-between items-start mb-3">
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <p className="mb-1">{address?.address}</p>
            <p className="mb-1">
              {address?.city}, {address?.state} {address?.pincode}
            </p>
            {/* <p className="mb-1">{address.country}</p> */}
            <p className="mt-2 text-gray-600">{address?.address_phone_no}</p>
            {address?.default_address && (
              <span className="mt-10  bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
