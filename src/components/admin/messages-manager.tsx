"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, AlertCircle, RefreshCw, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactSubmission } from "@/lib/contact-store";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageCard({ sub }: { sub: ContactSubmission }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg overflow-hidden">
      {/* Summary row */}
      <button
        className="w-full px-6 py-4 flex items-center gap-4 hover:bg-offwhite/60 transition-colors text-left"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="w-9 h-9 rounded-xl bg-navy-gradient flex items-center justify-center shrink-0">
          <Mail size={16} className="text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink text-sm">{sub.name}</p>
          <p className="text-muted text-xs truncate">{sub.phone}{sub.email ? ` · ${sub.email}` : ""}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-muted">{formatDate(sub.submittedAt)}</p>
          {sub.service && (
            <span className="inline-block mt-1 text-xs bg-gold/15 text-navy font-medium px-2 py-0.5 rounded-full">
              {sub.service}
            </span>
          )}
        </div>
        {expanded ? <ChevronUp size={16} className="text-muted shrink-0" /> : <ChevronDown size={16} className="text-muted shrink-0" />}
      </button>

      {/* Detail */}
      {expanded && (
        <div className="px-6 pb-5 pt-1 border-t border-navy/5 space-y-3">
          <Row label="Имя" value={sub.name} />
          <Row label="Телефон" value={<a href={`tel:${sub.phone}`} className="text-navy hover:text-gold">{sub.phone}</a>} />
          {sub.email && <Row label="Email" value={<a href={`mailto:${sub.email}`} className="text-navy hover:text-gold">{sub.email}</a>} />}
          {sub.service && <Row label="Услуга" value={sub.service} />}
          {sub.message && <Row label="Сообщение" value={sub.message} multiline />}
          <Row label="Язык" value={sub.locale === "az" ? "Azərbaycan" : "Русский"} />
          <Row label="Дата" value={formatDate(sub.submittedAt)} />
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: React.ReactNode;
  multiline?: boolean;
}) {
  return (
    <div className={multiline ? "flex flex-col gap-1" : "flex gap-3 items-start"}>
      <span className="text-xs font-semibold text-muted uppercase tracking-wide shrink-0 w-24">
        {label}
      </span>
      <span className={`text-sm text-ink ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""}`}>
        {value}
      </span>
    </div>
  );
}

export function MessagesManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error();
      setSubmissions(await res.json());
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-navy text-xl">Обращения с формы</h2>
          <p className="text-muted text-sm mt-0.5">
            {submissions.length > 0
              ? `${submissions.length} сообщени${submissions.length === 1 ? "е" : submissions.length < 5 ? "я" : "й"}`
              : "Нет сообщений"}
          </p>
        </div>
        <button onClick={load} className="text-muted hover:text-navy transition-colors p-2" title="Обновить">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-muted gap-2">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Загружаем сообщения...</span>
        </div>
      )}

      {fetchError && (
        <div className="flex flex-col items-center py-16 gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <p className="text-sm text-muted">Ошибка загрузки</p>
          <Button variant="outline" size="sm" onClick={load}>Повторить</Button>
        </div>
      )}

      {!loading && !fetchError && submissions.length === 0 && (
        <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg p-16 text-center">
          <Mail size={32} className="text-muted mx-auto mb-3" />
          <p className="text-muted text-sm">Пока нет ни одного обращения.</p>
          <p className="text-muted text-xs mt-1">Они появятся здесь, когда пользователи заполнят форму на странице Əlaqə.</p>
        </div>
      )}

      {!loading && !fetchError && submissions.length > 0 && (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <MessageCard key={sub.id} sub={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
