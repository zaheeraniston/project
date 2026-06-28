"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    name: "Ananya Gupta",
    text: "Bahut badhiya collection hai. Sab videos HD quality mein hain. Paise vasool!",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    text: "50,000+ videos sirf ₹99 mein. Kamaal ka offer hai. Sabko lena chahiye.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    text: "Mujhe bahut maza aaya. Hindi mein sab kuch samajh mein aata hai. Highly recommend!",
    rating: 5,
  },
  {
    name: "Arun Kumar",
    text: "Lifetime access hai toh kabhi bhi dekh sakte hain. Best investment!",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    text: "Payment secure hai aur access instant mil gaya. Best ₹99 ever spent!",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-center"
        >
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Real <span className="text-gradient-gold">Reviews</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                duration: 0.35,
                ease: [0.21, 0.47, 0.32, 0.98] as const,
              }}
              className="glass-card p-5"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} className="fill-gold text-gold h-3.5 w-3.5" />
                ))}
              </div>
              <p className="text-muted text-sm leading-relaxed">
                &ldquo;{reviews[current].text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2.5">
                <div className="from-gold/30 to-purple/30 text-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold">
                  {reviews[current].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="text-sm font-medium">
                  {reviews[current].name}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="text-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/20"
              aria-label="Previous"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-gold w-4"
                      : "w-1.5 bg-white/10 hover:bg-white/20"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="text-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/20"
              aria-label="Next"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
