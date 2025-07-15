import { Icons } from "@/assets/icons";
import { TicketCardSkeleton } from "@/common/TicketCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { RootState } from "@/redux/store";
import { useGetTickets, useRaiseTicket } from "@/services/profile";
import type { ContactUsTicket } from "@/types/type";
import { getDaysAgo } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Headphones, Info, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import z from "zod";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  otp_verified: boolean;
  verify_email: boolean;
  profile_pic: string | null;
}
interface Props {
  profileInfo: Profile;
}
export default function Support({ profileInfo }: Props) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const contactSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Phone number is required"),
    // issueCategory: z.string().min(1, "Select a category"),
    issueType: z.string().min(1, "Select an issue type"),
    attachment: z.any().optional(),
    message: z.string().min(10, "Message is required"),
  });

  const { data, isLoading } = useGetTickets(token ?? "");
  const [filteredTickets, setFilteredTickets] = useState<ContactUsTicket[]>([]);
  const { mutate, isPending } = useRaiseTicket();
  type ContactFormData = z.infer<typeof contactSchema>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-800";
      case "Closed":
        return "bg-gray-100 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return " text-red-800";
      case "Medium":
        return " text-yellow-800";
      case "Low":
        return " text-blue-800";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!data) return;

    if (selectedPriority === "all" || selectedPriority === "") {
      setFilteredTickets(data);
      return;
    }
    const filtered = data?.filter((item: ContactUsTicket) =>
      item?.priority?.includes(selectedPriority)
    );

    setFilteredTickets(filtered);
  }, [selectedPriority, data]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    reset({
      fullName: profileInfo.first_name,
      email: profileInfo.email,
      phone: profileInfo?.phone_no,
    });
  }, [reset, profileInfo]);
  const onSubmit = (values: ContactFormData) => {
    const data = {
      token: token ?? "",
      full_name: values.fullName,
      email: values.email,
      phone: values.phone,
      subject: values.issueType,
      message: values.message,
    };
    mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message);
        queryClient.invalidateQueries({ queryKey: ["getTickets"] });
        reset({
          fullName: profileInfo.first_name,
          email: profileInfo.email,
          phone: profileInfo?.phone_no,
          issueType: "",
          message: "",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message);
        }
      },
    });
  };

  return (
    <div>
      <div className="p-4 sm:p-6 border-b">
        <h3 className="text-lg sm:text-xl font-semibold">Support Center</h3>
        <p className="text-gray-600 mt-1 text-sm">
          Here are your support tickets and chat history.
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <ul className=" grid lg:grid-cols-2  space-y-4 ">
          <li className="space-y-1.5 md:space-x-2.5 p-4">
            <h2 className="text-textPrimary flex items-center gap-x-1.5 font-semibold text-2xl">
              <Headphones />
              Your Support Tickets
            </h2>
            <Select onValueChange={(value) => setSelectedPriority(value)}>
              <SelectTrigger className="w-[200px] cursor-pointer">
                <SelectValue placeholder="Show - All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Show - All Status</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            {isLoading ? (
              <TicketCardSkeleton />
            ) : (
              <div className="overflow-y-auto mt-4 h-96 space-y-3.5">
                {filteredTickets?.map((ticket: ContactUsTicket) => {
                  return (
                    <div
                      key={ticket.contactus_id}
                      className="w-full border rounded-xl shadow-sm p-4 space-y-3 bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="md:text-lg font-semibold text-neutral-800">
                          {ticket.subject}
                        </h3>
                        <div
                          className={`px-4 py-1 text-xs rounded-md font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm md:text-base  text-muted-foreground">
                        <span>{ticket?.message_body}</span>
                        <div
                          className={`px-4 py-1 flex items-center gap-x-1 text-xs rounded-md font-medium ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          <Info className="w-4" /> {ticket.priority}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
                        <span className="font-medium">
                          #{ticket.contactus_id}
                        </span>
                        <div className="text-right flex items-center gap-x-2.5 leading-tight text-xs">
                          <div>
                            Created:{" "}
                            <span className="font-medium">
                              {getDaysAgo(ticket?.created_at)}
                            </span>
                          </div>
                          {/* <div>
                        Updated:{" "}
                        <span className="font-medium">
                          {getDaysAgo(ticket.updatedAt)}
                        </span>
                      </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </li>
          <li className="">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-sm rounded-lg">
              <h2 className="text-xl font-bold mb-6 text-textPrimary">
                Contact Us
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-sm font-semibold text-title"
                  >
                    Full Name
                  </Label>
                  <Input id="fullName" {...register("fullName")} />
                  {errors.fullName && (
                    <p className="text-xs text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-title"
                    >
                      Email
                    </Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-title"
                    >
                      Phone Number
                    </Label>
                    <div
                      className={`flex items-center gap-2 border rounded-md h-9 px-2 bg-white ${
                        errors.phone && "border-red-500"
                      }`}
                    >
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icons.India className="w-5 h-5" />
                        <span>+91</span>
                      </div>
                      <div className="h-6 w-px bg-border" />
                      <Input
                        id="phone"
                        className="border-none"
                        type="tel"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid  gap-4 w-full">
                  {/* <div className="space-y-2 w-full">
                    <Label htmlFor="issueCategory" className="text-sm font-semibold text-title">Issue Category</Label>
                    <Select
                      onValueChange={(val) => setValue("issueCategory", val)}
                      
                    >
                      <SelectTrigger  className="w-full cursor-pointer">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.issueCategory && (
                      <p className="text-xs text-red-600">
                        {errors.issueCategory.message}
                      </p>
                    )}
                  </div> */}
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="issueType"
                      className="text-sm font-semibold text-title"
                    >
                      Issue Type
                    </Label>
                    <Select
                      defaultValue={watch("issueType")}
                      value={watch("issueType")}
                      onValueChange={(val) => setValue("issueType", val)}
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bug Report">Bug Report</SelectItem>
                        <SelectItem value="Feature Request">
                          Feature Request
                        </SelectItem>
                        <SelectItem value="Payment Gateway Issue">
                          Payment Gateway Issue
                        </SelectItem>

                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.issueType && (
                      <p className="text-xs text-red-600">
                        {errors.issueType.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="attachment"
                    className="text-sm font-semibold text-title"
                  >
                    Attach Image (optional)
                  </Label>

                  <div className="flex items-center gap-4">
                    <Input
                      id="attachment"
                      type="file"
                      accept="image/*"
                      {...register("attachment")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue("attachment", e.target.files);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="w-full cursor-pointer file:bg-primary file:text-white  file:px-4 file:rounded-md file:border-0"
                    />
                  </div>

                  {imagePreview && (
                    <div className="pt-2 flex items-start gap-x-1.5">
                      <img
                        src={imagePreview}
                        alt="Selected"
                        className="h-28 w-28 object-cover rounded-md shadow border"
                      />
                      <div
                        className="rounded-full bg-white shadow-2xl size-4 cursor-pointer"
                        onClick={() => {
                          setImagePreview("");
                          setValue("attachment", "");
                        }}
                      >
                        <X className="text-red-600 w-4" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-title"
                  >
                    Message
                  </Label>
                  <Textarea id="message" {...register("message")} rows={4} />
                  {errors.message && (
                    <p className="text-xs text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button type="submit" className="">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Submit "
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
