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
  useGetProviders,
} from "@/services/cart";
import { useForm } from "react-hook-form";
import {  useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function PaymentMethod() {
  // const { state } = useLocation();
  // const { coupon_id } = state || {};
  // const [loading, setLoading] = useState(false);
  // const { Razorpay: RazorpayConstructor } = useRazorpay();
  // const payment =
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { shippingAddress, items, price_summary } = useSelector(
    (state: RootState) => state.cart
  );

  // const [cartItems, setCartItems] = useState<Product[]>(items);
  // useEffect(() => {
  //   setCartItems(items);
  // }, [items]);

  // const { mutate, isPending } = useCreateOrder();
  // const { mutate: verifyRazorpay, isPending: verifyRazorpayPending } =
  //   useVerifyrazorpay();
  // const [shouldPoll, setShouldPoll] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  // const localPaymentmethod = localStorage.getItem("payment");
  const {
    data: PaymentProviders,
    isLoading,
    isFetching,
  } = useGetProviders(token);

  // const [finalData, setFinalData] = useState(null);

  // const [merchantTransactionId, SetmerchantTransactionId] = useState(() =>
  //   localStorage.getItem("merchantTransactionId")
  // );
  
  // const { refetch, isError } = useVerifyPhonepay(
  //   merchantTransactionId ?? "",
  //   token
  // );
  // if (isError) {
  //   setLoading(false);
  //   localStorage.removeItem("merchantTransactionId");
  //   navigate("/order-failure");
  //   setShouldPoll(false);
  // }
  const { setValue, watch } = useForm({
    defaultValues: {
      payment: "",
    },
  });

  const selectedRole = watch("payment");

  const handleCreateOrder = () => {
    if (!items || !shippingAddress) return;
    if (!shippingAddress) {
      toast.warning("You must add your address to complete the payment.");
    }

       navigate("/order-success", { replace: true });
    // const orderPayload = {
    //   product_data: products_data,
    //   address: shippingAddress.address,
    //   total_mrp: price_summary.total_mrp,
    //   bag_discount: price_summary.bag_discount,
    //   discount_amount: price_summary.discount,
    //   coupon_discount: price_summary.discount,
    //   coupon_id: coupon_id ?? null,
    //   tax: price_summary.tax,
    //   sub_total: price_summary.sub_total,
    //   order_amount: price_summary.grand_total,
    //   shipping_fee: price_summary.shipping_fee,
    //   cash_on_delivery: false,
    //   payment_provider: selectedRole,
    //   pincode: Number(shippingAddress.pinCode),
    //   shipmet_first_name: shippingAddress.firstName,
    //   shipment_last_name: shippingAddress.lastName,
    //   shipment_email: shippingAddress.email,
    //   shipment_phone_no: Number(shippingAddress.phoneNumber),
    //   city: shippingAddress.city,
    //   state: shippingAddress.state,
    //   same_billing_address: shippingAddress.same_billing_address,
    //   billing_first_name: shippingAddress.billing_first_name,
    //   billing_last_name: shippingAddress.billing_last_name,
    //   billing_email: shippingAddress.billing_email,
    //   billing_phone_no: Number(shippingAddress.billing_phone_no),
    //   billing_city: shippingAddress.billing_city,
    //   billing_state: shippingAddress.billing_state,
    //   billing_pincode: shippingAddress.billing_pincode,
    //   billing_address: shippingAddress.billing_address,
    // };

    // mutate(
    //   {
    //     OrderPayload: orderPayload,
    //     token: token,
    //   },
    //   {
    //     onSuccess(data) {
    //       setShouldPoll(true);
    //       if (localPaymentmethod?.toLowerCase() === "razorpay") {
    //         localStorage.removeItem("merchantTransactionId");
    //         setShouldPoll(false);
    //         toast.success("order created");

    //         const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    //         const options = {
    //           key: razorpayKey,
    //           order_id: data.orderId,
    //           amount: price_summary.grand_total ?? 0,
    //           currency: "INR" as const,
    //           name: "Naturella",
    //           description: "Payment",
    //           image: ASSETS.LOGO,
    //           handler: function (response: any) {
    //             verifyRazorpay(
    //               {
    //                 token: token,
    //                 razorpay_payment_id: response.razorpay_payment_id,
    //                 razorpay_signature: response.razorpay_signature,
    //                 razorpay_order_id: data.orderId,
    //               },
    //               {
    //                 onSuccess: () => {
    //                   navigate("/order-success");
    //                   dispatch(removeCartItems());
    //                   dispatch(removeWishlist());
    //                   dispatch(removeCoupon());
    //                   localStorage.removeItem("merchantTransactionId");
    //                   setShouldPoll(false);
    //                   // dispatch(removeTaxDetails());
    //                 },
    //                 onError(error) {
    //                   if (axios.isAxiosError(error)) {
    //                     toast.error(error?.response?.data?.message);
    //                   }
    //                 },
    //               }
    //             );
    //           },

    //           theme: {
    //             color: "orange",
    //           },
    //           modal: {
    //             ondismiss: function () {
    //               toast.error("Payment cancelled by user.");
    //               navigate("/order-failure");
    //             },
    //           },
    //         };

    //         const rzp = new RazorpayConstructor(options);
    //         rzp.open();
    //       } else {
    //         SetmerchantTransactionId(data.merchantTransactionId);
    //         localStorage.setItem(
    //           "merchantTransactionId",
    //           data.merchantTransactionId
    //         );
    //         if (data.redirectUrl) {
    //           window.location.href = data.redirectUrl;
    //           // window.open(data.redirectUrl);
    //         } else {
    //           toast.error("Missing redirect URL.");
    //         }
    //       }
    //     },
    //     onError: (error) => {
    //       if (axios.isAxiosError(error)) {
    //         toast.error(error?.response?.data?.message);
    //       }
    //     },
    //   }
    // );
  };

  // useEffect(() => {
  //   if (!merchantTransactionId && !shouldPoll) return;

  //   setLoading(true);

  //   const interval = setInterval(async () => {
  //     try {
  //       const { data, isError } = await refetch();

  //       if (isError) {
  //         setLoading(false);
  //         localStorage.removeItem("merchantTransactionId");
  //         navigate("/order-failure");
  //         clearInterval(interval);
  //         setShouldPoll(false);
  //       }
  //       if (data.resp.state === "COMPLETED") {
  //         clearInterval(interval);
  //         localStorage.removeItem("merchantTransactionId");
  //         navigate("/order-success", { replace: true });
  //         setLoading(false);
  //         // setFinalData(data);
  //         setShouldPoll(false);
  //         dispatch(removeCartItems());
  //         dispatch(removeWishlist());
  //         dispatch(removeCoupon());
  //       } else if (data.resp.state === "FAILED") {
  //         setLoading(false);
  //         localStorage.removeItem("merchantTransactionId");
  //         navigate("/order-failure");
  //         clearInterval(interval);
  //         setShouldPoll(false);
  //       } else if (data.resp.state === "PENDING") {
  //         setTimeout(() => {
  //           setLoading(false);
  //           localStorage.removeItem("merchantTransactionId");
  //           navigate("/order-failure");
  //           clearInterval(interval);
  //           setShouldPoll(false);
  //         }, 3000);
  //       }
  //     } catch (error) {
  //       console.error("Polling error:", error);
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [merchantTransactionId, shouldPoll]);

  if ( isLoading || isFetching ) {
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
                    value: "RazorPay",
                    Img: ASSETS.RAZORPAY,
                  },
                  {
                    label: "Pay with PhonePe",
                    value: "PhonePe",
                    Img: ASSETS.PHONEPAY2,
                  },
                ].map(({ label, value, Img }) => {
                  const provider = PaymentProviders?.find(
                    (p: any) =>
                      p.provider_name?.toLowerCase() === value?.toLowerCase()
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
              <p className="flex flex-col leading-tight">
                <span>Total MRP</span>
                <span className="text-xs">Inclusive of all tax</span>
              </p>{" "}
              {isLoading || isFetching ? (
                <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <span className="font-semibold">
                  ₹{price_summary?.total_mrp}.00
                </span>
              )}
            </div>

            <div className="flex justify-between">
              <span>Bag Discount</span>
              {isLoading || isFetching ? (
                <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <span className="">-₹{price_summary?.bag_discount}.00</span>
              )}{" "}
            </div>

            {price_summary?.discount && price_summary?.discount > 0 && (
              <div className="flex justify-between">
                <span>Coupon</span>
                <span className="">-₹{price_summary?.discount}.00</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="flex flex-col">
                Shipping
                {price_summary?.add_for_freeship === 0 ? (
                  <span className=" text-green-600  text-xs mt-1 font-semibold animate-pulse">
                    (Free Delivery 🎉)
                  </span>
                ) : (
                  <span className=" text-red-500 text-xs font-medium italic animate-shake">
                    ( Spend ₹{price_summary?.add_for_freeship} more to get free
                    shipping!)
                  </span>
                )}
              </span>
              {isLoading || isFetching ? (
                <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <div
                  className={`font-semibold  ${
                    price_summary?.shipping_fee === 0
                      ? "text-green-600 "
                      : "text-primary"
                  } gap-x-1.5 flex items-center`}
                >
                  <span>₹{price_summary?.shipping_fee}.00</span>
                </div>
              )}
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-semibold text-base">
              <span className="font-semibold text-[#0B130B]">Total</span>
              {isLoading || isFetching ? (
                <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <span className="text-[#0B130B] font-bold">
                  ₹{price_summary?.grand_total}.00
                </span>
              )}
            </div>
            <Button
              type="button"
              // disabled={!selectedRole || isPending}
              onClick={handleCreateOrder}
              className={`w-full md:h-12  font-semibold transition-all duration-300`}
            >
              {/* {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )} */}
              Pay Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
