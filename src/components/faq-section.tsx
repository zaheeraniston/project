"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How will I receive access?",
    a: "Immediately after payment, you will get instant access to all 50,000+ videos. No waiting.",
  },
  {
    q: "How long is access?",
    a: "Lifetime access! One-time payment, enjoy forever. No monthly fees.",
  },
  {
    q: "Can I download?",
    a: "Yes! All videos are available for download. Watch offline anytime.",
  },
  {
    q: "Is payment secure?",
    a: "100% secure payment via UPI gateway. Your details are encrypted and safe.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-center"
        >
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Quick <span className="text-gradient-purple">FAQ</span>
          </h2>
        </motion.div>

        <div className="space-y-1.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass overflow-hidden rounded-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-medium">{faq.q}</span>
                <ChevronDown
                  className={`text-muted h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted px-4 pb-3 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
