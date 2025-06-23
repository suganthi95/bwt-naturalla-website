import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/assets/icons";

import { Check, Loader2 } from "lucide-react";
import type { User } from "@/types/type";
import { useUpdateProfile } from "@/services/profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;
interface Props {
  User: User[];
}
export default function Settings({ User }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const { mutate, isPending } = useUpdateProfile();
  // const [showVerify, setshowVerify] = useState(false);
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: User[0]?.first_name ?? "",
      lastName: User[0]?.last_name ?? "",
      email: User[0]?.email ?? "",
      phoneNumber: User[0]?.phone_no ?? "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        payload: {
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          phone_no: Number(values.phoneNumber),
        },
        token: token,
      },
      {
        onSuccess(data) {
          queryClient.invalidateQueries({ queryKey: ["getprofile"] });
          toast.success(data.message);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  return (
    <div className=" h-full w-6/12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="John" {...field} />
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
                  <FormLabel className="text-textPrimary font-semibold ">
                    Last Name
                  </FormLabel>

                  <FormControl>
                    <Input className="h-11" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="h-11 border rounded-md items-center   flex">
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        // onFocus={() => {
                        //   setshowVerify(true);
                        // }}
                        {...field}
                        className="border-none !border-0 "
                      />
                      {/* {showVerify &&
                        (!User[0]?.verify_email || User[0]?.verify_email) && (
                          <Button className="rounded-l h-full ">Verify</Button>
                        )} */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div
                      className={`flex items-center gap-2 border rounded-md h-11 px-3 shadow-sm bg-white ${
                        form.formState.errors.phoneNumber
                          ? "border-red-500"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icons.India className="w-5 h-5" />
                        <span>+91</span>
                      </div>

                      <div className="h-6 w-px bg-border" />

                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        className="border-none p-0 focus:ring-0 focus-visible:ring-0 focus:outline-none flex-1"
                        {...field}
                      />

                      {true && (
                        <div className="size-4 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="text-white w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-fit">
            {isPending ?   <Loader2 className="animate-spin" />: "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
