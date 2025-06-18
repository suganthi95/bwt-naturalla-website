import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";

import Dashboard from "@/components/profile/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAddress from "@/components/profile/address/UserAddress";
import Order from "@/components/profile/orders/Order";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  X } from "lucide-react";
import EditAddress from "@/components/profile/address/EditAddress";
import Settings from "@/components/profile/settings/Settings";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  useGetAddress,
  useGetOrders,
  useGetProfileInfo,
} from "@/services/profile";
import type { AddressPayload } from "@/types/type";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";

export default function Myprofile() {
  const [Isopen, setIsopen] = useState(false);
  const [IsProfileUpdate, setIsProfileUpdate] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetAddress(token);
  const { data: orders } = useGetOrders(token);
  const { data: profileInfo } = useGetProfileInfo(token);

  return (
    <section className=" mb-10 md:mb-20">
      <img src={ASSETS.RECTANGLE} alt="profile-banner" className="" />
      <div className="container mx-auto">
        <div className="w-full">
          <div className="flex items-center w-full  gap-x-2.5 -translate-y-10">
            <div className="relative w-[180px] h-40 rounded-full border-4 border-white overflow-hidden">
              <img
                src={(profileInfo && profileInfo[0]?.profile_pic) || ASSETS.USER}
                alt="user-profile"
                className="w-full h-full object-cover rounded-full"
              />
              <Dialog open={IsProfileUpdate} onOpenChange={setIsProfileUpdate}>
                <DialogTrigger>
                  <button
                    className="absolute cursor-pointer bottom-10 -right-4 -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 p-2 rounded-lg shadow-md hover:bg-gray-100"
                    onClick={() => console.log("Edit clicked")}
                  >
                    <Icons.Edit className="w-4 h-4 text-gray-600" />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <ProfilePictureUpload dialogOpen={setIsProfileUpdate} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="flex items-center gap-x-1 font-bold text-xl">
                  {profileInfo && profileInfo[0]?.first_name}{" "}
                  {profileInfo && profileInfo[0]?.last_name}{" "}
                  <span>
                    <Icons.BlueCheck />
                  </span>{" "}
                </h2>
                <p className="text-[#98A298] font-medium">
                  {profileInfo && profileInfo[0]?.email}
                </p>
              </div>

              <Dialog open={Isopen} onOpenChange={setIsopen}>
                <DialogTrigger className="cursor-pointer">
                  <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent className="!max-w-3xl [&>button]:hidden  !p-0">
                  <DialogHeader className="bg-[#F5F5F5] p-4 rounded w-full flex flex-row  justify-between">
                    <DialogTitle>Update address</DialogTitle>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setIsopen(false);
                      }}
                    >
                      <X  />
                    </div>
                  </DialogHeader>
                  <EditAddress
                    onClose={setIsopen}
                    address={data?.address?.filter(
                      (item: AddressPayload) => item.default_address === true
                    )}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="grid place-items-start">
          <h2 className="font-semibold text-2xl">My Profile</h2>
          <Tabs defaultValue="dashboard" className="w-full mt-4  ">
            <TabsList className="flex items-center justify-start  -ml-7 pb-5  border-b gap-x-5 bg-transparent">
              <hr />
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="dashboard"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="address"
              >
                Address
              </TabsTrigger>

              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="order"
              >
                Order History
              </TabsTrigger>

              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="settings"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"dashboard"}>
              <Dashboard />
            </TabsContent>
            <TabsContent value={"address"}>
              <UserAddress />
            </TabsContent>
            <TabsContent value={"order"}>
              <Order Orders={orders} />
            </TabsContent>

            <TabsContent value={"settings"}>
              <Settings User={profileInfo} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
