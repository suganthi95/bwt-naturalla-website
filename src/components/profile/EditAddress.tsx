import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Icons } from "@/assets/icons";

// import cities from "@/json/cities.json";
// import states from "@/json/states.json";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import states from "@/json/states.json";
import cities from "@/json/cities.json";
// interface Props {
//   onClose: (val: boolean) => void;
// }
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters"),

  email: z.string().optional(),
  flat: z.string().min(4, "Area, Street, Sector or village    is required"),

  village: z.string().min(4, "Area, Street, Sector or village    is required"),
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
export default function EditAddress () {
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

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
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Address added");
    console.log(values);

    //   dispatch(setShippingAddress(values));
  };

  return (
    <div className="p-4">
    
      <Form {...form}>
        <form
          className="space-y-4  h-full"
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
          <div>
            <FormField
              control={form.control}
              name="village"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="Building"
                    className="text-title font-semibold text-sm"
                  >
                    Flat, House mo, Building
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Enter here"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="flat"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="flat"
                    className="text-title font-semibold text-sm"
                  >
                    Area, Street, Sector or village
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Enter here"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Label
                      htmlFor="city"
                      className="text-title font-semibold text-sm"
                    >
                      City
                    </Label>
                    <FormControl>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className="w-full h-10 justify-between"
                          >
                            {field.value || "Select a city"}
                            {openCity ? (
                              <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full h-40 p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search city..."
                              className="h-9"
                            />
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {cities.map((city) => (
                                <CommandItem
                                  key={city.id}
                                  value={city.name}
                                  onSelect={() => {
                                    field.onChange(city.name);
                                    setOpenCity(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === city.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => {
                // const states = [
                //   "Tamil Nadu",
                //   "Kerala",
                //   "Karnataka",
                //   "Andhra Pradesh",
                //   "Maharashtra",
                // ]; // Replace with your full list
                return (
                  <FormItem>
                    <Label
                      htmlFor="state"
                      className="text-title font-semibold text-sm"
                    >
                      State
                    </Label>
                    <FormControl>
                      <Popover open={openState} onOpenChange={setOpenState}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openState}
                            className="w-full h-10 justify-between"
                          >
                            {field.value || "Select a state"}
                            {openState ? (
                              <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            )}{" "}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full h-40 p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search state..."
                              className="h-9"
                            />
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {states.map((state) => (
                                <CommandItem
                                  key={state.code}
                                  value={state.name}
                                  onSelect={() => {
                                    field.onChange(state.name);
                                    setOpenState(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === state.name
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {state.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2  gap-4">
            {/* <FormField
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
            /> */}
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
                      className="w-full h-10"
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
                  form.formState.errors.phoneNumber && "border-red-500"
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

          <Label
            className="text-title font-medium text-sm cursor-pointer"
            htmlFor="contact"
          >
            <Checkbox
              id="contact"
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
            />
            Make this default address
          </Label>
          <div className="flex  justify-between ">
            <Button type="submit" className="px-8">
              Add Address
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
