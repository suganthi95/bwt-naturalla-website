import { ASSETS } from "@/assets/assets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Order_Success() {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto">
      <div className="grid place-items-center mt-7 md:mt-10 mb-10 md:mb-20">
        <img
          src={ASSETS.ORDER_SUCCESS}
          alt="order-success"
          className="w-5/12 md:w-3/12 mb-2"
        />
        <h1 className="font-bold text-xl md:text-2xl mb-4">
          Payment Successful!
        </h1>
        <p className="text-lead font-medium text-sm md:text-base md:w-[80vh] text-center">
          Your payment was received successfully. We’ve started processing your order and will share tracking details shortly.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="mt-6"
        >
          Go to Home
        </Button>

     
      </div>
    </section>
  );
}
