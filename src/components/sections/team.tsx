"use client";

import { useLocale } from "@/components/locale-provider";
import { GlassCard } from "@/components/glass-card";
import { TeamAvatar } from "@/components/team-avatar";
import { SectionReveal, StaggerGroup, StaggerItem } from "@/components/section-reveal";

export function Team() {
  const { t } = useLocale();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container">
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-3">
            {t.team.eyebrow}
          </p>
          <h2 className="font-display font-bold text-navy text-3xl md:text-4xl lg:text-5xl">
            {t.team.title}
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg">{t.team.subtitle}</p>
        </SectionReveal>

        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {t.team.members.map((member) => (
            <StaggerItem key={member.id}>
              <GlassCard className="h-full flex flex-col items-center text-center">
                <TeamAvatar member={member} />
                <h3 className="font-display text-lg font-semibold text-navy mt-5">
                  {member.name}
                </h3>
                <p className="text-gold text-sm font-medium mt-1">{member.role}</p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
