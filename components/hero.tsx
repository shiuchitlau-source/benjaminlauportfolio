"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ViewWorkButton } from "./view-work-button";
import { GetInTouchButton } from "./get-in-touch-button";
import { AnimatedTitle } from "./animated-title";

const Dither = dynamic(() => import("./dither"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-muted/30" aria-hidden />
  ),
});

const line1 = "Pixels With";
const line2 = "Momentum.";

const lineVariant = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Wave color: medium gray, visible on light and dark backgrounds (0-1 RGB)
const WAVE_COLOR: [number, number, number] = [0.45, 0.45, 0.5];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden px-6 pb-20 pt-32 lg:px-8">
      {/* Background animation - dithered waves */}
      <div className="absolute inset-0 z-0 min-h-[90vh] w-full">
        <Dither
          waveColor={WAVE_COLOR}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.075}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground"
        >
          Motion Designer
        </motion.p>

        <h1 className="font-display text-[clamp(2.8rem,8vw,8rem)] font-extrabold leading-[0.95] tracking-tight text-white">
          {[line1, line2].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <AnimatedTitle
                text={line}
                className="block"
                colorClass={i === 1 ? "text-[hsl(20,98%,59%)]" : ""}
              />
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex items-center gap-5"
        >
          <ViewWorkButton />
          <GetInTouchButton />
        </motion.div>
      </div>
    </section>
  );
}
