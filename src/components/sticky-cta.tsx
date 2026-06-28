"use client";

import { motion } from "framer-motion";
import { usePayment } from "@/lib/usePayment";

export function StickyCTA() {
  const initiatePayment = usePayment();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 p-3 md:hidden"
    >
      <button
        onClick={initiatePayment}
        className="bg-gradient-gold glow-gold w-full rounded-xl px-6 py-3 text-sm font-bold text-black transition-all hover:opacity-90"
      >
        Buy Now — ₹99 Only
      </button>
    </motion.div>
  );
}
