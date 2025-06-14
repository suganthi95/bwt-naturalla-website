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
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  inputValue:  z.string().min(10, "Phone number is too short"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
    const {mutate,isPending} = useLogin()
    const navigate = useNavigate()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputValue: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(Number(values.inputValue),{
        onSuccess:()=>{
navigate('/login-verify',{state:{phone_no:Number(values.inputValue)}})
        },
        onError(error) {
            if(axios.isAxiosError(error)){
                toast.error(error?.response?.data?.message)
            }
        },
    })
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
                    Email or mobile number
                  </FormLabel>
                  <FormControl>
                    <Input className="h-11" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
             {isPending  ? <Loader2 className="animate-spin"/>: 'Continue'} 
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
    </section>
  );
}
