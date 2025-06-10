import { Button } from "@/components/ui/button";
import { Icons } from "@/assets/icons";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function CustomerReview() {
  return (
    <div className="container mx-auto px-4 lg:px-44 py-6">
      <div className=" space-y-6">
        <h2 className="font-bold text-xl text-title">Customer Reviews</h2>

        <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-6 items-start">
          <div className="flex flex-col items-center gap-1">
            <div className="space-y-1.5">
              <div className="flex items-center gap-x-1">
                <Icons.Star className="fill-yellow-500" />
                <Icons.Star className="fill-yellow-500" />
                <Icons.Star className="fill-yellow-500" />
                <Icons.Star className="fill-yellow-500" />
                <p className="font-semibold text-xl">4 out of 5</p>
              </div>
              <p className="text-lead text-center font-medium text-lg">
                (120 overall ratings)
              </p>
            </div>
          </div>

          <div className="space-y-2 col-span-2 px-8 border-l border-r  border-gray-300">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                  {star} star
                </p>
                <div className="relative w-full h-3 bg-gray-200 rounded">
                  <div
                    className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                    style={{ width: `${star * 18}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm text-right text-[#007AFF] ">
                  {star * 18}%
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center items-center  gap-4 w-full  border-gray-300">
            <Button variant="outline" className="w-40">
              View All Reviews
            </Button>
            <Button variant="default" className="w-40">
              Ask a Question
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-bold text-xl text-title">16 Comments</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
        </div>
        <div className="mt-6 space-y-6 grid grid-cols-2 gap-10">
          <div className="border border-gray-200 rounded-lg p-4 space-y-3 ">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm text-title">John Doe</p>
                    <Icons.Tick />
                  </div>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Icons.Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
                <Icons.Star className="w-4 h-4 fill-muted" />
              </div>
            </div>

            <h3 className="font-semibold text-title ">
              Great quality and fast delivery
            </h3>

            <p className="text-lg text-lead">
              The product was exactly as described. Arrived earlier than
              expected and the packaging was very secure.
            </p>
          </div>
             <div className="border border-gray-200 rounded-lg p-4 space-y-3 ">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm text-title">John Doe</p>
                    <Icons.Tick />
                  </div>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Icons.Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
                <Icons.Star className="w-4 h-4 fill-muted" />
              </div>
            </div>

            <h3 className="font-semibold text-title ">
              Great quality and fast delivery
            </h3>

            <p className="text-lg text-lead">
              The product was exactly as described. Arrived earlier than
              expected and the packaging was very secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
