"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  ExternalLink,
  Check,
  Receipt,
  Shield,
  Clock,
} from "lucide-react";
import { PAYMENT_CONFIG } from "@/lib/config";

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const orderId = searchParams.get("order_id") ?? "—";
  const transactionId = searchParams.get("transaction_id") ?? "—";
  const status = searchParams.get("status") ?? "success";
  const amount = searchParams.get("amount") ?? "99";

  const invoiceId = useMemo(() => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `INV-${timestamp}-${random}`;
  }, []);

  const timestamp = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(null), 2000);
      return () => clearTimeout(t);
    }
  }, [copied]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
  };

  if (status !== "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <span className="text-3xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-red-400">Payment Failed</h1>
          <p className="text-muted mt-2">Please try again later.</p>
        </motion.div>
      </div>
    );
  }

  const ease = [0.21, 0.47, 0.32, 0.98] as const;
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  const successRing = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 0.8, delay: 0.3, ease: "easeInOut" as const },
    },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[150px]" />
        <div className="bg-gold/5 absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full blur-[100px]" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 w-full max-w-md">
        {/* Success Icon */}
        <motion.div {...fadeUp(0)} className="mb-5 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.4,
            }}
            className="mx-auto mb-4 flex h-22 w-22 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-500/30 sm:h-24 sm:w-24"
          >
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial="hidden"
              animate="visible"
              variants={successRing}
            >
              <motion.path
                d="M20 6L9 17L4 12"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: {
                    pathLength: 1,
                    transition: { duration: 0.6, delay: 0.7 },
                  },
                }}
              />
            </motion.svg>
          </motion.div>

          <motion.h1
            {...fadeUp(0.3)}
            className="bg-gradient-to-r from-emerald-300 via-white to-emerald-300 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl"
          >
            Payment Successful!
          </motion.h1>
          <motion.p {...fadeUp(0.4)} className="text-muted mt-1 text-sm">
            Thank you for your purchase
          </motion.p>
        </motion.div>

        {/* Invoice Card */}
        <motion.div
          {...fadeUp(0.5)}
          className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-emerald-500/5" />

          {/* Receipt Header */}
          <div className="relative border-b border-white/[0.06] px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
                  <Receipt className="h-4.5 w-4.5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Invoice</p>
                  <p className="text-muted text-[11px]">{invoiceId}</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <Shield className="h-3 w-3" />
                  Paid
                </span>
              </motion.div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="relative space-y-0.5 px-6 py-4">
            {/* Order ID */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10">
                  <span className="text-[10px] font-bold text-emerald-400">
                    #
                  </span>
                </div>
                <div>
                  <p className="text-muted text-[11px] font-medium tracking-wider uppercase">
                    Order ID
                  </p>
                  <p className="font-mono text-sm font-medium text-white/90">
                    {orderId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(orderId, "order")}
                className="text-muted flex h-7 w-7 items-center justify-center rounded-md opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white"
              >
                {copied === "order" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </motion.div>

            {/* Transaction ID */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95, duration: 0.4 }}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/10">
                  <span className="text-[10px] font-bold text-blue-400">↔</span>
                </div>
                <div>
                  <p className="text-muted text-[11px] font-medium tracking-wider uppercase">
                    Transaction ID
                  </p>
                  <p className="font-mono text-sm font-medium text-white/90">
                    {transactionId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(transactionId, "txn")}
                className="text-muted flex h-7 w-7 items-center justify-center rounded-md opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white"
              >
                {copied === "txn" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </motion.div>

            {/* Timestamp */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
            >
              <div className="bg-gold/10 flex h-7 w-7 items-center justify-center rounded-md">
                <Clock className="text-gold h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-muted text-[11px] font-medium tracking-wider uppercase">
                  Date & Time
                </p>
                <p className="text-sm font-medium text-white/80">{timestamp}</p>
              </div>
            </motion.div>
          </div>

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="border-t border-white/[0.06] px-6 pt-4 pb-6"
          >
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-500/[0.07] to-transparent px-4 py-3">
              <span className="text-sm font-semibold text-white/80">
                Total Paid
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-emerald-400/60">INR</span>
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.6, type: "spring", stiffness: 150 }}
                  className="text-2xl font-extrabold text-white"
                >
                  ₹{amount}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Animated Progress Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="to-gold/30 absolute right-0 bottom-0 left-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-emerald-400/30 via-emerald-400/10"
          />
        </motion.div>

        {/* Actions */}
        <motion.div {...fadeUp(0.8)} className="mt-5 flex flex-col gap-3">
          <motion.a
            href={PAYMENT_CONFIG.TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group from-gold to-gold/90 shadow-gold/20 hover:shadow-gold/30 relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r px-6 py-3.5 font-bold text-black shadow-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-base">
              Go to link
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </motion.a>


        </motion.div>

        {/* Footer */}
        <motion.p
          {...fadeUp(1)}
          className="text-muted mt-6 text-center text-xs"
        >
          Need help?{" "}
          <a
            href={PAYMENT_CONFIG.TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-400 underline underline-offset-2 transition-colors hover:text-emerald-300"
          >
            Contact Support
          </a>
        </motion.p>

        {/* Watermark */}
        <motion.p
          {...fadeUp(1.1)}
          className="text-muted mt-4 text-center text-[10px] tracking-widest uppercase"
        >
          Viral Video Bundle
        </motion.p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-emerald-400" />
            <p className="text-muted text-xs">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
