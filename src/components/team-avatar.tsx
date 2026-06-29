import Image from "next/image";
import { TeamMember } from "@/lib/content";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Shared ring classes — keeps photo and placeholder visually identical in size/border.
const ringClasses =
  "w-24 h-24 rounded-full border-2 border-gold/50 ring-4 ring-gold/10";

export function TeamAvatar({ member }: { member: TeamMember }) {
  if (member.imageUrl) {
    return (
      <div className={`relative overflow-hidden ${ringClasses}`}>
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
    );
  }

  return (
    <div
      className={`bg-navy-gradient flex items-center justify-center ${ringClasses}`}
    >
      <span className="text-gold font-display font-bold text-xl select-none">
        {getInitials(member.name)}
      </span>
    </div>
  );
}
