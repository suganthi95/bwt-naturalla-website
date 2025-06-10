import { ASSETS } from "@/assets/assets";
import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketPercent } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import countryCode from "@/json/country.json";
import countries from "@/json/countries.json";
import { Checkbox } from "@/components/ui/checkbox";
// Country data



// Form validation schema
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

  callingCode: z.string().min(1, "Calling code is required"),

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

  country: z.string().min(1, "Country is required"),

  pinCode: z
    .string()
    .min(1, "Pincode is required")
    .regex(/^\d{4,}$/, "Pincode must be at least 4 digits"),
});

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCode.find((c) => c.dial_code === "+91")
  );
    const [selectedCountry, setSelectedCountry] = useState("India")
  
//   const [selectedCity, setSelectedCity] = useState(
//     countryCode.find((c) => c.dial_code === "+91")
//   );

//    const [selectedState, setSelectedState] = useState(
//     countryCode.find((c) => c.dial_code === "+91")
//   );
  const [value, setValue] = useState("India");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      callingCode: "+91",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      pinCode: "",
    },
  });

  const { setValue: setFormValue,  } = form;
//   const Country = watch("country");
//   const State = watch("state");
//   const City = watch("city");

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
    // Handle form submission (e.g., proceed to payment)
  };

  return (
    <main>
      <section className="container mx-auto mt-10 mb-10 md:mt-20 md:mb-20">
        <div className="grid grid-cols-2 border-b mb-4 py-2">
          <h1 className="md:text-2xl font-semibold">Cart</h1>
          <div className="flex justify-center items-center w-full">
            <h2 className="md:text-2xl font-semibold -ml-52">Pricing Details</h2>
          </div>
        </div>

        <div className="flex w-full gap-x-10 flex-col lg:flex-row">
          <div className="w-full lg:w-8/12">
            <div className="flex justify-between items-center gap-4 pb-6">
              <div className="flex gap-4 items-start">
                <img
                  src={ASSETS.PRODUCT1}
                  alt="Product"
                  className="w-28 h-24 object-cover rounded-md"
                />

                <div className="text-textPrimary">
                  <h3 className="font-semibold text-textPrimary text-base md:text-lg">
                    Product Title
                  </h3>

                  <p className="text-xs flex flex-wrap items-center text-[#939393] mt-1 gap-x-1">
                    <span>1 unit</span>
                    <span className="text-gray-300">|</span>
                    <span>₹500</span>
                    <span className="text-gray-300">|</span>
                    <span>Size</span>
                    <span>100 ML</span>
                  </p>

                  <div className="md:mt-4">
                    <span className="text-[22px] font-bold text-textPrimary">
                      ₹1,000
                    </span>
                    <span className="line-through ml-2 text-[15px] text-gray-400">
                      ₹1,200
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
                    onClick={handleDecrease}
                  >
                    −
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-10 text-center border-none text-sm font-semibold px-0"
                    min={1}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 cursor-pointer w-5 h-5 text-lg text-gray-700"
                    onClick={handleIncrease}
                  >
                    +
                  </Button>
                </div>

                <button className="text-gray-400 hover:text-red-500 transition">
                  <Icons.Remove />
                </button>
              </div>
            </div>

            {/* Shipping Details Form */}
            <div className="mt-8">
              <h1 className="md:text-2xl font-semibold mb-6">
                Shipping Details
              </h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
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
                      <div className="border h-10 rounded-md flex">
                        <FormField
                          control={form.control}
                          name="callingCode"
                          render={() => (
                            <FormItem className="flex flex-col">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className="border-none"
                                  >
                                    {selectedCountryCode ? (
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={selectedCountryCode.image}
                                          alt={selectedCountryCode.name}
                                          className="w-5 h-5"
                                        />
                                        <span>
                                          {selectedCountryCode.dial_code}
                                        </span>
                                      </div>
                                    ) : (
                                      "Select country code"
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search country..." />
                                    <CommandList>
                                      <CommandGroup>
                                        {countryCode.map((country) => (
                                          <CommandItem
                                            key={country.code}
                                            value={country.name}
                                            onSelect={() => {
                                              setSelectedCountryCode(country);
                                              setValue(country.name);
                                              setFormValue(
                                                "callingCode",
                                                country.dial_code
                                              );
                                            }}
                                          >
                                            <div className="flex items-center gap-2">
                                              <img
                                                src={country.image}
                                                alt={country.name}
                                                className="w-5 h-5"
                                              />
                                              <span>
                                                {country.dial_code} -{" "}
                                                {country.name}
                                              </span>
                                            </div>
                                            <Check
                                              className={`ml-auto h-4 w-4 ${
                                                value === country.name
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              }`}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  placeholder="Enter your phone number"
                                  className="w-full border-none"
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <Command>
                                <CommandInput
                                  placeholder="Search city..."
                                  className="h-9"
                                />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country}
                                      value={country}
                                      onSelect={() => {
                                        
                                        field.onChange(country)

                                      }}
                                    >
                                      {country}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </SelectContent>
                          </Select>
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <Command>
                                <CommandInput
                                  placeholder="Search country..."
                                  className="h-9"
                                />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country}
                                      value={country}
                                      onSelect={() => field.onChange(country)}
                                    >
                                      {country}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                          <FormItem>
                          <Label className="text-title font-semibold text-sm">
                            Country
                          </Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full text-start cursor-pointer">
                               <p className="w-fit text-start">{selectedCountry}</p>  
                                <SelectValue placeholder="Select city" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <Command>
                                <CommandInput
                                  placeholder="Search city..."
                                  className="h-9"
                                />
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country}
                                      value={country}
                                      onSelect={() => {
                                        setFormValue('country',country)
                                        setSelectedCountry(country)
                                        field.onChange(country)

                                      }}
                                    >
                                      {country}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </SelectContent>
                          </Select>
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

                    <Label className="text-title font-semibold cursor-pointer" htmlFor="contact">
                        <Checkbox id="contact"  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none" />
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
          </div>

          <div className="w-full lg:w-4/12 mt-8 lg:mt-0">
            <div className="relative flex items-center mb-5">
              <TicketPercent className="absolute left-3 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Apply Coupon Code"
                className="pl-10 pr-24 py-2 text-sm border border-gray-300 w-full"
              />
              <Button className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-sm">
                Apply
              </Button>
            </div>

               <div className="space-y-6 text-sm font-medium text-title">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="">-₹200</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">₹1,200</span>
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between font-semibold text-base">
            <span className="font-semibold text-[#0B130B]">Total</span>
            <span className="text-[#0B130B] font-bold">₹1,150</span>
          </div>
          <Button className="w-full md:h-12 ">
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
        </div>
      </section>
    </main>
  );
}
