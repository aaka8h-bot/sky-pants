import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import CartSidebar from "./cart-sidebar";

export default function FloatingCart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <>
      <motion.div
        className="fixed right-6 bottom-6 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-accent hover:bg-accent/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <ShoppingCart className="h-6 w-6" />
          <motion.span
            className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {totalItems}
          </motion.span>
        </Button>
      </motion.div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
