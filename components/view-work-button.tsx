"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const STRENGTH = 0.12;
const SPRING = { type: "spring" as const, stiffness: 350, damping: 25 };

export function ViewWorkButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const moveX = (e.clientX - centerX) * STRENGTH;
      const moveY = (e.clientY - centerY) * STRENGTH;
      animate(x, moveX, SPRING);
      animate(y, moveY, SPRING);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    animate(x, 0, SPRING);
    animate(y, 0, SPRING);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;

  return (
    <motion.a
      ref={ref}
      href="#work"
      className="group relative inline-block overflow-hidden rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transform }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10 block">View Work</span>
      {isHovered && (
        <motion.span
          className="pointer-events-none absolute inset-0 z-0 w-1/2 skew-x-[-12deg] rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-hidden
        />
      )}
    </motion.a>
  );
}
