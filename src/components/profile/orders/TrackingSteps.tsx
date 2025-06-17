import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    label: "Received Orders",
    date: "2025-06-15",
    completed: true,
  },
  {
    label: "Orders packed",
    date: "2025-06-16",
    completed: true,
  },
  {
    label: "Shipped",
    date: "2025-06-16",
    completed: true,
  },
  {
    label: "Out for Delivery",
    date: "2025-06-17",
    completed: false,
  },
  {
    label: "Delivered",
    date: null,
    completed: false,
  },
];

const currentStep = 1;

export default function TrackingSteps() {
  return (
    <div className="w-full px-4 py-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div className="flex-1 flex flex-col items-center" key={step.label}>
            {index !== 0 && (
              <div
                className={cn(
                  "absolute top-4 h-1",
                  index === steps.length
                    ? "right-0"
                    : "left-0 right-0",
                  index <= currentStep
                    ? "bg-[#81C55A]"
                    : "bg-muted"
                )}
                style={{
                  left: `${(index - 1) * (100 / (steps.length - 1))}%`,
                  width: `${100 / (steps.length - 1)}%`,
                }}
              />
            )}

            <div
              className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center z-10",
                index <= currentStep
                  ? "bg-[#81C55A] text-white border-[#81C55A]"
                  : "bg-white text-muted-foreground border-muted"
              )}
            >
              {index <= currentStep ? <Check className="w-5 h-5" /> : <div className="size-2 bg-slate-500 rounded-full"></div>}
            </div>

            <span className="font-semibold text-textPrimary mt-2 text-center w-max">{step.label}</span>
            <span className="text-sm text-[#BFBFBF] font-medium">{step.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
