"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { DemoGallery } from "@/components/demo-gallery";
import { usePayment } from "@/lib/usePayment";

const easeArr = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: easeArr },
});

export function Hero() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initiatePayment = usePayment();

  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setVideoStarted(true);
    }
  };

  return (
    <>
      <DemoGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
      <section className="relative flex items-center justify-center overflow-hidden px-4 pt-14 pb-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-purple/10 absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[120px]" />
          <div className="bg-gold/5 absolute bottom-1/3 left-1/4 h-[250px] w-[250px] rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-3">
            <span className="border-gold/20 bg-gold/5 inline-flex items-center gap-2 rounded-full border px-3 py-1">
              <span className="bg-gold h-1.5 w-1.5 animate-pulse rounded-full" />
              <span className="text-gold text-[10px] font-medium tracking-wide uppercase">
                Full Viral Hindi Videos
              </span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            Desi Indian Local Viral Video Collection
            <br />
            <span className="text-gradient-gold">50,000+ Videos In Hindi</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-muted mx-auto mt-2 max-w-lg text-sm sm:text-base"
          >
            One Time Payment — Lifetime Enjoyment
          </motion.p>

          {/* Tags */}
          <motion.div
            {...fadeUp(0.25)}
            className="text-muted mt-3 flex items-center justify-center gap-2 text-xs"
          >
            <span className="flex items-center gap-1">
              <span className="bg-gold h-1 w-1 rounded-full" />
              One Time Payment
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              <span className="bg-gold h-1 w-1 rounded-full" />
              Lifetime Enjoyment
            </span>
          </motion.div>

          {/* Video Player */}
          <motion.div {...fadeUp(0.3)} className="mx-auto mt-5 max-w-4xl">
            <div className="group bg-surface glow-gold relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <div className="from-purple/10 via-surface-light to-gold/5 relative aspect-video">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload noremoteplayback"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src="/videos/promo.mp4" type="video/mp4" />
                </video>
                <div
                  className="absolute inset-0 z-10"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ WebkitUserSelect: "none", userSelect: "none" }}
                />
                {/* Play overlay */}
                {!videoStarted && (
                  <div
                    onClick={startVideo}
                    className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/40 transition-all hover:bg-black/50"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-gold/90 flex h-16 w-16 items-center justify-center rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110 sm:h-20 sm:w-20">
                        <Play className="ml-1 h-7 w-7 text-black sm:h-9 sm:w-9" />
                      </div>
                      <span className="font-semibold text-white drop-shadow-lg">
                        Click to play the video
                      </span>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={initiatePayment}
              className="group bg-gradient-gold glow-gold relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-10 py-4 text-base font-bold text-black transition-all duration-300 hover:opacity-90 sm:px-12 sm:py-4 sm:text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                Buy Now ₹99
              </span>
            </button>
            <button
              onClick={() => setGalleryOpen(true)}
              className="group text-foreground relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-10 py-4 text-base font-medium transition-all duration-300 hover:border-white/20 hover:bg-white/10 sm:px-12 sm:py-4 sm:text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Watch Demo
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
