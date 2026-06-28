"use client";

import { motion } from "framer-motion";

export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative bg-navy-gradient pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="container relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-white/70 text-base md:text-lg max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
