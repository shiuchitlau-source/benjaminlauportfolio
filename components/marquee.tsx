"use client";

export function Marquee() {
  const items = [
    "Motion Design",
    "3D Animation",
    "Visual Storytelling",
    "Brand Identity",
    "Kinetic Typography",
    "Art Direction",
  ];

  return (
    <div className="overflow-hidden border-y border-border py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-10 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground/60"
          >
            {item}
            <span className="ml-10 text-primary/40">{"\u2022"}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
