import { useState } from "react";
import type { Order, ProductReview } from "@/types/type";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WriteReview from "./WrtiteReview";
import UpdateReview from "./UpdateReview";
import { Button } from "@/components/ui/button";
interface Props {
  Orders: Order[];
  handleTab: (val: string) => void;
}
export default function Order({ Orders, handleTab }: Props) {
  const [Isopen, setIsopen] = useState(false);
  const [IsReviewopen, setIsReviewopen] = useState(false);
  const [updatedReview, setUpdatedReview] = useState<any>();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [OpenReviewProduct, setReviewProduct] = useState<ProductReview>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data } = useGetOrdersDetails(token, selectedOrder ?? 0);
  const handleBackToOrders = () => {
    setSelectedOrder(null);
    setIsReviewopen(false);
    setUpdatedReview(null);
    setIsopen(false);
    handleTab("orderHistory");
  };

  const handleOrderSelect = (orderId: number) => {
    setSelectedOrder(orderId);
    setIsopen(true);
  };

  const renderSelectedOrder = () => {
    const order = Orders.find((o) => o.order_id === selectedOrder);
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
          {data?.payment[0]?.invoice_url && (
            <Button
              // disabled={!data?.payment[0]?.invoice_url}
              onClick={() => {
                window.open(data?.payment[0]?.invoice_url, "_blank");
              }}
              className={`  ${
                !data?.payment[0]?.invoice_url
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }  text-green-700 bg-transparent hover:text-green-800 flex items-center  !rounded-button `}
            >
              Download Invoice
            </Button>
          )}
        </div>
        <div className="border-b pb-4 mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Order #{order.order_id}
            </h3>
            <p className="text-gray-600 text-sm">
              Placed on {dayjs(order.order_date).format("MMMM DD YYYY")}
            </p>
          </div>

          <span
            className={`w-fit px-3 py-1 rounded-full text-xs sm:text-sm ${
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
          {data?.shipment[0]?.activity && (
            <div className="mt-6">
              <h4 className="font-semibold text-title mb-2 text-base sm:text-lg">
                Order Timeline
              </h4>
              <div className="bg-gray-50 p-4 rounded space-y-4 sm:space-y-3">
                {data?.shipment?.map((item: any, index: number) => {
                  const status = item?.status ?? "";
                  const isError =
                    status.includes("X") || status.includes("DTUP");
                  const isShipped = status.includes("ST");

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      {/* Icon Circle */}
                      <div
                        className={`min-w-[2.25rem] h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm
              ${
                isError
                  ? "bg-red-100 text-red-700"
                  : isShipped
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
                      >
                        {isError ? (
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : isShipped ? (
                          <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>

                      <div className="text-sm sm:text-base">
                        <p className="font-medium">{item?.activity}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {new Date(item?.activity_time).toLocaleString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {item?.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Payment Method</h4>
            <div className="bg-gray-50 p-4 rounded flex items-center">
              <p>{data?.payment?.[0]?.provider || "N/A"}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Tracking Information</h4>
            <div className="bg-gray-50 p-4 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="font-medium flex flex-wrap items-center gap-x-2">
                AWB Number{" "}
                <span className="text-lead text-sm">
                  {data?.payment[0]?.awb_code || "N/A"}
                </span>
              </p>
              {data?.payment[0]?.track_url && (
                <button
                  onClick={() => {
                    window.open(data?.payment[0]?.track_url, "_blank");
                  }}
                  className="text-green-700 hover:text-green-800 text-sm"
                >
                  Track Package
                </button>
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
                <h5 className="font-medium">{item?.product_name}</h5>
                <div className="flex justify-between mt-2">
                  <div className="text-gray-600">
                    <p>
                      Qty:{" "}
                      <span className="font-semibold text-textPrimary">
                        {item?.quantity}
                      </span>
                    </p>
                    <p>
                      {" "}
                      Price{" "}
                      <span className="font-semibold text-textPrimary">
                        Rs. {item?.unit_price}
                      </span>{" "}
                    </p>
                  </div>
                  {!item.has_reviewed &&
                    order?.order_status === "Delivered" && (
                      <Dialog
                        open={IsReviewopen}
                        onOpenChange={setIsReviewopen}
                      >
                        <DialogTrigger className="cursor-pointer">
                          <button
                            onClick={() => setReviewProduct(item)}
                            className="text-green-700 hover:text-green-900 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            Write a Review
                          </button>{" "}
                        </DialogTrigger>
                        <DialogContent className=" h-[500px] lg:h-[700px] overflow-y-auto lg:!max-w-2xl [&>button]:hidden   !p-0">
                          <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                            <DialogTitle>Write a Review</DialogTitle>
                            <DialogClose>
                              <div className="cursor-pointer">
                                <X />
                              </div>
                            </DialogClose>
                          </DialogHeader>
                          <WriteReview
                            Product={item && OpenReviewProduct}
                            onClose={setIsReviewopen}
                            product_id={item.product_id}
                            orderCode={order?.order_code}
                          />
                        </DialogContent>
                      </Dialog>
                    )}
                  {item.has_reviewed && (
                    <Dialog open={IsReviewopen} onOpenChange={setIsReviewopen}>
                      <DialogTrigger
                        onClick={() => setIsReviewopen(true)}
                        className="cursor-pointer"
                      >
                        <button
                          onClick={() => setUpdatedReview(item)}
                          className="text-green-700 hover:text-green-900 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                        >
                          Update Review
                        </button>{" "}
                      </DialogTrigger>
                      <DialogContent className=" h-[500px] lg:h-auto overflow-y-auto lg:!max-w-2xl [&>button]:hidden   !p-0">
                        <DialogHeader className="bg-[#F5F5F5] p-4 rounded-lg w-full flex flex-row  justify-between">
                          <DialogTitle>Update a Review</DialogTitle>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setIsReviewopen(false);
                            }}
                          >
                            <X />
                          </div>
                        </DialogHeader>
                        <UpdateReview
                          onClose={setIsReviewopen}
                          orderCode={order?.order_code}
                          product={updatedReview}
                        />
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
              <p className="flex flex-col leading-tight">
                <span>Total MRP</span>

                <span className="text-xs">Inclusive of all tax</span>
              </p>
              <span className="font-semibold">₹{order?.total_mrp}.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bag Discount</span>
              <span className="text-title font-semibold">
                - ₹{order?.bag_discount}.00
              </span>
            </div>
            {order?.coupon_discount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Coupon </span>
                <span className="text-title font-semibold">
                 - ₹{order?.coupon_discount}.00
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-title font-semibold">
                ₹{order?.shipping_fee}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t font-medium">
              <span>Total</span>
              <span className="text-textPrimary font-bold">
                ₹{order?.order_amount}
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
        <div className="p-4 sm:p-6 border-b">
          <h3 className="text-lg sm:text-xl font-semibold">My Orders</h3>
          <p className="text-gray-600 mt-1 text-sm">
            View and manage your order history
          </p>
        </div>

        <div className="divide-y">
          {Orders?.map((order) => (
            <div key={order.order_id} className="p-4 sm:p-6 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Order #{order?.order_code}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {dayjs(order?.order_date).format("MMMM DD YYYY")}
                  </p>
                </div>
                <span
                  className={`w-fit px-3 py-1 rounded-full text-xs sm:text-sm ${
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

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex -space-x-2">
                  {order.product.slice(0, 3).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={item.product_thumbnail_image}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {order.product.length > 3 && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-medium">
                      +{order.product.length - 3}
                    </div>
                  )}
                </div>

                <div className="flex-grow text-sm">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {order?.product.length}{" "}
                    {order?.product.length === 1 ? "item" : "items"}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleOrderSelect(order.order_id);
                    setIsopen(true);
                  }}
                  className="text-green-700 text-sm sm:text-base gap-x-1 hover:text-green-900 flex items-center cursor-pointer !rounded-button whitespace-nowrap"
                >
                  View Details{" "}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
