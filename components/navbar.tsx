"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-foreground"
        >
          Benjamin Lau
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {["Work", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {item}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative h-6 w-6 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute left-0 top-1 block h-[1.5px] w-6 bg-foreground transition-all duration-300 ${menuOpen ? "top-[11px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[11px] block h-[1.5px] w-6 bg-foreground transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 top-[21px] block h-[1.5px] w-6 bg-foreground transition-all duration-300 ${menuOpen ? "top-[11px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {["Work", "About", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-bold tracking-tight text-foreground"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
