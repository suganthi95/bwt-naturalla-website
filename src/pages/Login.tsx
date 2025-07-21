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
import { useLogin } from "@/services/auth";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Userlogin } from "@/redux/slices/authSlice";

const formSchema = z.object({
  inputValue: z.string().min(10, "Phone number is too short"),
  password: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const { mutate, isPending } = useLogin();
  const dispatch = useDispatch();
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputValue: "",
      password: "",
    },
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]{7,15}$/;
  useEffect(() => {
    const value = form.watch("inputValue");
    if (emailRegex.test(value)) {
      setIsEmailLogin(true);
    } else {
      setIsEmailLogin(false);
    }
  }, [form.watch("inputValue")]);

  const onSubmit = (values: FormValues) => {
    if (emailRegex.test(values.inputValue)) {
      mutate(
        {
          phone_no: Number(values.inputValue),
          login_through: "email",
          email: values.inputValue,
          password: values.password,
        },
        {
          onSuccess: (data) => {
            navigate("/");
            toast.success(data?.message);
            dispatch(Userlogin(data));
          },
          onError(error) {
            if (axios.isAxiosError(error)) {
              toast.error(error?.response?.data?.message);
            }
          },
        }
      );
    } else {
      if (!numberRegex.test(values.inputValue)) {
        toast.error("Please enter a valid phone number");
        return;
      }

      mutate(
        { phone_no: Number(values.inputValue), login_through: "mobile" },
        {
          onSuccess: () => {
            navigate("/login-verify", {
              state: { phone_no: Number(values.inputValue) },
            });
          },
          onError(error) {
            if (axios.isAxiosError(error)) {
              toast.error(error?.response?.data?.message);
            }
          },
        }
      );
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F7] ">
      <div className="  md:w-[400px] p-6 space-y-6 shadow-2xl bg-white rounded-xl">
        <div className=" flex items-center justify-center gap-x-1.5">
          <Icons.Logo className="" />
          <h1 className="text-2xl  text-primary roundica">naturalla</h1>
        </div>
        <div className="grid place-items-center">
          <p className="text-xl font-bold">Login to your account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="inputValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-textPrimary font-semibold ">
                    Email or Mobile number
                  </FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEmailLogin && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  const [showPassword, setShowPassword] = useState(false);

                  return (
                    <FormItem>
                      <FormLabel className="text-textPrimary flex items-center justify-between font-semibold">
                        <p>
                          Password <span className="text-red-500">*</span>
                        </p>
                        <span
                          onClick={() => {
                            navigate("/forgot-password");
                          }}
                          className="text-sm float-right cursor-pointer text-[#007AFF] underline underline-[#007AFF]"
                        >
                          Forgot password ?{" "}
                        </span>
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
            )}

            <Button type="submit" className="w-full">
              {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </form>
        </Form>

        <p className="text-center  justify-center flex items-center gap-x-1 text-sm text-textPrimary">
          You don't have an account ?{" "}
          <a href="/sign-up" className="font-bold underline">
            Register Now
          </a>
        </p>
      </div>
      <p className="fixed bottom-2.5 text-sm text-title">
        Copyrights © All Rights Reserved ® 2025 Naturalla Stores
      </p>
    </section>
  );
}
