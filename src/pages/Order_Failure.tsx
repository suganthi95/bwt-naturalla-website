import { ASSETS } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Order_Failure() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto">
      <div className="grid place-items-center mt-7 md:mt-10 mb-10 md:mb-20">
        <img
          src={ASSETS.ORDER_FAILURE}
          alt="order-failure"
          className="w-5/12 md:w-3/12 mb-2"
        />

        <h1 className="font-bold text-xl md:text-2xl mb-4">Payment Failed!</h1>
        <p className="text-lead font-medium text-sm md:text-base md:w-[80vh] text-center">
          Something went wrong and your payment couldn’t be completed.
          Please try again or use a different payment method.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="mt-6"
          variant="destructive"
        >
          Go to Home
        </Button>

        
      </div>
    </section>
  );
}
