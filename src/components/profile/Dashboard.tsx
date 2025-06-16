import { Icons } from "@/assets/icons";

export default function Dashboard() {
  const dashboard = [
    {
      id: 1,
      Icon: Icons.Bundeles,
      count: 0,
      text: "Total Orders",
      bg: "#E3F5F9",
    },
    {
      id: 2,
      Icon: Icons.Cart,
      count: 0,
      text: "Products in Cart",
      bg: "#FEEDEF",
    },
    {
      id: 3,
      Icon: Icons.HeartCart,
      count: 0,
      text: "Products You Love",
      bg: "#FEE7D7",
    },
  ];

  return (
    <div className="mt-5 space-y-6">
      <ul className="flex items-center gap-10">
        {dashboard.map((item) => (
          <li
            key={item.id}
            className="border rounded-2xl   transition w-80 p-6 bg-white"
          >
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-full"
                style={{ backgroundColor: item.bg }}
              >
                <item.Icon className="text-3xl text-neutral-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-800">
                  {item.count}
                </h2>
                <p className="text-sm text-neutral-600">{item.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h2 className="text-lg font-semibold mb-3">Default Shipping Address</h2>
        <div className="border md:w-6/12 p-4">
          <ul className="text-[#524646] text-[15px]">
            <li>28, Mayor Shivashanmugam St</li>
            <li>Seetha Nagar, Nungambakkam,</li>
            <li>Chennai, Tamil Nadu - 600034.</li>
          </ul>
        </div>
      </div>
     
    </div>
  );
}
