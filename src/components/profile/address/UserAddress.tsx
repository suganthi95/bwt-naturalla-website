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
  const [selectedAddressId,setSelectedAddressId] = useState<string>()
  const queryClinet = useQueryClient();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: addresses } = useGetAddress(token);
  const { mutate, isPending } = useDeleteAddress();
  const [selectedAddress, setSelectedAddress] = useState<AddressPayload | null>(
    null
  );

  const handleDeleteAddress = () => {
    mutate(
      {
        id: selectedAddressId ?? '',
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
      <div className="p-4 md:p-6 border-b flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-xl font-semibold">My Addresses</h3>
          <p className="text-gray-600 text-sm mt-1">
            Manage your shipping addresses
          </p>
        </div>

        <Dialog open={Isopen} onOpenChange={setIsopen}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">Add New Address</Button>
          </DialogTrigger>

          <DialogContent className=" !min-w-64 mt-5 xl:mt-0 xl:!max-w-3xl max-h-[90vh] overflow-y-auto !p-0 [&>button]:hidden">
            <DialogHeader className="bg-[#F5F5F5] p-2 md:p-4 rounded-lg w-full flex flex-row justify-between items-center">
              <DialogTitle className="text-base md:text-lg">
                Add your address
              </DialogTitle>
              <div className="cursor-pointer" onClick={() => setIsopen(false)}>
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
            key={address.address_id}
            className="border rounded-lg p-2 md:p-5 relative"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm md:text-lg">
                {address?.address_first_name} {address?.address_last_name}
              </h4>
              <div className="space-x-2">
                <Dialog open={Isopen2} onOpenChange={setIsopen2}>
                  <DialogTrigger className="cursor-pointer">
                    <Button
                    size={'icon'}
                      onClick={() => setSelectedAddress(address)}
                      type="button"
                      className="rounded-full text-[#34C759] bg-[#34C759]/10 hover:bg-[#34C7591A]/20"
                    >
                      <Edit className="md:h-5 md:w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className=" !min-w-64 mt-5 xl:mt-0 xl:!max-w-3xl max-h-[90vh] overflow-y-auto !p-0 [&>button]:hidden">
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
                    <EditAddress
                      address_id={address.address_id}
                      address={selectedAddress}
                      onClose={setIsopen2}
                    />
                  </DialogContent>
                </Dialog>

                <AlertDialog open={Isdelete} onOpenChange={setIsDelete}>
                  <AlertDialogTrigger asChild>
                    <Button

                    onClick={()=>setSelectedAddressId(address.address_id)}
                      size="icon"
                      className="rounded-full text-red-400 bg-red-400/25 hover:bg-red-400/10"
                    >
                      <Trash2 className="md:h-5 md:w-5" />
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
                        onClick={() => handleDeleteAddress()}
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
            <p className="mb-1 text-sm md:text-base">{address?.address}</p>
            <p className="mb-1 text-sm md:text-base">
              {address?.city}, {address?.state} {address?.pincode}
            </p>
            {/* <p className="mb-1">{address.country}</p> */}
            <p className="mt-2 text-gray-600">{address?.address_phone_no}</p>
            {address?.default_address && (
              <span className="mt-10  bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                primary
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
