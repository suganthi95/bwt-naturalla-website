import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";

import Dashboard from "@/components/profile/Dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAddress from "@/components/profile/UserAddress";
import Order from "@/components/profile/Order";

export default function Myprofile() {
  return (
    <section className=" mb-10 md:mb-20">
      <img src={ASSETS.RECTANGLE} alt="profile-banner" className="" />
      <div className="container mx-auto">
        <div>
        <div className="flex items-center  gap-x-2.5 -translate-y-10">
          <div className="rounded-full size-40 border-white border-4">
            <img
              src={ASSETS.USER}
              alt="user-profile"
              className="rounded-full w-full"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
            <h2 className="flex items-center gap-x-1 font-bold text-xl">
              Brooklyn Simmons{" "}
              <span>
                <Icons.BlueCheck />
              </span>{" "}
            </h2>
            <p className="text-[#98A298] font-medium">brook.simmon@gmail.com</p>

            </div>
            <Button>Edit</Button>
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
                value="shop"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"dashboard"}>
                <Dashboard/>
            </TabsContent>
            <TabsContent value={"address"}>
              <UserAddress/>
            </TabsContent>
            <TabsContent value={"order"}>
              <Order/>
            </TabsContent>
           
            <TabsContent value={"settings"}></TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
