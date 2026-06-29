import { AdminShell } from "@/components/admin/admin-shell";
import { MessagesManager } from "@/components/admin/messages-manager";

export default function AdminMessagesPage() {
  return (
    <AdminShell>
      <MessagesManager />
    </AdminShell>
  );
}
