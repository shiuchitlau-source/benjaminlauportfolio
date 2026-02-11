"use client";

import { motion } from "framer-motion";
import { ViewWorkButton } from "./view-work-button";
import { AnimatedTitle } from "./animated-title";

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

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-end px-6 pb-20 pt-32 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="mb-8 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground"
        >
          Motion Designer
        </motion.p>

        <h1 className="font-display text-[clamp(2.8rem,8vw,8rem)] font-extrabold leading-[0.95] tracking-tight">
          {[line1, line2].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <AnimatedTitle
                text={line}
                className="block"
                colorClass={i === 1 ? "text-primary" : ""}
              />
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Crafting bold, immersive motion experiences that bring brands to life
          through animation, 3D, and visual storytelling.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex items-center gap-5"
        >
          <ViewWorkButton />
          <a
            href="#contact"
            className="rounded-full border border-foreground/20 px-8 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
