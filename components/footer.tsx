"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      id="contact"
      className="border-t border-border bg-[#0e0e12] px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[hsl(20,98%,59%)]">
            Get in Touch
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            {"Let's create"}
            <br />
            <span className="text-[hsl(20,98%,59%)]">something bold.</span>
          </h2>
          <a
            href="https://www.linkedin.com/in/ben-shiu-chit-lau/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0e0e12] transition-all duration-300 hover:bg-[hsl(20,98%,59%)] hover:text-white"
          >
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3">
          {/* Location */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Studio Location
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              United Kingdom
            </p>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Follow Along
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/ben-shiu-chit-lau/" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Availability
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="text-sm text-white/70">
                Open for freelance
              </span>
            </div>
            <p className="mt-2 text-sm text-white/50">
              Currently accepting projects for Q2 2026.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="font-display text-lg font-bold tracking-tight text-white">
            Benjamin Lau
          </p>
          <p className="text-xs text-white/30">
            {"© 2026 Benjamin Lau. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
