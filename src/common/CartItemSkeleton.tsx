
const CartItemSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 border-b animate-pulse">
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 md:w-28 md:h-24 bg-gray-200 rounded-md" />

        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="h-5 bg-gray-200 rounded w-40 mb-2" />
            <div className="flex items-center gap-1 mt-1">
              <div className="h-3 bg-gray-200 rounded w-12" />
              <span className="text-gray-300">|</span>
              <div className="h-3 bg-gray-200 rounded w-10" />
              <span className="text-gray-300">|</span>
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="h-6 bg-gray-200 rounded w-16" /> {/* Price */}
            <div className="h-4 bg-gray-200 rounded w-14" /> {/* Strike */}
            <div className="h-4 bg-gray-200 rounded w-12" /> {/* % off */}
            <div className="h-6 bg-gray-200 rounded w-48" />
          </div>
        </div>
      </div>

      <div className="grid place-items-start md:place-items-end mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 border px-2 md:px-3 py-1 rounded-lg">
            <div className="w-5 h-5 bg-gray-200 rounded" /> 
            <div className="w-10 h-5 bg-gray-200 rounded" />
            <div className="w-5 h-5 bg-gray-200 rounded" /> 
          </div>
          <div className="w-5 h-5 bg-gray-200 rounded" />
        </div>

        <div className="h-3 bg-gray-200 rounded w-40 mt-2" />
      </div>
    </div>
  );
};

export default CartItemSkeleton;
