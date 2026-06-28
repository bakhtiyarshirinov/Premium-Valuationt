"use client";

import CountUp from "react-countup";

export function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold tabular-nums">
        <CountUp
          end={value}
          duration={2.2}
          enableScrollSpy
          scrollSpyOnce
          scrollSpyDelay={100}
        />
        {suffix}
      </div>
      <p className="mt-2 text-sm md:text-base text-white/80 font-medium">{label}</p>
    </div>
  );
}
