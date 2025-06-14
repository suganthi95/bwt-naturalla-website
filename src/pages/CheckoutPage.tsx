import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BadgePercent,
  ChevronDown,
  ChevronUp,
  Loader2,
  TicketPercent,
} from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import cities from "@/json/cities.json";
import states from "@/json/states.json";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useCheckCouponCode,
  useDeleteCart,
  useGetCartItems,
  useUpdateCart,
} from "@/services/cart";
import type { Product } from "@/types/Home";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion2";
import {
  addItemTotalAmount,
  decreaseQuantity,
  increaseQuantity,
  setCartItems,
  setShippingAddress,
  setTaxDetails,
} from "@/redux/slices/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { setCoupon } from "@/redux/slices/couponSlice";
import axios from "axios";

// Country data

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),


  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must be numeric")
    .min(7, "Phone number is too short"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address is too short"),

  city: z.string().min(1, "City is required"),

  state: z.string().min(1, "State is required"),

  // country: z.string().min(1, "Country is required"),

  pinCode: z
    .string()
    .min(5, "Pincode is required")
    .regex(/^\d{4,}$/, "Pincode must be at least 4 digits"),
});

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { data } = useGetCartItems(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg"
  );
  const { mutate } = useUpdateCart();
  const { mutate: CheckCoupon, isPending } = useCheckCouponCode();
  const { mutate: removeCart } = useDeleteCart();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const CouponDetails = useSelector((state: RootState) => state.coupon);
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");

  const [removingItemId, setRemovingItemId] = useState<number | null>(null);


  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [Statequery, setStateQuery] = useState("");
  const [showStateDropdown, setShowSatteDropdown] = useState(false);
  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredStates = states.filter((city) =>
    city.name.toLowerCase().includes(Statequery.toLowerCase())
  );


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      // country: "India",
      pinCode: "",
    },
  });


  const handleDecrease = (cart_id: number) => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: -1,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
    });
    dispatch(decreaseQuantity(cart_id));
  };

  const handleIncrease = (cart_id: number) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    mutate({
      cart_id,
      quantity: 1,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
    });
    dispatch(increaseQuantity(cart_id));
  };
  const handleRemoveProduct = (cart_id: number, quantity: number) => {
    setRemovingItemId(cart_id);
    removeCart({
      cart_id,
      quantity,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
    });
  };

  const handleCheckCoupon = () => {
    CheckCoupon(
      {
        couponCode: couponCode,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg",
      },
      {
        onSuccess(data) {
          dispatch(setCoupon(data));
          toast.success("coupon applied");
        },
        onError(error) {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Address added");
    dispatch(setShippingAddress(values));
  };

  const subtotal = items?.reduce(
    (acc: number, item: any) => acc + item.unit_price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.18);

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

  return (
    <main>
      <section className="container mx-auto  mb-10 md:mb-20">
        {/* <div className="w-full border-b mb-4 py-2">
          <Accordion type="multiple" className="grid grid-cols-2   w-full">
            <AccordionItem value="cart" className="">
              <AccordionTrigger>
                <h1 className="md:text-2xl font-semibold">Cart</h1>
              </AccordionTrigger>
            </AccordionItem>

            <AccordionItem value="pricing" className="ml-56">
              <AccordionTrigger>
                <div className="flex justify-center items-center w-full">
                  <h2 className="md:text-2xl font-semibold">Pricing Details</h2>
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
        </div> */}

        <div className="flex w-full gap-x-10 flex-col lg:flex-row">
          <div className="w-full lg:w-8/12">
            <Accordion
              type="single"
              defaultValue="item-1"
              collapsible
              className=""
            >
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="cursor-pointer">
                  <h1 className="md:text-2xl font-semibold">Cart</h1>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {items?.map((product: Product) => {
                      let productDiscount = 0;

                      const isProductInCoupon =
                        CouponDetails?.coupon_type === "product_based" &&
                        Array.isArray(CouponDetails.product_ids) &&
                        CouponDetails.product_ids.includes(
                          Number(product.product_id)
                        );

                      if (isProductInCoupon) {
                        if (CouponDetails.discount_type === "percent") {
                          productDiscount =
                            (product.unit_price *
                              product.quantity *
                              CouponDetails.discount) /
                            100;
                        } else {
                          productDiscount = CouponDetails.discount;
                        }
                      } else {
                        // toast.warning(
                        //   "Coupon not applicable to any product in your cart."
                        // );
                      }

                      const finalPrice = Math.round(
                        product.unit_price * product.quantity - productDiscount
                      );
                      dispatch(
                        addItemTotalAmount({
                          ...product,
                          total_amount: finalPrice,
                        })
                      );

                      return (
                        <div className="flex justify-between items-center gap-4 pb-6">
                          <div className="flex gap-4 items-start">
                            <img
                              src={product?.thumbnail_image_url}
                              alt="Product"
                              className="w-28 h-24 object-cover rounded-md"
                            />

                            <div className="text-textPrimary">
                              <h3 className="font-semibold text-textPrimary text-base md:text-lg">
                                {product?.product_name}
                              </h3>

                              <p className="text-xs flex flex-wrap items-center text-[#939393] mt-1 gap-x-1">
                                <span>1 unit</span>
                                <span className="text-gray-300">|</span>
                                <span>₹{product?.unit_price}</span>
                                <span className="text-gray-300">|</span>
                                <span>Size</span>
                                <span>{product?.product_size}</span>
                              </p>

                              <div className="md:mt-4">
                                <span className="text-[22px] font-bold text-textPrimary">
                                  ₹ {finalPrice}
                                  {/* {Math.round(
                                    product.unit_price * product.quantity -
                                      CouponDetails.product_ids.includes(
                                        product.product_id
                                      )
                                      ? productDiscount
                                      : 0
                                  )} */}
                                </span>
                                <span className="line-through ml-2 text-[15px] text-gray-400">
                                  ₹{product.strike_through_price}
                                </span>
                                <span className="ml-2 text-[15px] text-green-600 font-semibold">
                                  20% off
                                </span>
                                {CouponDetails?.coupon_type ===
                                  "product_based" &&
                                  Array.isArray(CouponDetails.product_ids) &&
                                  CouponDetails.product_ids.includes(
                                    Number(product.product_id)
                                  ) && (
                                    <div className="mt-2 px-3 py-1 rounded-md bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2 w-fit">
                                      <BadgePercent className="w-4 h-4 text-green-600" />
                                      <span>
                                        Coupon offer applied to this item!
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="p-0 cursor-pointer w-5 h-5 text-lg text-gray-700"
                                onClick={() => handleDecrease(product.cart_id)}
                              >
                                −
                              </Button>
                              <Input
                                type="number"
                                value={product.quantity}
                                onChange={(e) =>
                                  setQuantity(Number(e.target.value))
                                }
                                className="w-10 text-center border-none text-sm font-semibold px-0"
                                min={1}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="p-0 cursor-pointer w-5 h-5 text-lg text-gray-700"
                                onClick={() => handleIncrease(product.cart_id)}
                              >
                                +
                              </Button>
                            </div>

                            <button
                              onClick={() =>
                                handleRemoveProduct(
                                  product.cart_id,
                                  product?.quantity
                                )
                              }
                              className="text-gray-500 cursor-pointer hover:text-red-500"
                            >
                              {removingItemId === product.cart_id ? (
                                <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                              ) : (
                                <Icons.Remove />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <AccordionContent>

            <ul>
              {data?.map((product: Product) => {
                return (
                  <div className="flex justify-between items-center gap-4 pb-6">
                    <div className="flex gap-4 items-start">
                      <img
                        src={product?.thumbnail_image_url}
                        alt="Product"
                        className="w-28 h-24 object-cover rounded-md"
                      />

                      <div className="text-textPrimary">
                        <h3 className="font-semibold text-textPrimary text-base md:text-lg">
                          {product?.product_name}
                        </h3>

                        <p className="text-xs flex flex-wrap items-center text-[#939393] mt-1 gap-x-1">
                          <span>1 unit</span>
                          <span className="text-gray-300">|</span>
                          <span>₹{product?.unit_price}</span>
                          <span className="text-gray-300">|</span>
                          <span>Size</span>
                          <span>{product?.product_size}</span>
                        </p>

                        <div className="md:mt-4">
                          <span className="text-[22px] font-bold text-textPrimary">
                            ₹{Math.round(product.unit_price * product.quantity)}
                          </span>
                          <span className="line-through ml-2 text-[15px] text-gray-400">
                            ₹{product.strike_through_price}
                          </span>
                          <span className="ml-2 text-[15px] text-green-600 font-semibold">
                            20% off
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex items-center gap-2 border px-3 py-1 rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 cursor-pointer w-5 h-5 text-lg text-gray-700"
                          onClick={() => handleDecrease(product.cart_id)}
                        >
                          −
                        </Button>
                        <Input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-10 text-center border-none text-sm font-semibold px-0"
                          min={1}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 cursor-pointer w-5 h-5 text-lg text-gray-700"
                          onClick={() => handleIncrease(product.cart_id)}
                        >
                          +
                        </Button>
                      </div>

                      <button
                        onClick={() =>
                          handleRemoveProduct(
                            product.cart_id,
                            product?.quantity
                          )
                        }
                        className="text-gray-500 cursor-pointer hover:text-red-500"
                      >
                        {removingItemId === product.cart_id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                        ) : (
                          <Icons.Remove />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </AccordionContent> */}
            <Accordion type="single" defaultValue="item-2" collapsible>
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="cursor-pointer">
                  <h1 className="md:text-2xl font-semibold ">
                    Shipping Details
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-8">
                    {/* <h1 className="md:text-2xl font-semibold mb-6">
                      Shipping Details
                    </h1> */}

                    <Form {...form}>
                      <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <Label
                                  htmlFor="firstName"
                                  className="text-title font-semibold text-sm"
                                >
                                  First Name
                                </Label>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your first name"
                                    className="h-10"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <Label
                                  htmlFor="lastName"
                                  className="text-title font-semibold text-sm"
                                >
                                  Last Name
                                </Label>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your last name"
                                    className="h-10"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2  gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <Label
                                  htmlFor="email"
                                  className="text-title font-semibold text-sm"
                                >
                                  Email
                                </Label>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your email"
                                    className="h-10"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div>
                            <Label
                              htmlFor="firstName"
                              className="text-title font-semibold text-sm mb-3"
                            >
                              Phone Number
                            </Label>
                            <div className="flex items-center gap-2 border rounded-md h-10 px-3  bg-white   transition">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Icons.India className="w-5 h-5" />
                                <span className="whitespace-nowrap">+91</span>
                              </div>

                              <div className="h-6 w-px bg-border" />

                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your phone number"
                                        className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm"
                                        type="tel"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <Label
                                htmlFor="address"
                                className="text-title font-semibold text-sm"
                              >
                                Address
                              </Label>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your address"
                                  className="h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <Label className="text-title font-semibold text-sm">
                                  City
                                </Label>
                                <div className="relative">
                                  <Input
                                    placeholder="Search city..."
                                    value={query}
                                    onChange={(e) => {
                                      setQuery(e.target.value);
                                      setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full pr-10 cursor-pointer"
                                  />

                                  <div
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                    onClick={() =>
                                      setShowDropdown((prev) => !prev)
                                    }
                                  >
                                    {showDropdown ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div>

                                  {showDropdown && (
                                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-60 overflow-auto mt-1 shadow-md rounded">
                                      {filteredCities.length === 0 ? (
                                        <li className="p-2 text-sm text-muted-foreground">
                                          No city found.
                                        </li>
                                      ) : (
                                        filteredCities.map((city) => (
                                          <li
                                            key={city.id}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                            onClick={() => {
                                              field.onChange(city.name);
                                              setQuery(city.name);
                                              setShowDropdown(false);
                                            }}
                                          >
                                            {city.name}
                                          </li>
                                        ))
                                      )}
                                    </ul>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <Label className="text-title font-semibold text-sm">
                                  State
                                </Label>
                                <div className="relative">
                                  <Input
                                    placeholder="Search state..."
                                    value={Statequery}
                                    onChange={(e) => {
                                      setStateQuery(e.target.value);
                                      setShowSatteDropdown(true);
                                      setShowDropdown(false);
                                    }}
                                    onFocus={() => {
                                      setShowSatteDropdown(true);
                                      setShowDropdown(false);
                                    }}
                                    className="w-full pr-10 cursor-pointer"
                                  />
                                  <div
                                    className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                    onClick={() =>
                                      setShowSatteDropdown((prev) => !prev)
                                    }
                                  >
                                    {showStateDropdown ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div>
                                  {showStateDropdown && (
                                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-60 overflow-auto mt-1 shadow-md rounded">
                                      {filteredStates.length === 0 ? (
                                        <li className="p-2 text-sm text-muted-foreground">
                                          No state found.
                                        </li>
                                      ) : (
                                        filteredStates.map((city) => (
                                          <li
                                            key={city.code}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                            onClick={() => {
                                              field.onChange(city.name);
                                              setStateQuery(city.name);
                                              setShowSatteDropdown(false);
                                            }}
                                          >
                                            {city.name}
                                          </li>
                                        ))
                                      )}
                                    </ul>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="pinCode"
                            render={({ field }) => (
                              <FormItem>
                                <Label
                                  htmlFor="pinCode"
                                  className="text-title font-semibold text-sm"
                                >
                                  Pincode
                                </Label>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your pincode"
                                    className="w-full"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Label
                          className="text-title font-semibold cursor-pointer"
                          htmlFor="contact"
                        >
                          <Checkbox
                            id="contact"
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                          />
                          Save contact information
                        </Label>
                        <div className="flex  justify-between ">
                          <Button type="submit" className="px-8">
                            Add
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Shipping Details Form */}
          </div>

          <div className="w-full lg:w-4/12 mt-8 lg:mt-0">
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="cursor-pointer">
                  <h1 className="md:text-2xl font-semibold ">
                    Shipping Details
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  {subtotal < 500 && (
                    <div className="mb-3 p-3 bg-yellow-100 text-yellow-800 rounded-md text-xs font-medium transition-all duration-300 ease-in-out opacity-100">
                      Minimum order value must be ₹500 to apply the discount.
                    </div>
                  )}

                  <div className="relative flex items-center mb-5">
                    <TicketPercent className="absolute left-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Apply Coupon Code"
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="pl-10 pr-24 py-2 text-sm border border-gray-300 w-full"
                    />

                    <Button
                      onClick={handleCheckCoupon}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-sm"
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Apply  "
                      )}
                    </Button>
                  </div>

                  <div className="space-y-6 text-sm font-medium text-title">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span className="font-semibold">₹1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="">-₹{discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold">₹{shipping}</span>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between font-semibold text-base">
                      <span className="font-semibold text-[#0B130B]">
                        Total
                      </span>
                      <span className="text-[#0B130B] font-bold">₹{total}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              className="w-full md:h-12 "
              onClick={async () => {
                const valid = await form.trigger();
                if (valid) {
                  dispatch(setCartItems(data?.data));
                  dispatch(setTaxDetails(data?.tax_detail));
                  navigate("/payment", { state: { product: data } });
                } else {
                  toast.error("please add address");
                }
              }}
            >
              PayNow
              <ul className="flex -space-x-2 ">
                <li>
                  <img src={ASSETS.PAYTM} alt="" className="w-6" />
                </li>
                <li>
                  <img src={ASSETS.PHONEPAY} alt="" className="w-6" />
                </li>

                <li>
                  <img src={ASSETS.GPAY} alt="" className="w-6" />
                </li>

                <li>
                  <img src={ASSETS.FRAMEPAY} alt="" className="w-6" />
                </li>
              </ul>{" "}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
