"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { usePayment } from "@/lib/usePayment";

export function PricingSection() {
  const initiatePayment = usePayment();

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-sm text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="mb-1 text-xl font-bold tracking-tight sm:text-2xl">
            Limited <span className="text-gradient-gold">Offer</span>
          </h2>

          <div className="mb-3 flex items-baseline justify-center gap-2">
            <span className="text-muted text-2xl font-bold line-through sm:text-3xl">
              ₹999
            </span>
            <span className="text-gradient-gold text-4xl font-extrabold sm:text-5xl">
              ₹99
            </span>
          </div>

          <button
            onClick={initiatePayment}
            className="group bg-gradient-gold glow-gold relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 text-base font-bold text-black transition-all duration-300 hover:opacity-90"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buy Now — ₹99 Only
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>

          <div className="text-muted mt-3 flex items-center justify-center gap-2 text-xs">
            <ShieldCheck className="text-gold h-3.5 w-3.5" />
            Secure Payment
          </div>
        </motion.div>
      </div>
    </section>
  );
}
