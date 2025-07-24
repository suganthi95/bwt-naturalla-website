export function TicketCardSkeleton() {
  return (
    <div className="w-full border rounded-xl shadow-sm p-4 space-y-3 bg-white animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

      <div className="flex justify-between items-center text-muted-foreground">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="flex flex-col items-end space-y-1">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
