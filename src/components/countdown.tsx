"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 60 });

  useEffect(() => {
    const target = Date.now() + 1 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const isExpired = timeLeft.minutes === 0 && timeLeft.seconds === 0;
  if (isExpired) return null;

  const units = [
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <section className="px-4 py-4">
      <div className="mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-4 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-red-400" />
            <span className="text-xs font-bold tracking-wide text-red-400 uppercase">
              Offer Ends At
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-4xl font-black text-red-500 tabular-nums drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] sm:text-5xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 text-[10px] font-semibold tracking-widest text-red-400/70 uppercase">
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="mt-[-1.5rem] text-3xl font-bold text-red-500/50 sm:text-4xl">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] font-medium text-red-400/60">
            Hurry! Limited time offer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
