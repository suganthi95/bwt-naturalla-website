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
import { Icons } from "@/assets/icons"; // Replace this with your actual India icon import
import { useSignup } from "@/services/auth";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email"),
    phoneNumber: z.string().min(10, "Phone number is too short"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must agree to the privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function Signup() {
  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_no: Number(values.phoneNumber),
        email: values.email,
        password: values.password,
      },
      {
        onSuccess(data) {
          toast.success(data.message);

          navigate("/sign-up-verify", {
            state: { phone_no: Number(values.phoneNumber) },
          });
        },
        onError(error) {
          if (axios.isAxiosError(error)) {
            toast.error(error?.response?.data?.message);
          }
        },
      }
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F7] px-4">
      <div className="max-w-lg w-full mx-auto p-6 space-y-6  bg-white rounded-xl">
        <div className="flex items-center justify-center gap-x-1.5">
          <Icons.Logo />
          <h1 className="text-2xl text-primary font-bold"> BWT-store</h1>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold">Create your account</p>
          <p className="font-medium text-lead">
            Enter your personal details to create account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold">
                      First Name <span className="text-red-500">*</span>
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
                    <FormLabel className="text-textPrimary font-semibold">
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="h-11" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
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
                    <FormLabel className="text-textPrimary font-semibold">
                      Phone Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div
                        className={`flex items-center gap-2 border rounded-md h-11 px-3 shadow-sm bg-white ${
                          form.formState.errors.phoneNumber && "border-red-500"
                        }`}
                      >
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Icons.India className="w-5 h-5" />
                          <span>+91</span>
                        </div>
                        <div className="h-6 w-px bg-border" />
                        <Input
                          type="tel"
                          placeholder=""
                          className="border-none p-0 focus:ring-0 text-sm"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            className="h-11"
                            placeholder="••••••"
                            type={showPassword ? "text" :"password"}
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

            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-xs text-textPrimary">
                      I agree with the{" "}
                      <a
                        // href="https://staging.naturalla.store/privacy-policy"
                        target="_blank"
                        className="underline"
                      >
                        privacy policy
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button  type="submit" className="w-full h-11">
              {isPending ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-textPrimary">
          Already have an account?{" "}
          <a href="/login" className="font-bold underline">
            Sign in
          </a>
        </p>
      </div>

      <p className="static md:fixed bottom-2.5 text-xs text-center  md:text-sm text-title">
        Copyrights © All Rights Reserved ® 2025  BWT-store Stores
      </p>
    </section>
  );
}
