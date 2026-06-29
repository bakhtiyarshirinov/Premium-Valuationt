"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Loader2, AlertCircle, LogOut, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Login form ───────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error ?? "Неверный пароль");
      }
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-navy/5 shadow-navy-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-navy-gradient flex items-center justify-center">
            <LayoutGrid size={18} className="text-gold" />
          </div>
          <div>
            <h1 className="font-display font-bold text-navy text-lg leading-tight">Панель управления</h1>
            <p className="text-muted text-xs">Premium Qiymətləndirmə</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-pw">Пароль</Label>
            <Input
              id="admin-pw"
              type="password"
              placeholder="Введите ADMIN_PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle size={12} /> {error}
            </p>
          )}

          <Button type="submit" variant="navy" size="lg" className="w-full" disabled={loading}>
            {loading && <Loader2 size={16} className="animate-spin" />}
            Войти
          </Button>
        </form>

        <p className="text-xs text-muted mt-5 text-center leading-relaxed">
          Пароль задаётся через переменную окружения{" "}
          <code className="bg-offwhite px-1 rounded text-navy">ADMIN_PASSWORD</code>
        </p>
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/admin/prices",   label: "Цены по районам" },
  { href: "/admin/messages", label: "Сообщения" },
  { href: "/admin/news",     label: "Новости" },
];

function AdminHeader({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <header className="bg-navy-gradient text-white">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <LayoutGrid size={15} className="text-gold" />
          </div>
          <span className="font-display font-bold text-sm">Premium Admin</span>
        </div>
        <Button variant="outlineWhite" size="sm" onClick={onLogout}>
          <LogOut size={14} />
          Выйти
        </Button>
      </div>

      <nav className="px-6 flex gap-1 pb-0">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                active
                  ? "bg-offwhite text-navy"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [authed, setAuthed] = useState<boolean | null>(null);

  // Probe auth via lightweight ping endpoint (no DB required)
  useEffect(() => {
    fetch("/api/admin/ping")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <Loader2 size={28} className="animate-spin text-navy" />
      </div>
    );
  }

  if (!authed) {
    return <LoginForm onSuccess={() => setAuthed(true)} />;
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <AdminHeader onLogout={handleLogout} />
      <main className="container py-10 max-w-5xl">{children}</main>
    </div>
  );
}
