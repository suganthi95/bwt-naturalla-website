import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BadgePercent,
  Loader2,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import cities from "@/json/city_cleaned.json";
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
  useAddOrderAddress,
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
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  setCartItems,
  setCartItemsPrice_Summary,
  setCartProducts_Data,
  setShippingAddress,
} from "@/redux/slices/cartSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { useGetAddress } from "@/services/profile";
import { motion } from "framer-motion";
import FullScreenLoader from "@/common/FullScreenLoader";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(3, "First name must be at least 3 characters"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(3, "Last name must be at least 3 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

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
    pinCode: z
      .string()
      .min(5, "Pincode is required")
      .regex(/^\d{4,}$/, "Pincode must be at least 4 digits"),

    same_billing_address: z.boolean(),

    billing_first_name: z.string().optional(),
    billing_last_name: z.string().optional(),
    billing_email: z.string().optional(),
    billing_phone_no: z.string().optional(),
    billing_address: z.string().optional(),
    billing_city: z.string().optional(),
    billing_state: z.string().optional(),
    billing_pincode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.same_billing_address) {
      if (!data.billing_first_name || data.billing_first_name.length < 3) {
        ctx.addIssue({
          path: ["billing_first_name"],
          code: z.ZodIssueCode.custom,
          message: "Billing first name must be at least 3 characters",
        });
      }
      if (!data.billing_last_name || data.billing_last_name.length < 3) {
        ctx.addIssue({
          path: ["billing_last_name"],
          code: z.ZodIssueCode.custom,
          message: "Billing last name must be at least 3 characters",
        });
      }
      if (!data.billing_email || !/^\S+@\S+\.\S+$/.test(data.billing_email)) {
        ctx.addIssue({
          path: ["billing_email"],
          code: z.ZodIssueCode.custom,
          message: "Billing email is invalid",
        });
      }
      if (!data.billing_phone_no || !/^\d{7,}$/.test(data.billing_phone_no)) {
        ctx.addIssue({
          path: ["billing_phone_no"],
          code: z.ZodIssueCode.custom,
          message: "Billing phone number is invalid",
        });
      }
      if (!data.billing_address || data.billing_address.length < 5) {
        ctx.addIssue({
          path: ["billing_address"],
          code: z.ZodIssueCode.custom,
          message: "Billing address is too short",
        });
      }
      if (!data.billing_city) {
        ctx.addIssue({
          path: ["billing_city"],
          code: z.ZodIssueCode.custom,
          message: "Billing city is required",
        });
      }
      if (!data.billing_state) {
        ctx.addIssue({
          path: ["billing_state"],
          code: z.ZodIssueCode.custom,
          message: "Billing state is required",
        });
      }
      if (!data.billing_pincode || !/^\d{4,}$/.test(data.billing_pincode)) {
        ctx.addIssue({
          path: ["billing_pincode"],
          code: z.ZodIssueCode.custom,
          message: "Billing pincode is invalid",
        });
      }
    }
  });

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const [couponCode, setCouponCode] = useState("");
  const { data: addresses } = useGetAddress(token);
  const { isLoading, isFetching, refetch } = useGetCartItems(token, couponCode);
  const { mutate: addAddress, isPending: addAddressIspending } =
    useAddOrderAddress();
  const { mutate } = useUpdateCart();
  const { mutate: removeCart } = useDeleteCart();
  const dispatch = useDispatch();
  const { items, price_summary } = useSelector(
    (state: RootState) => state.cart
  );
  const [quantity, setQuantity] = useState(1);
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [Statequery, setStateQuery] = useState("");
  const [showStateDropdown, setShowSatteDropdown] = useState(false);

  const [biilingquery, setbiilingqueryQuery] = useState("");
  const [biilingshowDropdown, setbiilingShowDropdown] = useState(false);
  const [biilingStatequery, setbiilingStateQuery] = useState("");
  const [showbiilingStateDropdown, setbiilingShowSatteDropdown] =
    useState(false);
  const filteredCities = cities.filter((city) =>
    city.city.toLowerCase().includes(query?.toLowerCase())
  );
  const filteredStates = states.filter((city) =>
    city.name.toLowerCase().includes(Statequery?.toLowerCase())
  );

  const filteredCities2 = cities.filter((city) =>
    city.city.toLowerCase().includes(biilingquery?.toLowerCase())
  );
  const filteredStates2 = states.filter((city) =>
    city.name.toLowerCase().includes(biilingStatequery?.toLowerCase())
  );
  const [showEmpty, setShowEmpty] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      same_billing_address: true,
      state: "",
      billing_address: "",
      billing_city: "",
      billing_email: "",
      billing_first_name: "",
      billing_last_name: "",
      billing_phone_no: "",
      billing_pincode: "",
      billing_state: "",
      pinCode: "",
    },
  });

  useEffect(() => {
    if (addresses) {
      const [defaultAddress] = addresses?.filter(
        (address: any) => address?.default_address
      );

      form.reset({
        firstName: defaultAddress?.address_first_name ?? "",
        lastName: defaultAddress?.address_last_name ?? "",
        email: defaultAddress?.address_email ?? "",
        phoneNumber: defaultAddress?.address_phone_no ?? "",
        address: defaultAddress?.address ?? "",
        city: defaultAddress?.city ?? "",
        state: defaultAddress?.state ?? "",
        pinCode: defaultAddress?.pincode ?? "",
        same_billing_address: defaultAddress?.default_address ?? true,
      });

      setQuery(defaultAddress?.city);
      setStateQuery(defaultAddress?.state);
    }
  }, [addresses, form.reset]);

  const handleDecrease = (cart_id: number, quan: number) => {
    if (quan <= 1) return;
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    setCouponCode("");
    mutate({
      cart_id,
      quantity: -1,
      token: token,
    });
    dispatch(decreaseQuantity(cart_id));
  };

  const handleIncrease = (cart_id: number) => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setCouponCode("");
    mutate({
      cart_id,
      quantity: 1,
      token: token,
    });
    dispatch(increaseQuantity(cart_id));
  };
  const handleRemoveProduct = (cart_id: number, quantity: number) => {
    setRemovingItemId(cart_id);
    removeCart({
      cart_id,
      quantity,
      token: token,
    });
    dispatch(removeItem(cart_id));

    const remainingItems = items.filter((item) => item.cart_id !== cart_id);

    if (remainingItems.length === 0) {
      setShowEmpty(true);
    }
  };

  const handleCheckCoupon = async () => {
    const { data } = await refetch();
    if (data) {
      toast.message(data?.message);
      dispatch(setCartItemsPrice_Summary(data?.price_summary));
      dispatch(setCartItems(data?.data));
      dispatch(setCartProducts_Data(data?.input_data?.product_data));
    }
  };

  const handleRemoveCoupon = async () => {
    await setCouponCode("");
    refetch();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addAddress(
      {
        token: token ?? "",
        payload: {
          address: values.address,
          address_email: values.email,
          address_first_name: values.firstName,
          address_last_name: values.lastName,
          address_phone_no: Number(values.phoneNumber),
          city: values.city,
          pincode: Number(values.pinCode),
          state: values.state,
        },
      },
      {
        onSuccess(data) {
          toast.message(data?.message);
        },
        onError(error) {
          if (axios.isAxiosError(error))
            toast.error(error?.response?.data?.message);
        },
      }
    );
    dispatch(
      setShippingAddress({
        address: values.address,
        city: values.city,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        pinCode: values.pinCode,
        state: values.state,
        billing_address: values.billing_address,
        billing_city: values.billing_city,
        billing_email: values.billing_email,
        billing_first_name: values.billing_first_name,
        billing_last_name: values.billing_last_name,
        billing_phone_no: values.billing_phone_no,
        billing_pincode: values.billing_pincode,
        billing_state: values.billing_state,
        same_billing_address: values.same_billing_address,
      })
    );
  };

  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }
  if (showEmpty && items?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-primary/10 text-primary p-6 rounded-full mb-6"
        >
          <ShoppingCart className="w-10 h-10" />
        </motion.div>
        <h2 className="text-2xl font-bold text-neutral-800">
          Your Cart is Empty
        </h2>
        <p className="text-muted-foreground text-sm mt-2 max-w-xs">
          Looks like you haven’t added anything to your cart yet. Start shopping
          now!
        </p>

        <Button className="mt-6" onClick={() => navigate("/products/all")}>
          Browse Products
        </Button>
      </div>
    );
  }
  return (
    <main>
      <section className="container mx-auto  mb-10 md:mb-20">
        <div className="flex  w-full gap-x-10 flex-col lg:flex-row">
          <div className="w-full h-full lg:w-8/12">
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
                      const finalPrice = Math.round(
                        product.unit_price * product.quantity
                      );

                      return (
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 border-b">
                          <div className="flex gap-4 items-start">
                            <img
                              src={product?.thumbnail_image_url}
                              alt="Product"
                              className="w-24 h-24 md:w-28 md:h-24 object-cover rounded-md"
                            />

                            <div className="text-textPrimary flex flex-col justify-between">
                              <div>
                                <h3 className="font-semibold text-base md:text-lg text-textPrimary">
                                  {product?.product_name}
                                </h3>

                                <p className="text-xs flex flex-wrap items-center text-[#939393] mt-1 gap-x-1">
                                  <span>1 unit</span>
                                  <span className="text-gray-300">|</span>
                                  <span>₹{product?.unit_price}</span>
                                  <span className="text-gray-300">|</span>
                                  {/* <span>Size</span> */}
                                  <span>{product?.units}</span>
                                </p>
                              </div>

                              <div className="mt-3">
                                <span className="text-lg md:text-xl font-bold text-textPrimary">
                                  ₹ {finalPrice}
                                </span>
                                <span className="line-through ml-2 text-sm md:text-base text-gray-400">
                                  ₹
                                  {Math.round(
                                    Number(product.strike_through_price) *
                                      product.quantity
                                  )}
                                </span>
                                <span className="ml-2 text-sm md:text-base text-green-600 font-semibold">
                                  {Math.round(
                                    Number(product?.discount_percent)
                                  )}
                                  % off
                                </span>

                                {product?.is_coupon_applied && (
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

                          <div className="grid place-items-start md:place-items-end mt-4 md:mt-0">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2 border px-2 md:px-3 py-1 rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={product?.quantity < 2}
                                  className="p-0 w-5 h-5 text-lg text-gray-700"
                                  onClick={() =>
                                    handleDecrease(
                                      product.cart_id,
                                      product.quantity
                                    )
                                  }
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
                                  disabled={
                                    product?.quantity >= product?.current_stock
                                  }
                                  variant="ghost"
                                  size="icon"
                                  className="p-0 w-5 h-5 text-lg text-gray-700"
                                  onClick={() =>
                                    handleIncrease(product.cart_id)
                                  }
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

                            {product?.current_stock <= product?.quantity && (
                              <p className="text-xs text-red-600 mt-1">
                                Only {product?.current_stock} 
                                {product?.current_stock === 1 ? "" : "s"} left
                                
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["item-1"]}>
              <Form {...form}>
                <form
                  className="space-y-4  h-full"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <AccordionItem value="item-1" className="border-none ">
                    <AccordionTrigger className="cursor-pointer ">
                      <h1 className="md:text-2xl flex flex-col items-start   font-semibold ">
                        Shipping Details
                      </h1>
                    </AccordionTrigger>
                    <AccordionContent className=" ">
                      <p className="text-red-600 text-xs  mb-2 w-fit  font-semibold  bg-red-100 px-3 py-1 rounded">
                        ⚠️ NOTE: After filling in the Shipping Details, please
                        click 'Add' button to proceed
                      </p>
                      <div className="mt-2space-y-4">
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
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
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
                            <div
                              className={`flex items-center gap-2 border rounded-md h-10 px-3 shadow-sm bg-white ${
                                form.formState.errors.phoneNumber &&
                                "border-red-500"
                              }`}
                            >
                              {" "}
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
                                  </FormItem>
                                )}
                              />
                            </div>
                            {form.formState.errors.phoneNumber && (
                              <p className="text-red-500 mt-3">
                                {form.formState.errors.phoneNumber &&
                                  form.formState.errors.phoneNumber.message}
                              </p>
                            )}
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

                        <div className="grid grid-cols-1 h-full md:grid-cols-4 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="h-full   ">
                                <Label className="text-title   font-semibold text-sm">
                                  City
                                </Label>
                                <div className=" overflow-visible ">
                                  <Input
                                    placeholder="Search city..."
                                    value={query}
                                    onChange={(e) => {
                                      setQuery(e.target.value);
                                      setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full pr-10 capitalize cursor-pointer"
                                  />

                                  {/* <div
                                    className={`absolute   w-fit left-64  flex items-center cursor-pointer ${showDropdown ? '-bottom-13':'-bottom-13'}`}
                                    onClick={() =>
                                      setShowDropdown((prev) => !prev)
                                    }
                                  >
                                    {showDropdown ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div> */}

                                  {showDropdown && (
                                    <ul className="absolute  z-[999] w-52  bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-80 overflow-auto mt-1 shadow-md rounded">
                                      {filteredCities.length === 0 ? (
                                        <li className="p-2 text-sm text-muted-foreground">
                                          No city found.
                                        </li>
                                      ) : (
                                        filteredCities.map((city) => (
                                          <li
                                            key={city.city}
                                            className="p-2 hover:bg-gray-100 capitalize dark:hover:bg-gray-700 cursor-pointer"
                                            onClick={() => {
                                              field.onChange(city.city);
                                              setQuery(city.city);
                                              setShowDropdown(false);
                                            }}
                                          >
                                            {city.city
                                              ?.charAt(0)
                                              .toUpperCase() +
                                              city.city?.slice(1)}
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
                                <div className="">
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
                                  {/* <div
                                    className={`absolute   w-fit left-[480px]  flex items-center cursor-pointer ${showStateDropdown ? '-bottom-17':'-bottom-13'}`}
                                    onClick={() =>
                                      setShowSatteDropdown((prev) => !prev)
                                    }
                                  >
                                    {showStateDropdown ? (
                                      <ChevronUp className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div> */}
                                  {showStateDropdown && (
                                    <ul className="absolute  z-[999]  w-52   bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-80 overflow-auto mt-1 shadow-md rounded">
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
                          <div className="flex  items-center relative w-full">
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
                                  <FormControl className="">
                                    <Input
                                      placeholder="Enter your pincode"
                                      className="w-full rounded-r-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  {/* <p
                            className={`${
                              isError ? "text-red-500" : "text-green-500"
                            } text-xs md:text-sm font-medium absolute -bottom-4 md:-bottom-6 truncate`}
                          >
                            {Messages}
                          </p> */}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* <Button
                              type="button"
                              onClick={checkDeliveryInfo}
                              className="h-9 rounded-l-none  rounded-r-lg cursor-pointer py-4  absolute right-11 md:-right-[60px] top-7 text-sm"
                            >
                              {Isloading ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                "Check"
                              )}
                            </Button> */}
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <FormField
                            control={form.control}
                            name="same_billing_address"
                            render={({ field }) => (
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    id="contact"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                                  />
                                </FormControl>
                                <Label
                                  htmlFor="contact"
                                  className="text-title text-xs md:text-base font-semibold cursor-pointer"
                                >
                                  Use the above for billing address also
                                </Label>
                              </FormItem>
                            )}
                          />
                          {form.watch("same_billing_address") && (
                            <div className="flex  justify-between ">
                              <Button
                                type="submit"
                                disabled={addAddressIspending}
                                className="px-8"
                              >
                                Add
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {!form.watch("same_billing_address") && (
                    <AccordionItem value="item-2" className="border-none ">
                      <AccordionTrigger className="cursor-pointer">
                        <h1 className="md:text-2xl font-semibold ">
                          Billing Details
                        </h1>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="mt-8 space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="billing_first_name"
                              render={({ field }) => (
                                <FormItem>
                                  <Label
                                    htmlFor="billing_first_name"
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
                              name="billing_last_name"
                              render={({ field }) => (
                                <FormItem>
                                  <Label
                                    htmlFor="billing_last_name"
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
                              name="billing_email"
                              render={({ field }) => (
                                <FormItem>
                                  <Label
                                    htmlFor="billing_email"
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
                                htmlFor="billingphone"
                                className="text-title font-semibold text-sm mb-3"
                              >
                                Phone Number
                              </Label>
                              <div
                                className={`flex items-center gap-2 border rounded-md h-10 px-3 shadow-sm bg-white ${
                                  form.formState.errors.phoneNumber &&
                                  "border-red-500"
                                }`}
                              >
                                {" "}
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Icons.India className="w-5 h-5" />
                                  <span className="whitespace-nowrap">+91</span>
                                </div>
                                <div className="h-6 w-px bg-border" />
                                <FormField
                                  control={form.control}
                                  name="billing_phone_no"
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
                                    </FormItem>
                                  )}
                                />
                              </div>
                              {form.formState.errors.phoneNumber && (
                                <p className="text-red-500 mt-3">
                                  {form.formState.errors.billing_phone_no &&
                                    form.formState.errors.billing_phone_no
                                      .message}
                                </p>
                              )}
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="billing_address"
                            render={({ field }) => (
                              <FormItem>
                                <Label
                                  htmlFor="billing_address"
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

                          <div className="grid grid-cols-1 h-full md:grid-cols-4 gap-4">
                            <FormField
                              control={form.control}
                              name="billing_city"
                              render={({ field }) => (
                                <FormItem className="h-full   ">
                                  <Label className="text-title   font-semibold text-sm">
                                    City
                                  </Label>
                                  <div className=" overflow-visible ">
                                    <Input
                                      placeholder="Search city..."
                                      value={biilingquery}
                                      onChange={(e) => {
                                        setbiilingqueryQuery(e.target.value);
                                        setbiilingShowDropdown(true);
                                      }}
                                      onFocus={() =>
                                        setbiilingShowDropdown(true)
                                      }
                                      className="w-full pr-10  cursor-pointer"
                                    />

                                    {biilingshowDropdown && (
                                      <ul className="absolute  z-[999] w-52  bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-80 overflow-auto mt-1 shadow-md rounded">
                                        {filteredCities2.length === 0 ? (
                                          <li className="p-2 text-sm text-muted-foreground">
                                            No city found.
                                          </li>
                                        ) : (
                                          filteredCities2.map((city) => (
                                            <li
                                              key={city.city}
                                              className="p-2 hover:bg-gray-100 capitalize dark:hover:bg-gray-700 cursor-pointer"
                                              onClick={() => {
                                                field.onChange(city.city);
                                                setbiilingqueryQuery(city.city);
                                                setbiilingShowDropdown(false);
                                              }}
                                            >
                                              {city.city
                                                ?.charAt(0)
                                                .toUpperCase() +
                                                city.city?.slice(1)}
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
                              name="billing_state"
                              render={({ field }) => (
                                <FormItem>
                                  <Label className="text-title font-semibold text-sm">
                                    State
                                  </Label>
                                  <div className="">
                                    <Input
                                      placeholder="Search state..."
                                      value={field.value}
                                      onChange={(e) => {
                                        setbiilingStateQuery(e.target.value);
                                        setbiilingShowSatteDropdown(true);
                                        setbiilingShowDropdown(false);
                                      }}
                                      onFocus={() => {
                                        setbiilingShowSatteDropdown(true);
                                        setbiilingShowDropdown(false);
                                      }}
                                      className="w-full pr-10 cursor-pointer"
                                    />

                                    {showbiilingStateDropdown && (
                                      <ul className="absolute  z-[999] w-52   bg-white dark:bg-gray-800 border dark:border-gray-700 max-h-80 overflow-auto mt-1 shadow-md rounded">
                                        {filteredStates2.length === 0 ? (
                                          <li className="p-2 text-sm text-muted-foreground">
                                            No state found.
                                          </li>
                                        ) : (
                                          filteredStates2.map((city) => (
                                            <li
                                              key={city.code}
                                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                              onClick={() => {
                                                field.onChange(city.name);
                                                setbiilingStateQuery(city.name);
                                                setShowSatteDropdown(false);
                                                setbiilingShowSatteDropdown(
                                                  false
                                                );
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
                              name="billing_pincode"
                              render={({ field }) => (
                                <FormItem>
                                  <Label
                                    htmlFor="billing_pincode"
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

                          {!form.watch("same_billing_address") && (
                            <div className="flex mt-4  justify-between ">
                              <Button
                                type="submit"
                                disabled={addAddressIspending}
                                className="px-8"
                              >
                                Add
                              </Button>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </form>
              </Form>
            </Accordion>
          </div>

          <div className="w-full h-full lg:w-4/12 mt-8 lg:mt-0">
            <Accordion type="single" collapsible defaultValue="price">
              <AccordionItem value="price" className="border-none">
                <AccordionTrigger className="cursor-pointer">
                  <h1 className="md:text-2xl font-semibold ">Price Details</h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="relative flex items-center mb-5">
                    <TicketPercent className="absolute left-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      value={couponCode}
                      placeholder="Apply Coupon Code"
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                      }}
                      className="pl-10 pr-24 py-2 text-sm border border-gray-300 w-full"
                    />

                    <Button
                      onClick={handleCheckCoupon}
                      disabled={!couponCode}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-sm"
                    >
                      {/* {false ? <Loader2 className="animate-spin" /> : "Apply  "} */}
                      Apply
                    </Button>
                  </div>
                  <div className="flex justify-end -translate-y-3">
                    {couponCode && (
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-sm !py-0 text-black font-medium hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>

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
                        <span className="">
                          -₹{price_summary?.bag_discount}.00
                        </span>
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
                            (Add items worth ₹{price_summary?.add_for_freeship}{" "}
                            more to earn free shipping)
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
                      <span className="font-semibold text-[#0B130B]">
                        Total
                      </span>
                      {isLoading || isFetching ? (
                        <div className="h-6 w-20 rounded-md bg-gray-200 animate-pulse" />
                      ) : (
                        <span className="text-[#0B130B] font-bold">
                          ₹{price_summary?.grand_total}.00
                        </span>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button
              className="w-full md:h-12 "
              disabled={items?.length === 0}
              onClick={async () => {
                const valid = await form.trigger();
                if (valid) {
                  // dispatch(setCartItems(data?.data));
                  // dispatch(setTaxDetails(data?.tax_detail));
                  navigate("/payment", {
                    state: {
                      // product: data,
                      coupon_id: price_summary?.discount,
                    },
                  });
                } else {
                  toast.error("please add address");
                }
              }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
