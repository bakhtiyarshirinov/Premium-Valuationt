"use client";

import { useLocale } from "@/components/locale-provider";
import { StatCounter } from "@/components/stat-counter";
import { SectionReveal } from "@/components/section-reveal";

// NOTE: stats below are placeholder figures provided by the agency brief.
// Client should confirm/replace exact numbers before launch.
export function Stats() {
  const { t } = useLocale();

  return (
    <section className="bg-navy-deep py-14">
      <SectionReveal>
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
