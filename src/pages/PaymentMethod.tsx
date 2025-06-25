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
  useGetProviders,
  useVerifyPhonepay,
  useVerifyrazorpay,
} from "@/services/cart";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRazorpay } from "react-razorpay";
import { removeCartItems } from "@/redux/slices/cartSlice";
import { removeCoupon } from "@/redux/slices/couponSlice";
import { removeWishlist } from "@/redux/slices/wishSlice";

export default function PaymentMethod() {
  const { state } = useLocation();
  const { coupon_id } = state || {};
  const [loading, setLoading] = useState(false);

  const { Razorpay: RazorpayConstructor } = useRazorpay();
  // const payment =
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress, items, tax_detail } = useSelector(
    (state: RootState) => state.cart
  );
  const CouponDetails = useSelector((state: RootState) => state.coupon);
  const { mutate, isPending } = useCreateOrder();
  const { mutate: verifyRazorpay, isPending: verifyRazorpayPending } =
    useVerifyrazorpay();
  const [shouldPoll, setShouldPoll] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const localPaymentmethod = localStorage.getItem("payment");
  const {
    data: PaymentProviders,
    isLoading,
    isFetching,
  } = useGetProviders(token);

  // const [finalData, setFinalData] = useState(null);

  const [merchantTransactionId, SetmerchantTransactionId] = useState(() =>
    localStorage.getItem("merchantTransactionId")
  );
  const { refetch } = useVerifyPhonepay(merchantTransactionId ?? "", token);

  const { setValue, watch } = useForm({
    defaultValues: {
      payment: "",
    },
  });
  const selectedRole = watch("payment");

  const subtotal = items?.reduce(
    (acc: number, item: any) => acc + item?.unit_price * item.quantity,
    0
  );

  const tax = items?.reduce((acc, item) => {
    const productTax =
      (item.unit_price * item.quantity * item.tax_percent) / 100;
    return acc + Math.round(productTax);
  }, 0);

  let shipping = 0;

  if (tax_detail && typeof tax_detail.min_amount === "number") {
    if (subtotal >= tax_detail.min_amount) {
      shipping = 0;
    } else if (typeof tax_detail.shipping_fee === "number") {
      shipping = tax_detail.shipping_fee;
    }
  }

  const CouponDiscount = items?.reduce((acc, item) => {
    return acc + Math.round(Number(item.coupon_amount) || 0);
  }, 0);

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
  const total = Math.round(subtotal + shipping - discount - CouponDiscount);
  const handleCreateOrder = () => {
    if (!items || !shippingAddress) return;

    const orderPayload = {
      product_data: items.map((item: any) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        product_sub_total: item.product_sub_total,
        discount_amount: item.discount_amount,
        prodcut_tax: item.prodcut_tax,
        order_amount: item.total_amount,
        coupon_id: item.coupon_amount > 0 ? item.coupon_id : null,
        coupon_amount: item.coupon_amount,
      })),
      address: shippingAddress.address,
      discount_amount: discount,
      coupon_discount: CouponDiscount,
      coupon_id: coupon_id ?? null,
      tax: tax,
      sub_total: subtotal - tax,
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
      billing_first_name: shippingAddress.billing_first_name,
      billing_last_name: shippingAddress.billing_last_name,
      billing_email: shippingAddress.billing_email,
      billing_phone_no: Number(shippingAddress.billing_phone_no),
      billing_city: shippingAddress.billing_city,
      billing_state: shippingAddress.billing_state,
      billing_pincode: shippingAddress.billing_pincode,
      billing_address: shippingAddress.billing_address,
    };

    mutate(
      {
        OrderPayload: orderPayload,
        token: token,
      },
      {
        onSuccess(data) {
          setShouldPoll(true);
          if (localPaymentmethod === "razorpay") {
            localStorage.removeItem("merchantTransactionId");
            setShouldPoll(false);
            toast.success("order created");

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
            const options = {
              key: razorpayKey,
              order_id: data.orderId,
              amount: total,
              currency: "INR" as const,
              name: "Naturella",
              description: "Payment",
              image: ASSETS.LOGO,
              handler: function (response: any) {
                console.log("razorpay handler work");

                verifyRazorpay(
                  {
                    token: token,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_order_id: data.orderId,
                  },
                  {
                    onSuccess: () => {
                      navigate("/order-success");
                      dispatch(removeCartItems());
                      dispatch(removeWishlist());
                      dispatch(removeCoupon());
                      localStorage.removeItem("merchantTransactionId");
                      setShouldPoll(false);
                      // dispatch(removeTaxDetails());
                    },
                    onError(error) {
                      if (axios.isAxiosError(error)) {
                        toast.error(error?.response?.data?.message);
                      }
                    },
                  }
                );
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

            const rzp = new RazorpayConstructor(options);
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

    setLoading(true);

    const interval = setInterval(async () => {
      try {
        const { data } = await refetch();

        if (data.resp.state === "COMPLETED") {
          setLoading(false);
          navigate("/order-success");
          localStorage.removeItem("merchantTransactionId");
          // setFinalData(data);
          setShouldPoll(false);
          clearInterval(interval);
          dispatch(removeCartItems());
          dispatch(removeWishlist());
          dispatch(removeCoupon());
        } else if (data.resp.state === "FAILED") {
          setLoading(false);
          localStorage.removeItem("merchantTransactionId");
          navigate("/order-failure");
          clearInterval(interval);
          setShouldPoll(false);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [merchantTransactionId, shouldPoll]);

  if (loading || isLoading || isFetching || verifyRazorpayPending) {
    return <FullScreenLoader />;
  }

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
              <h1 className="text-lg md:text-2xl font-semibold">
                Payment Method
              </h1>
            </AccordionTrigger>

            <AccordionContent>
              <RadioGroup
                value={selectedRole}
                onValueChange={(val) => {
                  localStorage.removeItem("merchantTransactionId");
                  localStorage.setItem("payment", val);
                  setValue("payment", val);
                }}
                className="mt-4 grid grid-cols-1  gap-4 xl:w-6/12"
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
                ].map(({ label, value, Img }) => {
                  const provider = PaymentProviders?.find(
                    (p: any) => p.provider_name === value
                  );
                  const isEnabled = provider?.enabled;

                  return (
                    <Label
                      htmlFor={value}
                      key={value}
                      className={cn(
                        "flex items-center gap-4 rounded-lg border-2 p-4  cursor-pointer transition-colors",
                        selectedRole === value
                          ? "border-primary"
                          : "border-border",
                        !isEnabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <RadioGroupItem
                        id={value}
                        value={value}
                        disabled={!isEnabled}
                        className="size-5"
                      />
                      <div className="flex items-center gap-4">
                        <img
                          src={Img}
                          alt={label}
                          className="w-24 h-auto object-contain"
                        />
                        <span className="text-sm truncate font-medium text-title">
                          {label}
                        </span>
                      </div>
                    </Label>
                  );
                })}
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
              <span className="font-semibold">₹{subtotal - tax}</span>
            </div>
            <div className="flex justify-between items-start text-sm text-muted-foreground">
              <p className="flex flex-col leading-tight">
                <span className="text-foreground font-medium">Tax</span>
                <span className="text-xs">Inclusive of 18% tax</span>
              </p>
              <span className="text-foreground font-semibold text-base">
                ₹{tax}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span className="text-lead">Discount</span>
                <span className="">-₹{discount}</span>
              </div>
            )}

            {CouponDiscount > 0 && (
              <div className="flex justify-between">
                <span className="text-lead">Discount</span>
                <span className="">-₹{CouponDiscount}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="flex flex-col">
                Shipping
                {shipping === 0 ? (
                  <span className=" text-green-600  text-xs mt-1 font-semibold animate-pulse">
                    (Free Delivery 🎉)
                  </span>
                ) : (
                  <span className=" text-red-500 text-xs font-medium italic animate-shake">
                    (Spend ₹{tax_detail.min_amount - subtotal} more for free
                    shipping)
                  </span>
                )}
              </span>
              {/* <span
                className={`font-semibold ${
                  shipping === 0 ? "text-green-600" : "text-primary"
                }`}
              >
                ₹{shipping === 0 ? "0" : shipping}
              </span> */}
              <span
                className={`font-semibold  ${
                  shipping === 0 ? "text-green-600 " : "text-primary"
                } gap-x-1.5 flex items-center`}
              >
                {shipping === 0 && (
                  <span className="text-xs  line-through text-lead">
                    {tax_detail?.shipping_fee}
                  </span>
                )}
                ₹{shipping === 0 ? shipping : shipping}
              </span>
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
