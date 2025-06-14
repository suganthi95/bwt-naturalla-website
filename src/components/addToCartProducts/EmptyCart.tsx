import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-primary/10 text-primary p-6 rounded-full mb-6"
      >
        <ShoppingCart className="w-10 h-10" />
      </motion.div>

      <h2 className="text-2xl font-bold text-neutral-800">Your Cart is Empty</h2>
      <p className="text-muted-foreground text-sm mt-2 max-w-xs">
        Looks like you haven’t added anything to your cart yet. Start shopping now!
      </p>

      <Button
        className="mt-6"
        onClick={() => navigate("/")}
      >
        Browse Products
      </Button>
    </div>
  );
}
