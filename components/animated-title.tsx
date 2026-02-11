"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedTitleProps {
  text: string;
  className?: string;
  colorClass?: string;
}

export function AnimatedTitle({
  text,
  className = "",
  colorClass = "",
}: AnimatedTitleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const characters = text.split("");

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
    >
      {characters.map((char, index) => {
        if (char === " ") {
          return <span key={`space-${index}`} className="inline-block w-[0.2em]" />;
        }

        return (
          <CharSpan
            key={`char-${index}`}
            char={char}
            index={index}
            colorClass={colorClass}
            mousePosition={mousePosition}
            isHovered={isHovered}
          />
        );
      })}
    </span>
  );
}

interface CharSpanProps {
  char: string;
  index: number;
  colorClass: string;
  mousePosition: { x: number; y: number };
  isHovered: boolean;
}

function CharSpan({
  char,
  index,
  colorClass,
  mousePosition,
  isHovered,
}: CharSpanProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isHovered || !elementRef.current) {
      x.set(0);
      y.set(0);
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const parentRect = elementRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const centerX = rect.left + rect.width / 2 - parentRect.left;
    const centerY = rect.top + rect.height / 2 - parentRect.top;

    const distance = Math.sqrt(
      Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
    );

    const maxDistance = 80;
    const intensity = Math.max(0, 1 - distance / maxDistance);

    const offsetX = (mousePosition.x - centerX) * 0.15 * intensity;
    const offsetY = (mousePosition.y - centerY) * 0.15 * intensity;

    x.set(offsetX);
    y.set(offsetY);
  }, [mousePosition, isHovered, x, y]);

  return (
    <motion.span
      ref={elementRef}
      className={`inline-block ${colorClass}`}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {char}
    </motion.span>
  );
}
