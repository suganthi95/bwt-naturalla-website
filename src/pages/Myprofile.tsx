import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";
import Dashboard from "@/components/profile/Dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Myprofile() {
  return (
    <section className=" mb-10 md:mb-20">
      <img src={ASSETS.RECTANGLE} alt="profile-banner" className="" />
      <div className="container mx-auto">
        <div className="flex items-center  gap-x-2.5 -translate-y-10">
          <div className="rounded-full size-40 border-white border-4">
            <img
              src={ASSETS.USER}
              alt="user-profile"
              className="rounded-full w-full"
            />
          </div>
          <div>
            <h2 className="flex items-center gap-x-1 font-bold text-xl">
              Brooklyn Simmons{" "}
              <span>
                <Icons.BlueCheck />
              </span>{" "}
            </h2>
            <p className="text-[#98A298] font-medium">brook.simmon@gmail.com</p>
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
                value="notification"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="order"
              >
                Order History
              </TabsTrigger>
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="gift"
              >
                Gift Voucher
              </TabsTrigger>
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="change"
              >
                Change Password
              </TabsTrigger>
              <TabsTrigger
                className="  font-normal data-[state=active]:text-primary underline-offset-8  data-[state=active]:underline decoration-2   cursor-pointer data-[state=active]:font-semibold  data-[state=active]:shadow-none"
                value="shop"
              >
                Shop
              </TabsTrigger>
            </TabsList>
            <TabsContent value={"dashboard"}>
                <Dashboard/>
            </TabsContent>
            <TabsContent value={"address"}></TabsContent>
            <TabsContent value={"notification"}></TabsContent>
            <TabsContent value={"order"}></TabsContent>
            <TabsContent value={"gift"}></TabsContent>
            <TabsContent value={"change"}></TabsContent>
            <TabsContent value={"shop"}></TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
