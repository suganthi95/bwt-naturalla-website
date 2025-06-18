import { PackageX } from "lucide-react";

export default function NoProducts() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="bg-muted p-6 rounded-full mb-6">
        <PackageX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        No Products Available
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        We couldn’t find any products matching your filters. Try adjusting your search or explore other categories.
      </p>
    </div>
  );
}
