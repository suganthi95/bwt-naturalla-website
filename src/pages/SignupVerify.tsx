
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

const formSchema = z
  .object({
    otp: z.string().nonempty('Enter a otp'),

  })
 

type FormValues = z.infer<typeof formSchema>;

export default function SignupVerify() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     otp:''
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="  md:w-[400px] p-6 space-y-6 shadow-2xl bg-white rounded-xl">
        <div className=" flex items-center justify-center gap-x-1.5">
          <Icons.Logo className="" />
          <h1 className="text-2xl  text-primary roundica">naturalla</h1>
        </div>
        <div className="grid place-items-center">
          <p className="text-xl font-bold">To verify your account</p>
     
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold ">
                      Enter Otp
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          

        

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>

        <p className="text-center flex justify-between items-center text-sm text-textPrimary">
       Didn{'’'}t receive the OTP?
          <a  className="font-bold text-blue-600 ">
           Resend
          </a>
        </p>
      </div>
    </section>
  );
}

