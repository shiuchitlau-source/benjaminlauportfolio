"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: "8+", label: "Years Experience" },
  { number: "60+", label: "Projects Delivered" },
  { number: "30+", label: "Brands Served" },
];

const tools = [
  "After Effects",
  "Cinema 4D",
  "Blender",
  "Houdini",
  "Figma",
  "Premiere Pro",
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="border-t border-border bg-secondary px-6 py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl" ref={ref}>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Motion is
              <br />
              my medium.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Based in London, I specialize in motion design that bridges
                the gap between concept and feeling. Every frame is intentional,
                every movement tells a story.
              </p>
              <p>
                From brand animations to experimental 3D pieces, I bring a
                disciplined approach to creative work, always grounding bold
                visuals in strategic thinking and precise execution.
              </p>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-center gap-8"
          >
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-2xl bg-background p-6"
                >
                  <span className="font-display text-3xl font-bold text-primary md:text-4xl">
                    {stat.number}
                  </span>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl bg-background p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Tools & Technologies
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
