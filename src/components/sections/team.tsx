"use client";

import { Crown } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
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

        {/* flex-wrap + justify-center centres the orphaned last row regardless of count */}
        <StaggerGroup className="flex flex-wrap justify-center gap-7">
          {t.team.members.map((member) => (
            <StaggerItem
              key={member.id}
              className="w-full sm:w-[calc(50%-14px)] lg:w-[calc(25%-21px)]"
            >
              <div className="team-card rounded-3xl p-7 flex flex-col items-center text-center h-full">
                <TeamAvatar member={member} />

                {/* gold divider separates avatar from text */}
                <div className="w-10 h-px bg-gold/40 mt-5 mb-4" />

                <h3 className="font-display text-lg font-semibold text-navy leading-snug">
                  {member.name}
                </h3>

                <p className="text-gold text-sm font-medium mt-1.5 flex items-center justify-center gap-1.5">
                  {member.id === "edalat-shirinov" && (
                    <Crown size={13} className="text-gold/70 shrink-0" />
                  )}
                  {member.role}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
