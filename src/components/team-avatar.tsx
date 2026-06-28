import Image from "next/image";
import { User } from "lucide-react";
import { TeamMember } from "@/lib/content";

export function TeamAvatar({ member }: { member: TeamMember }) {
  if (member.imageUrl) {
    return (
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gold/40">
        <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="w-24 h-24 rounded-full bg-navy-gradient border-2 border-gold/40 flex items-center justify-center">
      <User size={36} className="text-gold" />
    </div>
  );
}
