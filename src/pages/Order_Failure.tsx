import { ASSETS } from "@/assets/assets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Order_Failure() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <section className="container mx-auto">
      <div className="grid place-items-center  mt-7 md:mt-10 mb-10 md:mb-20">
        <img
          src={ASSETS.ORDER_FAILURE}
          alt="order-sucess"
          className="w-5/12 md:w-3/12 mb-2"
        />

        <h1 className="font-bold text-xl md:text-2xl mb-4">Payment Failed !</h1>
        <p className="text-lead font-medium  text-sm md:text-base md:w-[80vh] text-center">
          Something went wrong and your payment couldn{"’"}t be completed.
          Please try again or use a different payment method.
        </p>
        <div className="flex gap-2 mt-6">
          <span className="w-3 h-3 bg-neutral-800 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 bg-neutral-800 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 bg-neutral-800 rounded-full animate-bounce"></span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Redirecting to homepage...
        </p>
      </div>
    </section>
  );
}
