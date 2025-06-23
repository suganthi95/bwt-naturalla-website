import React, { useState } from "react";
const Example: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orderHistory");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<any>(null);
  const [profileData, setProfileData] = useState({
    firstName: "Brooklyn",
    lastName: "Simmons",
    email: "brook.simmon@gmail.com",
  });
  const orders = [
    {
      id: "ORD-7829",
      date: "June 12, 2025",
      status: "Delivered",
      total: "$78.95",
      items: [
        {
          id: "PRD-001",
          name: "Natural Moisturizing Cream",
          price: "$24.99",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=A%20luxurious%20natural%20moisturizing%20cream%20in%20an%20elegant%20glass%20jar%20with%20wooden%20cap%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20product%20photography&width=80&height=80&seq=1&orientation=squarish",
        },
        {
          id: "PRD-002",
          name: "Organic Hair Serum",
          price: "$32.50",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=A%20premium%20organic%20hair%20serum%20in%20a%20sleek%20glass%20dropper%20bottle%20with%20natural%20ingredients%20visible%20inside%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20haircare%20product%20photography&width=80&height=80&seq=2&orientation=squarish",
        },
        {
          id: "PRD-003",
          name: "Vitamin C Face Mask",
          price: "$21.46",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=A%20refreshing%20vitamin%20C%20face%20mask%20in%20a%20premium%20jar%20with%20citrus%20elements%20nearby%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20product%20photography&width=80&height=80&seq=3&orientation=squarish",
        },
      ],
    },
    {
      id: "ORD-6543",
      date: "May 28, 2025",
      status: "Delivered",
      total: "$56.20",
      items: [
        {
          id: "PRD-004",
          name: "Natural Lip Balm Set",
          price: "$18.99",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=A%20set%20of%20natural%20lip%20balms%20in%20various%20flavors%20arranged%20in%20a%20beautiful%20pattern%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20cosmetic%20product%20photography&width=80&height=80&seq=4&orientation=squarish",
        },
        {
          id: "PRD-005",
          name: "Eco-friendly Shampoo",
          price: "$37.21",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=An%20eco-friendly%20shampoo%20in%20a%20sustainable%20bamboo%20container%20with%20natural%20ingredients%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20haircare%20product%20photography&width=80&height=80&seq=5&orientation=squarish",
        },
      ],
    },
    {
      id: "ORD-5421",
      date: "April 15, 2025",
      status: "Delivered",
      total: "$112.75",
      items: [
        {
          id: "PRD-006",
          name: "Complete Skincare Set",
          price: "$112.75",
          quantity: 1,
          image:
            "https://readdy.ai/api/search-image?query=A%20complete%20premium%20skincare%20set%20with%20multiple%20products%20arranged%20beautifully%2C%20including%20serums%2C%20creams%2C%20and%20cleansers%20in%20matching%20packaging%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20collection%20photography&width=80&height=80&seq=6&orientation=squarish",
        },
      ],
    },
  ];
  const addresses = [
    {
      id: "addr1",
      name: "Home",
      recipient: "Brooklyn Simmons",
      street: "2118 Thornridge Cir.",
      city: "Syracuse",
      state: "Connecticut",
      zip: "35624",
      country: "United States",
      phone: "(603) 555-0123",
      isDefault: true,
    },
    {
      id: "addr2",
      name: "Office",
      recipient: "Brooklyn Simmons",
      street: "4140 Parker Rd.",
      city: "Allentown",
      state: "New Mexico",
      zip: "31134",
      country: "United States",
      phone: "(603) 555-0123",
      isDefault: false,
    },
  ];
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedOrder(null);
  };
  const handleOrderSelect = (orderId: string) => {
    setSelectedOrder(orderId);
  };
  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };
  const handleOpenReview = (product: any) => {
    setReviewProduct(product);
    setShowReviewModal(true);
  };
  const handleCloseReview = () => {
    setShowReviewModal(false);
    setReviewProduct(null);
  };
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewModal(false);
    setReviewProduct(null);
  };

  
  const renderSelectedOrder = () => {
    const order = orders.find((o) => o.id === selectedOrder);
    if (!order) return null;
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToOrders}
            className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Orders
          </button>
          <button className="text-green-700 hover:text-green-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-download mr-2"></i>
            Download Invoice
          </button>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.status}
          </span>
        </div>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
          <p className="text-gray-600">Placed on {order.date}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Brooklyn Simmons</p>
                <p>2118 Thornridge Cir.</p>
                <p>Syracuse, Connecticut 35624</p>
                <p>United States</p>
                <p className="mt-2 text-gray-600">(603) 555-0123</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Payment Method</h4>
              <div className="bg-gray-50 p-4 rounded flex items-center">
                <i className="fas fa-credit-card text-gray-600 mr-2"></i>
                <div>
                  <p>Credit Card</p>
                  <p className="text-gray-600">**** **** **** 4242</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Order Timeline</h4>
              <div className="bg-gray-50 p-4 rounded space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-gray-600">
                      June 12, 2025 - 9:30 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                    <i className="fas fa-box"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Order Shipped</p>
                    <p className="text-sm text-gray-600">
                      June 13, 2025 - 10:15 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-800">
                    <i className="fas fa-truck"></i>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Expected Delivery</p>
                    <p className="text-sm text-gray-600">June 15, 2025</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tracking Information</h4>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">Tracking Number</p>
                <p className="text-gray-600">1Z999AA1234567890</p>
                <a
                  href="#"
                  className="text-green-700 hover:text-green-800 mt-2 inline-block"
                >
                  Track Package
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-medium mb-3">Items</h4>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h5 className="font-medium">{item.name}</h5>
                <div className="flex justify-between mt-2">
                  <div className="text-gray-600">
                    <p>Qty: {item.quantity}</p>
                    <p>{item.price}</p>
                  </div>
                  {order.status === "Delivered" && (
                    <button
                      onClick={() => handleOpenReview(item)}
                      className="text-green-700 hover:text-green-900 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium mb-4">Payment Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>$78.95</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>$6.32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-700">-$10.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-medium">
              <span>Total</span>
              <span>{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderOrderHistory = () => {
    if (selectedOrder) {
      return renderSelectedOrder();
    }
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">My Orders</h3>
          <p className="text-gray-600 mt-1">
            View and manage your order history
          </p>
        </div>
        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium">Order #{order.id}</h4>
                  <p className="text-gray-600 text-sm">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-sm font-medium">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{order.total}</p>
                  <p className="text-gray-600 text-sm">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <button
                  onClick={() => handleOrderSelect(order.id)}
                  className="text-green-700 hover:text-green-900 flex items-center cursor-pointer !rounded-button whitespace-nowrap"
                >
                  View Details
                  <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderAddresses = () => {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">My Addresses</h3>
            <p className="text-gray-600 mt-1">Manage your shipping addresses</p>
          </div>
          <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-plus mr-2"></i>
            Add New Address
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-5 relative">
              {address.isDefault && (
                <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Default
                </span>
              )}
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-lg">{address.name}</h4>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <p className="mb-1">{address.recipient}</p>
              <p className="mb-1">{address.street}</p>
              <p className="mb-1">
                {address.city}, {address.state} {address.zip}
              </p>
              <p className="mb-1">{address.country}</p>
              <p className="mt-2 text-gray-600">{address.phone}</p>
              {!address.isDefault && (
                <button className="mt-4 text-green-700 font-medium cursor-pointer !rounded-button whitespace-nowrap">
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">
            Welcome Back, Brooklyn!
          </h3>
          <p className="text-gray-600">
            Here's a summary of your recent activity and account status.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <i className="fas fa-box-open text-green-700 mr-2"></i>
                <h4 className="font-medium">Recent Orders</h4>
              </div>
              <p className="text-3xl font-semibold">{orders.length}</p>
              <p className="text-gray-600 text-sm mt-1">Last 90 days</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <i className="fas fa-heart text-green-700 mr-2"></i>
                <h4 className="font-medium">Wishlist Items</h4>
              </div>
              <p className="text-3xl font-semibold">12</p>
              <p className="text-gray-600 text-sm mt-1">Products saved</p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <i className="fas fa-star text-green-700 mr-2"></i>
                <h4 className="font-medium">Reviews</h4>
              </div>
              <p className="text-3xl font-semibold">5</p>
              <p className="text-gray-600 text-sm mt-1">Products reviewed</p>
            </div>
          </div>
        </div>
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
            {orders.slice(0, 2).map((order) => (
              <div key={order.id} className="py-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Order #{order.id}</h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  {order.date} • {order.total}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="cursor-pointer">
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-2 aspect-square">
                  <img
                    src={`https://readdy.ai/api/search-image?query=A%20premium%20natural%20organic%20beauty%20product%20with%20elegant%20minimalist%20packaging%2C%20placed%20on%20a%20clean%20white%20surface%20with%20soft%20shadows%2C%20professional%20product%20photography%20with%20subtle%20light%20background%2C%20high-end%20cosmetic%20marketing%20image%20with%20pristine%20details%20and%20luxurious%20appearance&width=200&height=200&seq=${
                      i + 10
                    }&orientation=squarish`}
                    alt="Recommended product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h5 className="font-medium text-sm">Natural Beauty Product</h5>
                <p className="text-green-700 font-medium text-sm mt-1">
                  $29.99
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const renderSettings = () => {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Account Settings</h3>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and security
          </p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue="Brooklyn"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue="Simmons"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue="brook.simmon@gmail.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  defaultValue="(603) 555-0123"
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-4">Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>
              <div></div>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="font-semibold text-lg mb-4">
              Notification Preferences
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order Updates</p>
                  <p className="text-gray-600 text-sm">
                    Receive notifications about your order status
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotions and Offers</p>
                  <p className="text-gray-600 text-sm">
                    Receive emails about new products and special offers
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Product Recommendations</p>
                  <p className="text-gray-600 text-sm">
                    Receive personalized product recommendations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 cursor-pointer !rounded-button whitespace-nowrap">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
   
   
      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-end mb-8">
        
        
        </div>
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
        {/* Tab Content */}
        <div>
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "addresses" && renderAddresses()}
          {activeTab === "orderHistory" && renderOrderHistory()}
          {activeTab === "settings" && renderSettings()}
        </div>
      </div>
      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <button
                id="closeEditProfileModal"
                onClick={() => setShowEditProfileModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="mb-6 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20portrait%20photograph%20of%20a%20young%20woman%20with%20natural%20makeup%20and%20a%20friendly%20smile%2C%20soft%20lighting%20against%20a%20neutral%20background%2C%20warm%20and%20approachable%20expression%2C%20high%20quality%20professional%20headshot%20style&width=150&height=150&seq=8&orientation=squarish"
                    alt="Profile"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <button
                  id="uploadProfilePicture"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer !rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-camera text-gray-600"></i>
                </button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  id="profilePictureInput"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  id="profileFirstName"
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  id="profileLastName"
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  id="profileEmail"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                id="cancelEditProfile"
                onClick={() => setShowEditProfileModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                id="saveProfile"
                onClick={() => {
                  // Here you would typically save the changes
                  setShowEditProfileModal(false);
                }}
                className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer !rounded-button whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button
                onClick={handleCloseReview}
                className="text-gray-500 hover:text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                <img
                  src={reviewProduct?.image}
                  alt={reviewProduct?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium">{reviewProduct?.name}</h4>
                <p className="text-gray-600 text-sm">{reviewProduct?.price}</p>
              </div>
            </div>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl text-yellow-400 cursor-pointer !rounded-button whitespace-nowrap"
                    >
                      <i className="fas fa-star"></i>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Review Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Summarize your experience"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Review</label>
                <textarea
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                  placeholder="Share your experience with this product"
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Add Photos (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <i className="fas fa-camera text-gray-400 text-2xl mb-2"></i>
                  <p className="text-gray-500">
                    Drag and drop or click to upload
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                  <button
                    type="button"
                    className="mt-2 text-green-700 font-medium text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseReview}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Example;
