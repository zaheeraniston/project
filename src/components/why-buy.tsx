"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  Infinity,
  Smartphone,
  ShieldCheck,
  Download,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Access",
    desc: "Get access immediately after purchase",
  },
  { icon: Clock, title: "HD Quality", desc: "Crystal clear video quality" },
  {
    icon: Infinity,
    title: "Lifetime Access",
    desc: "Never expires, own it forever",
  },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Watch on any device" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Download, title: "Fast Download", desc: "Download & watch offline" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const easeArr = [0.21, 0.47, 0.32, 0.98] as const;

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeArr } },
};

export function WhyBuy() {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Why <span className="text-gradient-gold">Buy This</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-2 sm:gap-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card group rounded-xl p-3 text-center"
            >
              <div className="from-gold/10 to-purple/10 mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                <f.icon className="text-gold h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h3 className="text-xs font-semibold sm:text-sm">{f.title}</h3>
              <p className="text-muted mt-0.5 text-[10px] leading-relaxed sm:text-xs">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
