import { ASSETS } from "@/assets/assets";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

import TrackingSteps from "./TrackingSteps";
export default function OrderDetails() {
  const data = [
    {
      date: "2025-06-17",
      time: "10:00 AM",
      description: "Order #1234 Delivered",
      location: "Chennai, India",
    },
    {
      date: "2025-06-16",
      time: "3:45 PM",
      description: "Payment Received",
      location: "Thanjavur, India",
    },
    {
      date: "2025-06-15",
      time: "9:00 AM",
      description: "Order #1234 Shipped",
      location: "Bangalore, India",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <li className="border rounded-xl p-4 flex items-start gap-4">
          <img
            src={ASSETS.PRODUCT1}
            className="w-52 h-48 object-cover"
            alt="product"
          />
          <div className="space-y-2 flex-1">
            <h3 className="font-semibold text-xl">Red Wine Face Wash</h3>
            <div className="text-sm text-textPrimary space-y-1">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-semibold">#192847</span>
              </div>
              <div className="flex justify-between">
                <span>Brand</span>
                <span className="font-semibold">Naturella</span>
              </div>
              <div className="flex justify-between">
                <span>Order Placed On</span>
                <span className="font-semibold">15 June 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-semibold">BHIM UPI</span>
              </div>
            </div>
          </div>
        </li>

        {/* Billing Summary */}
        <li className="border rounded-xl p-4 text-sm font-medium text-title space-y-3">
          <h3 className="text-base font-semibold">Billing Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-semibold">₹699</span>
          </div>
          <div className="flex justify-between items-start text-muted-foreground">
            <p className="flex flex-col leading-tight">
              <span className="text-foreground font-medium">Tax</span>
              <span className="text-xs">Inclusive of 18% tax</span>
            </p>
            <span className="text-foreground font-semibold">₹40</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-destructive">-₹30</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">₹50</span>
          </div>
          <div className="flex justify-between font-semibold text-base">
            <span>Grand Total</span>
            <span className="text-[#0B130B] font-bold">₹400</span>
          </div>
        </li>
      </ul>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <li className="border rounded-xl p-4">
          <h3 className="font-semibold text-sm text-title mb-2">
            Shipping Address
          </h3>
          <p className="text-[15px]">
            No 40, Vandikara St, Near Railway Station Rd, Thanjavur, Tamil Nadu
            - 613001.
          </p>
        </li>
        <li className="border rounded-xl p-4">
          <h3 className="font-semibold text-sm text-title mb-2">
            Payment Method
          </h3>
          <p className="text-[15px]">
            Pay on Delivery (Cash/Card). COD available. Card/Net banking
            acceptance subject to device availability.
          </p>
        </li>
        <li className="border rounded-xl p-4">
          <h3 className="font-semibold text-sm text-title mb-2">
            Expected Delivery Date
          </h3>
          <p className="text-xl font-semibold text-[#81C55A]">20 June 2025</p>
        </li>
      </ul>
   
      <TrackingSteps/>
      <Table className="border rounded-xl  p-4">
        <TableHeader className="bg-[#F7F7F7]">
          <TableRow className="text-textPrimary font-semibold text-[17px]">
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[150px]">Time</TableHead>
            <TableHead className="w-[150px]">Description</TableHead>
            <TableHead className="w-[100px]">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className="font-medium text-[#171925] text-[15px]"
            >
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
