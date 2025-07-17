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

import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import type { User } from "@/types/type";
import {
  useUpdateProfile,
  useVerifyEmail,
  useVerifyOtp,
} from "@/services/profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
interface Props {
  User: User[];
}
export default function Settings({ User }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const { mutate, isPending } = useUpdateProfile();
  const [IsVerifyOtp, setIsVerifyOtp] = useState(false);
  const [isVerfied, setIsVerified] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [otpValue, setOtpValue] = useState("");
  const { mutate: VerifyEmail, isPending: VerifyIsPending } = useVerifyEmail();
  const { mutate: VerifyOtp, isPending: verifyOtpLoading } = useVerifyOtp();

  const queryClient = useQueryClient();
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

  const handleVerifyEmail = () => {
    VerifyEmail(
      { token: token ?? "", email: form.watch("email") },
      {
        onSuccess: (data) => {
          if (!data?.verified) {
            setIsVerifyOtp(true);
            setEmail(form.watch("email"));
          } else {
            setIsVerifyOtp(false);
            setIsVerified(true);
          }
          toast.success(data?.message);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  const handleOtpVerify = () => {
    VerifyOtp(
      { token: token ?? "", email: email, otp: otpValue },
      {
        onSuccess: (data) => {
          setIsVerifyOtp(false);
          setIsVerifyOtp(true);

          toast.success(data?.message);
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  const onSubmit = (values: FormValues) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (values.password !== values.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (!passwordRegex.test(values.password ?? "")) {
      toast.warning(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }
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
    <div className=" h-full xl:w-6/12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
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
          <div className="grid md:grid-cols-2 gap-4">
            {!IsVerifyOtp ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="h-11 pr-16"
                          {...field}
                        />

                        {!User[0]?.verify_email && !isVerfied ? (
                          <button
                            type="button"
                            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-sm text-primary font-medium hover:underline"
                            onClick={handleVerifyEmail}
                            disabled={VerifyIsPending}
                          >
                            {VerifyIsPending ? (
                              <span className="inline-flex items-center gap-1 text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                              </span>
                            ) : (
                              <span>Verify</span>
                            )}
                          </button>
                        ) : (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 size-4 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="text-white w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <label className="text-textPrimary font-semibold text-sm">
                  Enter OTP
                </label>

                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    className="h-11 pr-24"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                  />

                  {verifyOtpLoading ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground inline-flex items-center gap-1">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-sm h-auto p-0 font-medium hover:underline"
                      onClick={handleOtpVerify}
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            )}

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
                        readOnly
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

          {User[0]?.verify_email || isVerfied ? (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const [showPassword, setShowPassword] = useState(false);

                  return (
                    <FormItem>
                      <FormLabel className="text-textPrimary font-semibold">
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-11 pr-10"
                            placeholder="••••••"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => {
                  const [showPassword, setShowPassword] = useState(false);

                  return (
                    <FormItem>
                      <FormLabel className="text-textPrimary font-semibold">
                        Confirm Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="h-11 pr-10"
                            placeholder="••••••"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          ) : (
            <div className="p-2 bg-yellow-50 text-yellow-800 text-xs w-fit rounded-md border border-yellow-200">
              <p>
                <strong>Note:</strong> Please verify your email to update your
                password.
              </p>
            </div>
          )}

          {(User[0]?.verify_email || isVerfied) && (
            <div className="mt-2 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 flex items-start gap-2">
              <svg
                className="h-5 w-5 mt-0.5 text-yellow-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M12 9v2m0 4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
                />
              </svg>
              <p className="text-xs">
                <span className="font-semibold">Password Tip:</span> Must be at
                least <strong>8 characters</strong> and include{" "}
                <strong>uppercase</strong>, <strong>lowercase</strong>,{" "}
                <strong>number</strong>, and a{" "}
                <strong>special character</strong>.
              </p>
            </div>
          )}

          <Button type="submit" disabled={isPending} className="w-fit">
            {isPending ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
