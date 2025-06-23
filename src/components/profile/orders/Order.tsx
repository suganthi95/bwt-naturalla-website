import { useState } from "react";
import type { Order } from "@/types/type";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Truck,
  X,
} from "lucide-react";
import { useGetOrdersDetails } from "@/services/profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import WriteReview from "./WrtiteReview";
import UpdateReview from "./UpdateReview";
interface Props {
  Orders: Order[];
  handleTab: (val: string) => void;
}
export default function Order({ Orders, handleTab }: Props) {
  const [Isopen, setIsopen] = useState(false);
    const [IsReviewopen, setIsReviewopen] = useState(false);
  const [updatedReview,setUpdatedReview] = useState<any>()
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  console.log(Orders);
  const { data } = useGetOrdersDetails(token, selectedOrder ?? 0);
  const handleBackToOrders = () => {
    setSelectedOrder(null);
    handleTab("orderHistory");
    setIsopen(false);
  };
  const handleOrderSelect = (orderId: number) => {
    setSelectedOrder(orderId);
    setIsopen(true);
  };

  // const orders = [
  //   {
  //     id: "ORD-7829",
  //     date: "June 12, 2025",
  //     status: "Delivered",
  //     total: "$78.95",
  //     items: [
  //       {
  //         id: "PRD-001",
  //         name: "Natural Moisturizing Cream",
  //         price: "$24.99",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=A%20luxurious%20natural%20moisturizing%20cream%20in%20an%20elegant%20glass%20jar%20with%20wooden%20cap%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20product%20photography&width=80&height=80&seq=1&orientation=squarish",
  //       },
  //       {
  //         id: "PRD-002",
  //         name: "Organic Hair Serum",
  //         price: "$32.50",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=A%20premium%20organic%20hair%20serum%20in%20a%20sleek%20glass%20dropper%20bottle%20with%20natural%20ingredients%20visible%20inside%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20haircare%20product%20photography&width=80&height=80&seq=2&orientation=squarish",
  //       },
  //       {
  //         id: "PRD-003",
  //         name: "Vitamin C Face Mask",
  //         price: "$21.46",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=A%20refreshing%20vitamin%20C%20face%20mask%20in%20a%20premium%20jar%20with%20citrus%20elements%20nearby%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20product%20photography&width=80&height=80&seq=3&orientation=squarish",
  //       },
  //     ],
  //   },
  //   {
  //     id: "ORD-6543",
  //     date: "May 28, 2025",
  //     status: "Delivered",
  //     total: "$56.20",
  //     items: [
  //       {
  //         id: "PRD-004",
  //         name: "Natural Lip Balm Set",
  //         price: "$18.99",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=A%20set%20of%20natural%20lip%20balms%20in%20various%20flavors%20arranged%20in%20a%20beautiful%20pattern%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20cosmetic%20product%20photography&width=80&height=80&seq=4&orientation=squarish",
  //       },
  //       {
  //         id: "PRD-005",
  //         name: "Eco-friendly Shampoo",
  //         price: "$37.21",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=An%20eco-friendly%20shampoo%20in%20a%20sustainable%20bamboo%20container%20with%20natural%20ingredients%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20haircare%20product%20photography&width=80&height=80&seq=5&orientation=squarish",
  //       },
  //     ],
  //   },
  //   {
  //     id: "ORD-5421",
  //     date: "April 15, 2025",
  //     status: "Delivered",
  //     total: "$112.75",
  //     items: [
  //       {
  //         id: "PRD-006",
  //         name: "Complete Skincare Set",
  //         price: "$112.75",
  //         quantity: 1,
  //         image:
  //           "https://readdy.ai/api/search-image?query=A%20complete%20premium%20skincare%20set%20with%20multiple%20products%20arranged%20beautifully%2C%20including%20serums%2C%20creams%2C%20and%20cleansers%20in%20matching%20packaging%2C%20placed%20on%20a%20minimalist%20white%20surface%20with%20soft%20shadows%2C%20photographed%20with%20professional%20lighting%20against%20a%20clean%20light%20background%20with%20subtle%20gradient%2C%20premium%20skincare%20collection%20photography&width=80&height=80&seq=6&orientation=squarish",
  //       },
  //     ],
  //   },
  // ];
  const renderSelectedOrder = () => {
    const order = Orders.find((o) => o.order_id === selectedOrder);
    console.log("order: ", order);
    if (!order) return null;
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToOrders}
            className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <ChevronLeft />
            Back to Orders
          </button>
          <button className="text-green-700 hover:text-green-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
            <i className="fas fa-download mr-2"></i>
            Download Invoice
          </button>
        </div>

        <div className="border-b flex justify-between items-center pb-4 mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Order #{order.order_id}
            </h3>
            <p className="text-gray-600">
              Placed on {dayjs(order.order_date).format("MMMM DD YYYY")}
            </p>
          </div>
          <Badge
            className={`px-3 py-1 w-fit rounded-full text-sm ${
              order.delivery_status === "order confirmed"
                ? "bg-green-100 text-green-800"
                : order.delivery_status === "Processing"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {order.delivery_status}
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6 mb-6">
          <div className="">
            <div>
              <h4 className="font-semibold text-title mb-2">
                Shipping Address
              </h4>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">
                  {order.shipmet_first_name} {order.shipment_last_name}
                </p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state} {order.pincode}
                </p>
                <p className="mt-2 text-gray-600">{order.shipment_phone_no}</p>
              </div>
            </div>
          </div>
          <div className={`${order.billing_first_name ? "block" : "hidden"}`}>
            <div>
              <h4 className="font-semibold text-title mb-2">Billing Address</h4>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-medium">
                  {order.billing_first_name} {order.billing_last_name}
                </p>
                <p>{order.billing_address}</p>
                <p>
                  {order.billing_city}, {order.billing_state}{" "}
                  {order.billing_pincode}
                </p>
                <p className="mt-2 text-gray-600">{order.billing_phone_no}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-title mb-2">Order Timeline</h4>
            <div className="bg-gray-50 p-4 rounded space-y-3">
              {data?.shipment?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center
              ${
                (item?.status ?? "")?.includes("X") ||
                (item?.status ?? "")?.includes("DTUP")
                  ? "bg-red-100 text-red-700"
                  : (item?.status ?? "")?.includes("ST")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
                  >
                    {(item?.status ?? "") ||
                    (item?.status ?? "")?.includes("DTUP") ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (item?.status ?? "")?.includes("ST") ? (
                      <Truck className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium">{item?.activity}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(item?.activity_time).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{item?.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="bg-gray-50 p-4 rounded flex items-center">
              <p>{data?.payment?.[0]?.provider || "N/A"}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Tracking Information</h4>
            <div className="bg-gray-50 flex items-center justify-between p-4 rounded">
              <p className="font-medium flex items-center gap-x-2">
                AWB Number{" "}
                <span className="text-lead text-sm">
                  {" "}
                  {data?.payment[0].awb_code}
                </span>
              </p>
              {data?.payment[0]?.track_url && (
                <a
                  href={data?.payment[0]?.track_url}
                  className="text-green-700 hover:text-green-800   inline-block"
                >
                  Track Package
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="font-medium mb-3">Items</h4>
          {data?.product?.map((item: any) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  src={item.product_thumbnail_image}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h5 className="font-medium">{item.product_name}</h5>
                <div className="flex justify-between mt-2">
                  <div className="text-gray-600">
                    <p>
                      Qty:{" "}
                      <span className="font-semibold text-textPrimary">
                        {item.quantity}
                      </span>
                    </p>
                    <p>
                      {" "}
                      Price{" "}
                      <span className="font-semibold text-textPrimary">
                        Rs. {item.order_amount}
                      </span>{" "}
                    </p>
                  </div>
                  {!item.has_reviewed  && order?.order_status === 'Delivered' && (
                    <Dialog open={IsReviewopen} onOpenChange={setIsReviewopen}>
                      <DialogTrigger  className="cursor-pointer">
                        <button
                          // onClick={() => handleOpenReview(item)}
                          className="text-green-700 hover:text-green-900 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          Write a Review
                        </button>{" "}
                      </DialogTrigger>
                      <DialogContent className="!max-w-xl [&>button]:hidden  !p-0">
                        <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                          <DialogTitle>Write a Review</DialogTitle>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsopen(false);
                            }}
                          >
                            <X />
                          </div>
                        </DialogHeader>
                        <WriteReview onClose={setIsReviewopen} product_id={item.product_id} orderCode={order?.order_code}/>
                      </DialogContent>
                    </Dialog>
                  )}
                   {item.has_reviewed && (
                    <Dialog open={IsReviewopen} onOpenChange={setIsReviewopen}>
                      <DialogTrigger onClick={()=>setIsReviewopen(true)} className="cursor-pointer">
                        <button
                          onClick={() => setUpdatedReview(item)}
                          className="text-green-700 hover:text-green-900 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                        >
                         Update Review
                        </button>{" "}
                      </DialogTrigger>
                      <DialogContent className="!max-w-xl [&>button]:hidden  !p-0">
                        <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                          <DialogTitle>Update a Review</DialogTitle>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsopen(false);
                            }}
                          >
                            <X />
                          </div>
                        </DialogHeader>
                        <UpdateReview onClose={setIsReviewopen} orderCode={order?.order_code} product={updatedReview}/>
                      </DialogContent>
                    </Dialog>
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
              <span className="text-title font-semibold">
                ₹ {order.sub_total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-title font-semibold">
                ₹ {order.shipping_fee}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-title font-semibold">₹ {order.tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-title font-semibold">
                {order.discount_amount ? `₹ ${order.discount_amount}` : "₹ 0"}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t font-medium">
              <span>Total</span>
              <span className="text-textPrimary font-bold">
                ₹ {order.order_amount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderOrderHistory = () => {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">My Orders</h3>
          <p className="text-gray-600 mt-1">
            View and manage your order history
          </p>
        </div>
        <div className="divide-y">
          {Orders?.map((order) => (
            <div key={order.order_id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-semibold">Order #{order?.order_code}</h4>
                  <p className="text-gray-600 text-sm">
                    {dayjs(order?.order_date).format("MMMM DD YYYY")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.order_status === "order confirmed"
                      ? "bg-green-100 text-green-800"
                      : order.order_status === "Processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.order_status}
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {order.product.slice(0, 3).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={item.product_thumbnail_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.product.length > 3 && (
                    <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-sm font-medium">
                      +{order.product.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{order?.amount}</p>
                  <p className="text-gray-600 text-sm">
                    {order?.product.length}{" "}
                    {order?.product.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleOrderSelect(order.order_id);
                    setIsopen(true);
                  }}
                  className="text-green-700  gap-x-2 hover:text-green-900 flex items-center cursor-pointer !rounded-button whitespace-nowrap"
                >
                  View Details
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {selectedOrder && Isopen ? renderSelectedOrder() : renderOrderHistory()}
    </>
  );
}
