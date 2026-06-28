"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { companyInfo } from "@/lib/content";

function Shape({
  className,
  depth,
  mx,
  my,
  children,
}: {
  className: string;
  depth: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
  children?: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 20 });
  const my = useSpring(rawY, { stiffness: 50, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const whatsappHref = `https://wa.me/${companyInfo.whatsappNumber}`;

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-navy-gradient"
    >
      {/* floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Shape
          mx={mx}
          my={my}
          depth={30}
          className="absolute top-[8%] left-[4%] w-16 h-16 md:w-32 md:h-32 rounded-3xl border border-gold/40 bg-gold/10 backdrop-blur-sm animate-float"
        />
        <Shape
          mx={mx}
          my={my}
          depth={-22}
          className="hidden sm:block absolute top-[60%] left-[15%] w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm animate-float-slow"
        />
        <Shape
          mx={mx}
          my={my}
          depth={45}
          className="absolute top-[10%] right-[4%] w-16 h-16 md:w-40 md:h-40 rounded-full border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent backdrop-blur-sm animate-float-slow"
        />
        <Shape
          mx={mx}
          my={my}
          depth={-35}
          className="absolute bottom-[8%] right-[6%] w-14 h-14 md:w-28 md:h-28 rounded-2xl rotate-12 border border-white/25 bg-white/5 backdrop-blur-sm animate-float"
        />
        <Shape
          mx={mx}
          my={my}
          depth={18}
          className="hidden sm:block absolute bottom-[25%] left-[40%] w-12 h-12 rounded-xl border border-gold/40 bg-gold/10 animate-float"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,39,0.08),transparent_60%)]" />
      </div>

      <div className="container relative z-10 pt-32 pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-5"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild variant="gold" size="lg">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              {t.hero.ctaPrimary}
            </a>
          </Button>
          <Button asChild variant="outlineWhite" size="lg">
            <a href="#services">{t.hero.ctaSecondary}</a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs"
      >
        <span>{t.hero.scrollHint}</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
