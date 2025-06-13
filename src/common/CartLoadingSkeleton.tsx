import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartLoadingSkeleton() {
  return (
    <ScrollArea className="space-y-6 p-4 h-screen">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-24 bg-gray-200 rounded-md" />

        <div className="space-y-1.5 mb-4">
          <div className="h-4 w-52 bg-gray-200 rounded-md" />
          <div className="bg-primary/50 h-2 rounded-2xl w-full"></div>
        </div>

        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4 items-start pb-4">
            <div className="w-28 h-36 bg-gray-200 rounded-md" />

            <div className="flex flex-col gap-y-2.5 flex-1">
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded-md" />
                <div className="h-3 w-40 bg-gray-200 rounded-md" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-16 bg-gray-200 rounded-md" />
                  <div className="h-4 w-12 bg-gray-200 rounded-md" />
                  <div className="h-4 w-16 bg-gray-200 rounded-md" />
                </div>
              </div>

              <div className="flex items-center gap-x-1.5">
                <div className="flex items-center gap-2 border w-fit px-4 rounded-lg">
                  <div className="h-6 w-6 bg-gray-200 rounded-md" />
                  <div className="h-6 w-6 bg-gray-200 rounded-md" />
                  <div className="h-6 w-6 bg-gray-200 rounded-md" />
                </div>
                <div className="h-6 w-6 bg-gray-200 rounded-md" />
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-2 text-sm font-medium text-title">
          <div className="h-5 w-32 bg-gray-200 rounded-md" />
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between">
            <div className="h-5 w-20 bg-gray-200 rounded-md" />
            <div className="h-5 w-20 bg-gray-200 rounded-md" />
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-md mt-2" />
        </div>
      </div>
    </ScrollArea>
  );
}
