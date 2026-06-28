import { Home, Truck, Briefcase, ShieldAlert, Gem, LucideProps } from "lucide-react";
import { ServiceContent } from "@/lib/content";

const map: Record<ServiceContent["icon"], React.ComponentType<LucideProps>> = {
  home: Home,
  truck: Truck,
  briefcase: Briefcase,
  "shield-alert": ShieldAlert,
  gem: Gem,
};

export function ServiceIcon({ icon, ...props }: { icon: ServiceContent["icon"] } & LucideProps) {
  const Icon = map[icon];
  return <Icon {...props} />;
}
