"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  AlertCircle,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface PaymentContextType {
  initiatePayment: (amount?: number) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}

interface PaymentProviderProps {
  children: React.ReactNode;
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(99);

  // Payment processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processError, setProcessError] = useState<string | null>(null);

  const steps = [
    "Generating Unique Order ID...",
    "Securing Connection with Gateway...",
    "Launching UPI Apps & Redirecting...",
  ];

  // Reset state on close
  const handleClose = () => {
    if (isProcessing) return; // Prevent closing while transaction is in flight
    setIsOpen(false);
    setIsProcessing(false);
    setCurrentStep(0);
    setProcessError(null);
  };

  // Auto-start payment as soon as modal opens
  useEffect(() => {
    if (isOpen && !isProcessing && !processError) {
      startPayment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const initiatePayment = (price = 99) => {
    setAmount(price);
    setIsProcessing(false);
    setCurrentStep(0);
    setProcessError(null);
    setIsOpen(true);
  };

  // Run progress animations when processing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing && currentStep < steps.length - 1 && !processError) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isProcessing, currentStep, steps.length, processError]);

  const startPayment = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setProcessError(null);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (data.success && data.payment_url) {
        // Wait a brief moment to finish the redirect animation transition
        setTimeout(() => {
          window.location.href = data.payment_url;
        }, 1000);
      } else {
        setProcessError(data.error || "Payment initiation failed. Please try again.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setProcessError("Connection lost. Please check your internet and retry.");
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider value={{ initiatePayment }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl shadow-gold/10"
            >
              {/* Top ambient glow */}
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-gold/10 blur-[50px]" />

              {/* Header Badge */}
              <div className="border-b border-white/[0.06] px-6 pt-6 pb-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gold/80 uppercase">
                  <Lock className="h-3 w-3 text-gold" />
                  Secure 256-Bit SSL Checkout
                </div>
              </div>

              {/* Product Info Section */}
              <div className="bg-white/[0.02] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      Viral Video Bundle
                      <Sparkles className="h-4 w-4 text-gold animate-pulse" />
                    </h3>
                    <p className="text-muted mt-1 text-xs">
                      50,000+ HD Videos + Lifetime Access
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-muted text-sm line-through">₹999</span>
                      <span className="text-gradient-gold text-xl font-black">₹{amount}</span>
                    </div>
                    <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                      90% OFF
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/[0.04] pt-3 text-[11px] text-muted">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Instant Setup
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    Telegram Link Included
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    No Monthly Fees
                  </span>
                </div>
              </div>

              {/* Main Content Pane */}
              <div className="relative p-6">
                {/* Error Banner */}
                {processError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300"
                  >
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-400" />
                    <div className="flex-1">
                      <p className="font-semibold">Payment failed</p>
                      <p className="mt-0.5 opacity-90">{processError}</p>
                    </div>
                  </motion.div>
                )}

                {/* Processing / Retry State */}
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-gold/10" />
                      <Loader2 className="h-10 w-10 animate-spin text-gold" />
                    </div>

                    <h4 className="text-base font-bold text-white">Processing Secure Payment</h4>
                    <p className="text-muted mt-1 text-xs">Please do not refresh or close this window.</p>

                    {/* Stepper Status */}
                    <div className="mt-6 w-full max-w-xs space-y-3.5 text-left">
                      {steps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 transition-opacity duration-300 ${
                            idx === currentStep
                              ? "opacity-100 font-medium"
                              : idx < currentStep
                              ? "opacity-50"
                              : "opacity-35"
                          }`}
                        >
                          {idx < currentStep ? (
                            <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-400" />
                          ) : idx === currentStep ? (
                            <Loader2 className="h-4.5 w-4.5 shrink-0 animate-spin text-gold" />
                          ) : (
                            <div className="h-4.5 w-4.5 shrink-0 rounded-full border border-white/20" />
                          )}
                          <span className="text-[11px] text-white/90">{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Secured lock footer */}
                    <div className="text-muted mt-8 flex items-center justify-center gap-1.5 text-[10px]">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                      SSL Encryption Activated
                    </div>
                  </div>
                ) : processError ? (
                  /* Retry Button shown after error */
                  <div className="mt-2 space-y-3">
                    <button
                      onClick={startPayment}
                      className="group bg-gradient-gold glow-gold relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-bold text-black transition-all duration-300 hover:opacity-90 active:scale-[0.99]"
                    >
                      <ShieldCheck className="h-4.5 w-4.5 text-black transition-transform group-hover:scale-110" />
                      Retry Payment ₹{amount}
                    </button>
                    <div className="text-muted flex items-center justify-center gap-1.5 text-[10px]">
                      <span>🔒 Secured by SSL</span>
                      <span>•</span>
                      <span>UPI & Cards Accepted</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PaymentContext.Provider>
  );
}
