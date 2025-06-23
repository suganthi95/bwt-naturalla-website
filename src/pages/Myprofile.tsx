import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";

import Dashboard from "@/components/profile/dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import UserAddress from "@/components/profile/address/UserAddress";
import Order from "@/components/profile/orders/Order";
import { useState } from "react";
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog";
import Settings from "@/components/profile/settings/Settings";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  useGetOrders,
  useGetProfileInfo,
} from "@/services/profile";
import ProfilePictureUpload from "@/components/profile/ProfilePictureUpload";

export default function Myprofile() {
  const [IsProfileUpdate, setIsProfileUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  // const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // setSelectedOrder(null);
  };
  const { token } = useSelector((state: RootState) => state.auth);
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
                src={
                  (profileInfo && profileInfo[0]?.profile_pic) || ASSETS.USER
                }
                alt="user-profile"
                className="w-full h-full object-cover rounded-full"
              />
              <Dialog open={IsProfileUpdate} onOpenChange={setIsProfileUpdate}>
                <DialogTrigger>
                  <button
                    className="absolute cursor-pointer bottom-10 -right-4 -translate-x-1/2 translate-y-1/2 bg-white border border-gray-300 p-2 rounded-lg shadow-md hover:bg-gray-100"
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

           
                  <Button onClick={()=>setActiveTab('settings')}>Edit</Button>
             
            </div>
          </div>
        </div>
        {/* <div className="grid place-items-start">
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
        </div> */}
        <div className="mb-6">
          <nav className="flex border-b">
            <button
              onClick={() => handleTabChange("dashboard")}
              className={`px-6 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "text-green-800 border-b-2 border-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleTabChange("addresses")}
              className={`px-6 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                activeTab === "addresses"
                  ? "text-green-800 border-b-2 border-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Addresses
            </button>
            <button
              onClick={() => handleTabChange("orderHistory")}
              className={`px-6 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                activeTab === "orderHistory"
                  ? "text-green-800 border-b-2 border-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => handleTabChange("settings")}
              className={`px-6 py-3 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap ${
                activeTab === "settings"
                  ? "text-green-800 border-b-2 border-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        <div>
          {activeTab === "dashboard" && <Dashboard handleTabChange={handleTabChange} />}
          {activeTab === "addresses" && <UserAddress />}
          {activeTab === "orderHistory" && <Order Orders={orders} handleTab={handleTabChange} />}
          {activeTab === "settings" && <Settings User={profileInfo && profileInfo} />}
        </div>
      </div>
    </section>
  );
}
