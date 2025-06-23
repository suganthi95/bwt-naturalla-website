import { Icons } from "@/assets/icons";
import type { RootState } from "@/redux/store";
import { useGetDashboard, useGetRecentOrders } from "@/services/profile";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
interface Props {
  handleTabChange: (val: string) => void;
}
export default function Dashboard({ handleTabChange }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetDashboard(token);
  const { data:RecentOrders } = useGetRecentOrders(token);


  const dashboard = [
    {
      id: 1,
      Icon: Icons.Bundeles,
      count: data?.dashboard?.total_orders,
      text: "Total Orders",
      label:'Last 90 days',
      bg: "#E3F5F9",
    },
    {
      id: 2,
      Icon: Icons.Cart,
      count: data?.dashboard?.cart_count,
      text: "Products in Cart",
            label:'Products Saved',

      bg: "#FEEDEF",
    },
    {
      id: 3,
      Icon: Icons.HeartCart,
      count: data?.dashboard?.wishlist_count,
      text: "Products You Love",
            label:'Products reviewed',

      bg: "#FEE7D7",
    },
  ];
console.log(RecentOrders);

  return (
    <div className="mt-5 space-y-6">
      <ul className="grid grid-cols-3 gap-x-8">
        {dashboard.map((item) => (
         
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-x-3 mb-2">
                    <div
                      className="p-4 rounded-full"
                      style={{ backgroundColor: item.bg }}
                    >
                      <item.Icon className="text-3xl text-neutral-700" />
                    </div>{" "}
                    <h4 className="font-medium">{item?.text}</h4>
                  </div>
                  <p className="text-3xl font-semibold">{item?.count}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.label}</p>
                </div>
           
        ))}
      </ul>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recent Orders</h3>
          <button
            onClick={() => handleTabChange("orderHistory")}
            className="text-green-700 hover:text-green-900 flex items-center cursor-pointer !rounded-button whitespace-nowrap"
          >
            View All
            <i className="fas fa-chevron-right ml-1 text-xs"></i>
          </button>
        </div>
        <div className="divide-y">
          {RecentOrders?.slice(0, 2)?.map((order:any) => (
            <div key={order.order_code} className="py-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Order #{order?.order_code}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    order?.order_status === "order confirmed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order?.order_status}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {dayjs(order?.order_date).format('MMMM DD YYYY')} • Rs.{order?.order_amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
