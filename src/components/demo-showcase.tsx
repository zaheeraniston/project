"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Maximize2 } from "lucide-react";
import { DemoGallery } from "./demo-gallery";

const images = [
  { src: "/images/demo/bank-8.jfif", label: "Premium Content 1" },
  {
    src: "/images/demo/photo_6222268445303181760_w-473x1024.jpg",
    label: "Premium Content 2",
  },
  {
    src: "/images/demo/photo_6222268445303181766_w-473x1024.jpg",
    label: "Premium Content 3",
  },
  {
    src: "/images/demo/photo_6222268445303181776_w-473x1024.jpg",
    label: "Premium Content 4",
  },
  {
    src: "/images/demo/photo_6222268445303181782_w-473x1024.jpg",
    label: "Premium Content 5",
  },
  {
    src: "/images/demo/photo_6222268445303181785_w-473x1024.jpg",
    label: "Premium Content 6",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const easeArr = [0.21, 0.47, 0.32, 0.98] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easeArr },
  },
};

export function DemoShowcase() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openGallery = (index: number) => {
    setStartIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <DemoGallery
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        startIndex={startIndex}
      />
      <section className="px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 text-center"
          >
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Demo <span className="text-gradient-purple">Previews</span>
            </h2>
            <p className="text-muted mt-1 text-xs sm:text-sm">
              Click any preview to view full gallery
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
          >
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                variants={itemVariants}
                onClick={() => openGallery(i)}
                className="group bg-surface hover:border-gold/20 hover:shadow-gold/5 relative cursor-pointer overflow-hidden rounded-xl border border-white/5 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[9/16]">
                  {/* Image as background for protection */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                  {/* Anti-save overlay */}
                  <div
                    className="absolute inset-0 z-10"
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ WebkitUserSelect: "none", userSelect: "none" }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Hover action buttons */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="bg-gold/80 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-300 hover:scale-110">
                      <Play className="ml-0.5 h-4 w-4 text-black" />
                    </div>
                  </div>

                  {/* Corner zoom icon */}
                  <div className="absolute top-2 right-2 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                  </div>

                  {/* Label at bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-2">
                    <span className="text-[10px] font-medium text-white/80 drop-shadow-lg">
                      {img.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 text-center"
          >
            <button
              onClick={() => openGallery(0)}
              className="text-muted hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
            >
              <Play className="h-3 w-3" />
              View all {images.length} previews in fullscreen
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
