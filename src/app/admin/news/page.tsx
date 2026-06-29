import { AdminShell } from "@/components/admin/admin-shell";
import { NewsManager } from "@/components/admin/news-manager";

export default function AdminNewsPage() {
  return (
    <AdminShell>
      <NewsManager />
    </AdminShell>
  );
}
