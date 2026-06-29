import { AdminShell } from "@/components/admin/admin-shell";
import { DistrictManager } from "@/components/admin/district-manager";

export default function AdminPricesPage() {
  return (
    <AdminShell>
      <DistrictManager />
    </AdminShell>
  );
}
