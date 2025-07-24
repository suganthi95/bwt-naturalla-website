import { Icons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { RootState } from "@/redux/store";
import { useContactUs } from "@/services/home";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { z } from "zod";

const formSchema = z.object({
  attachments: z.any(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone number is too short"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(2, "Message is required"),
});

type FormValues = z.infer<typeof formSchema>;

function ContactUs() {
  const { token } = useSelector((data: RootState) => data.auth);
  const { mutate, isPending } = useContactUs();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: null,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const finalData = {
      ...data,
      token: token,
    };
    console.log("data: ", data);
    mutate(finalData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        form.reset();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data.message);
        }
      },
    });
  };

  return (
    <div className="min-h-screen container mt-10 mb-10 ">
      <div className="grid lg:grid-cols-2  gap-10">
        <div>
          <h1 className="text-2xl font-semibold">Contact Us</h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 mt-7"
            >
              {/* <FormField
                        control={form.control}
                        name="attachments"
                        render={({ field: { onChange } }) => (
                        <FormItem>
                            <FormLabel className="text-textPrimary font-semibold">
                                Attachments
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    type="file" 
                                    onChange={(e) => {
                                        onChange(e.target.files?.[0])
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    /> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            form.formState.errors.phoneNumber &&
                            "border-red-500"
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

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold">
                      Subject <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Enter Subject"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-textPrimary font-semibold">
                      Message <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-11"
                        placeholder="Share your feedback"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-fit h-11">
                {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="map-container rounded-3xl border-[1px] border-slate-300 overflow-hidden shadow-lg">
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.744681087338!2d77.01243237480922!3d11.057759089108629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857e641a02c71%3A0xb9934842ad5099e9!2sNaturalla%20Store!5e0!3m2!1sen!2sin!4v1753341517013!5m2!1sen!2sin"
            allowFullScreen
            width="100%"
            className="absolute top-0 left-0 w-full h-full border-0"
            loading="lazy"
            title="Google Maps Embed"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    
    </div>
  );
}

export default ContactUs;
