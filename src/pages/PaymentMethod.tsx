import { ASSETS } from "@/assets/assets";
import FullScreenLoader from "@/common/FullScreenLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion2";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import {
  useCreateOrder,
  useVerifyPhonepay,
  useVerifyrazorpay,
} from "@/services/cart";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { removeCartItems, removeTaxDetails } from "@/redux/slices/cartSlice";
import { removeCoupon } from "@/redux/slices/couponSlice";

export default function PaymentMethod() {
  // const { state } = useLocation();
  // const { product } = state || {};
  const Razorpay = useRazorpay();
  const RazorpayConstructor = Razorpay.Razorpay;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress, items } = useSelector(
    (state: RootState) => state.cart
  );
  const CouponDetails = useSelector((state: RootState) => state.coupon);
  const { mutate, isPending } = useCreateOrder();
  const { mutate: verifyRazorpay } = useVerifyrazorpay();
  const [shouldPoll, setShouldPoll] = useState(false);
  const [finalData, setFinalData] = useState(null);
  console.log("finalData: ", finalData);
  const [merchantTransactionId, SetmerchantTransactionId] = useState(() =>
    localStorage.getItem("merchantTransactionId")
  );
  const { refetch } = useVerifyPhonepay(
    merchantTransactionId ?? "",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg"
  );

  const { setValue, watch } = useForm({
    defaultValues: {
      payment: "",
    },
  });
  const selectedRole = watch("payment");

  const subtotal = items?.reduce(
    (acc: number, item: any) => acc + item.unit_price * item.quantity,
    0
  );

  const tax = 0;

  // Default shipping
  const shipping = 50;

  let discount = 0;

  if (
    CouponDetails?.coupon_type === "invoice_based" &&
    CouponDetails?.discount_type === "percent"
  ) {
    if (subtotal >= CouponDetails.mini_shipping) {
      const rawDiscount = (subtotal * CouponDetails.discount) / 100;

      discount =
        rawDiscount > CouponDetails.max_discount
          ? CouponDetails.max_discount
          : rawDiscount;
    } else {
      toast.warning(
        `Apply this coupon on orders above ₹${CouponDetails.mini_shipping}`
      );
    }
  } else {
    discount = CouponDetails.discount;
  }

  // Final total
  const total = Math.round(subtotal + tax + shipping - discount);
  const handleCreateOrder = () => {
    if (!items || !shippingAddress) return;

    const orderPayload = {
      product_data: items.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        order_amount: item.total_amount,
      })),
      address: shippingAddress.address,
      discount_amount: discount,
      coupon_discount: null,
      tax: tax,
      sub_total: subtotal,
      order_amount: total,
      shipping_fee: shipping,
      cash_on_delivery: false,
      payment_provider: selectedRole,
      pincode: Number(shippingAddress.pinCode),
      shipmet_first_name: shippingAddress.firstName,
      shipment_last_name: shippingAddress.lastName,
      shipment_email: shippingAddress.email,
      shipment_phone_no: Number(shippingAddress.phoneNumber),
      city: shippingAddress.city,
      state: shippingAddress.state,
    };

    mutate(
      {
        OrderPayload: orderPayload,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
      },
      {
        onSuccess(data) {
          toast.success("order created");
          setShouldPoll(true);
          if (data.orderId) {
            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            const options = {
              key: razorpayKey,
              order_id: data.orderId,
              amount: total,
              currency: "INR",
              name: "Naturella",
              description: "Payment",
              image: ASSETS.LOGO,
              handler: function (response: any) {
                verifyRazorpay({
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  razorpay_order_id: data.orderId,
                });
                navigate("/order-success");
                dispatch(removeCartItems());
                dispatch(removeTaxDetails());
                dispatch(removeCoupon());
              },

              theme: {
                color: "orange",
              },
              modal: {
                ondismiss: function () {
                  toast.error("Payment cancelled by user.");
                  navigate("/order-failure");
                },
              },
            };

            const rzp = new RazorpayConstructor(
              options as RazorpayOrderOptions
            );
            rzp.open();
          } else {
            SetmerchantTransactionId(data.merchantTransactionId);
            localStorage.setItem(
              "merchantTransactionId",
              data.merchantTransactionId
            );
            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
              // window.open(data.redirectUrl);
            } else {
              toast.error("Missing redirect URL.");
            }
          }
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (!merchantTransactionId && !shouldPoll) return;

    const interval = setInterval(async () => {
      const { data, isLoading, isFetching } = await refetch();
      if (isFetching || isLoading) return <FullScreenLoader />;
      if (data.resp.state === "COMPLETED") {
        localStorage.removeItem("merchantTransactionId");
        setFinalData(data);
        setShouldPoll(false);
        clearInterval(interval);
        navigate("/order-success");
        dispatch(removeCartItems());
        dispatch(removeTaxDetails());
        dispatch(removeCoupon());
      } else if (data.resp.state === "FAILED") {
        localStorage.removeItem("merchantTransactionId");
        navigate("/order-failure");
        clearInterval(interval);
        setShouldPoll(false);
      } else {
        return <FullScreenLoader />;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [merchantTransactionId, shouldPoll]);
  return (
    <main className="container mx-auto py-6 h-screen">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Accordion
          className="md:col-span-2"
          type="single"
          defaultValue="pay"
          collapsible
        >
          <AccordionItem value="pay" className="border-none">
            <AccordionTrigger>
              <h1 className="md:text-2xl font-semibold">Payment Method</h1>
            </AccordionTrigger>

            <AccordionContent>
              <RadioGroup
                value={selectedRole}
                onValueChange={(val) => {
                  localStorage.removeItem("merchantTransactionId");
                  setValue("payment", val);
                }}
                className="w-[380px] mt-4"
              >
                {[
                  {
                    label: "Pay with RazorPay",
                    value: "razorpay",
                    Img: ASSETS.RAZORPAY,
                  },
                  {
                    label: "Pay with PhonePe",
                    value: "phonepe",
                    Img: ASSETS.PHONEPAY2,
                  },
                  //   { label: "Google Pay", value: "gpay" },
                  //   { label: "UPI", value: "upi" },
                ].map(({ label, value, Img }) => (
                  <Label
                    htmlFor={value}
                    key={value}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg border-2 p-2 px-6 cursor-pointer transition-colors",
                      selectedRole === value
                        ? "border-primary "
                        : "border-border"
                    )}
                  >
                    <RadioGroupItem
                      id={value}
                      className="size-5"
                      value={value}
                    />
                    <div className="flex items-center gap-x-10 font-medium text-sm text-title">
                      {" "}
                      <img
                        src={Img}
                        alt="payment-option"
                        className="w-28"
                      />{" "}
                      {label}{" "}
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="">
          <h1 className="md:text-2xl font-semibold mb-4">Price Details </h1>
          {/* <p className="text-muted-foreground">
            {selectedRole ? selectedRole : "No method selected"}
          </p> */}
          <div className="space-y-6 text-sm font-medium text-title">
            <div className="flex justify-between">
              <span className="text-lead">Subtotal</span>
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lead">Tax</span>
              <span className="font-semibold">{tax}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lead">Discount</span>
              <span className="">-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lead">Shipping</span>
              <span className="font-semibold">₹{shipping}</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-semibold text-base">
              <span className="font-semibold text-[#0B130B] text-[22px] ">
                Total
              </span>
              <span className="text-[#0B130B] text-[22px] font-bold">
                ₹{total}
              </span>
            </div>
            <Button
              type="button"
              disabled={!selectedRole || isPending}
              onClick={handleCreateOrder}
              className={`w-full md:h-12  font-semibold transition-all duration-300
    ${
      !selectedRole || isPending
        ? "bg-primary/60 text-white cursor-not-allowed"
        : "bg-primary text-white hover:bg-primary/90"
    }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
