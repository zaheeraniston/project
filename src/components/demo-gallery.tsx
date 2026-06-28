"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const images = [
  { src: "/images/demo/bank-8.jfif", label: "Demo Preview 1" },
  {
    src: "/images/demo/photo_6222268445303181760_w-473x1024.jpg",
    label: "Demo Preview 2",
  },
  {
    src: "/images/demo/photo_6222268445303181766_w-473x1024.jpg",
    label: "Demo Preview 3",
  },
  {
    src: "/images/demo/photo_6222268445303181776_w-473x1024.jpg",
    label: "Demo Preview 4",
  },
  {
    src: "/images/demo/photo_6222268445303181782_w-473x1024.jpg",
    label: "Demo Preview 5",
  },
  {
    src: "/images/demo/photo_6222268445303181785_w-473x1024.jpg",
    label: "Demo Preview 6",
  },
];

interface DemoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

export function DemoGallery({
  isOpen,
  onClose,
  startIndex = 0,
}: DemoGalleryProps) {
  const [current, setCurrent] = useState(startIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const total = images.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (isOpen) {
      setCurrent(startIndex);
      setIsPlaying(true);
    } else {
      setCurrent(startIndex);
      setIsPlaying(true);
    }
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isPlaying || !isOpen) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, next]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, next, prev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Glass card container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface/80 relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
              aria-label="Close gallery"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Counter */}
            <div className="absolute top-3 left-3 z-20 rounded-lg bg-black/60 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
              {current + 1} / {total}
            </div>

            {/* Image container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[9/16]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Protected image rendered as background-image */}
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[current].src})` }}
                  />
                  {/* Anti-save overlay */}
                  <div
                    className="absolute inset-0 z-10"
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    style={{ WebkitUserSelect: "none", userSelect: "none" }}
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-muted hover:text-foreground flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs transition-all hover:bg-white/10"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-3 w-3" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3" /> Play
                  </>
                )}
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-gold w-5"
                        : "w-1.5 bg-white/10 hover:bg-white/20"
                    }`}
                    aria-label={`Photo ${i + 1}`}
                  />
                ))}
              </div>

              <div className="text-muted text-xs">{images[current].label}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
