"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Pencil, Trash2, Plus, Check, X, Loader2, AlertCircle, RefreshCw, Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { DbNewsPost } from "@/lib/news-store";

// ─── News form ────────────────────────────────────────────────────────────────

interface NewsFormValues {
  titleAz: string;
  titleRu: string;
  excerptAz: string;
  excerptRu: string;
  bodyAz: string;
  bodyRu: string;
  publishedAt: string;
}

const emptyNews: NewsFormValues = {
  titleAz: "", titleRu: "",
  excerptAz: "", excerptRu: "",
  bodyAz: "", bodyRu: "",
  publishedAt: new Date().toISOString().slice(0, 10),
};

function NewsForm({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: NewsFormValues;
  onSave: (v: NewsFormValues) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [v, setV] = useState<NewsFormValues>(initial ?? emptyNews);
  const [err, setErr] = useState("");

  function set(key: keyof NewsFormValues, value: string) {
    setV((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!v.titleAz.trim() || !v.titleRu.trim() || !v.excerptAz.trim() ||
        !v.excerptRu.trim() || !v.bodyAz.trim() || !v.bodyRu.trim() || !v.publishedAt) {
      setErr("Заполните все поля");
      return;
    }
    setErr("");
    onSave(v);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Дата публикации *</Label>
          <Input type="date" value={v.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Заголовок (AZ) *</Label>
          <Input placeholder="Əmlak bazarında son tendensiyalar..." value={v.titleAz} onChange={(e) => set("titleAz", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Заголовок (RU) *</Label>
          <Input placeholder="Последние тенденции на рынке недвижимости..." value={v.titleRu} onChange={(e) => set("titleRu", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Краткое описание (AZ) *</Label>
          <Textarea rows={2} placeholder="Qısa xülasə..." value={v.excerptAz} onChange={(e) => set("excerptAz", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Краткое описание (RU) *</Label>
          <Textarea rows={2} placeholder="Краткое описание..." value={v.excerptRu} onChange={(e) => set("excerptRu", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">
            Текст статьи (AZ) * <span className="text-muted font-normal normal-case">— абзацы разделяйте пустой строкой</span>
          </Label>
          <Textarea rows={8} placeholder="Birinci abzas..." value={v.bodyAz} onChange={(e) => set("bodyAz", e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">
            Текст статьи (RU) * <span className="text-muted font-normal normal-case">— абзацы разделяйте пустой строкой</span>
          </Label>
          <Textarea rows={8} placeholder="Первый абзац..." value={v.bodyRu} onChange={(e) => set("bodyRu", e.target.value)} />
        </div>
      </div>

      {err && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} /> {err}
        </p>
      )}

      <div className="flex gap-2">
        <Button variant="navy" size="sm" onClick={handleSave} disabled={loading}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          Сохранить
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={loading}>
          <X size={14} /> Отмена
        </Button>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

function toFormValues(post: DbNewsPost): NewsFormValues {
  return {
    titleAz: post.titleAz, titleRu: post.titleRu,
    excerptAz: post.excerptAz, excerptRu: post.excerptRu,
    bodyAz: post.bodyAz, bodyRu: post.bodyRu,
    publishedAt: post.publishedAt,
  };
}

// ─── Main manager ─────────────────────────────────────────────────────────────

export function NewsManager() {
  const [posts, setPosts] = useState<DbNewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [savingId, setSavingId] = useState<number | "new" | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch("/api/admin/news");
      if (!res.ok) throw new Error();
      setPosts(await res.json());
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd(values: NewsFormValues) {
    setSavingId("new");
    await fetch("/api/admin/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setAddingNew(false);
    setSavingId(null);
    load();
  }

  async function handleEdit(post: DbNewsPost, values: NewsFormValues) {
    setSavingId(post.id);
    await fetch("/api/admin/news", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, ...values }),
    });
    setEditingId(null);
    setSavingId(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Удалить эту новость?")) return;
    setSavingId(id);
    await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
    setSavingId(null);
    load();
  }

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-navy">Добавить новость</h2>
          {!addingNew && (
            <Button variant="gold" size="sm" onClick={() => setAddingNew(true)}>
              <Plus size={14} /> Добавить
            </Button>
          )}
        </div>
        {addingNew ? (
          <NewsForm onSave={handleAdd} onCancel={() => setAddingNew(false)} loading={savingId === "new"} />
        ) : (
          <p className="text-sm text-muted">Нажмите «Добавить», чтобы создать новую статью.</p>
        )}
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy/5">
          <h2 className="font-semibold text-navy">Новости ({posts.length})</h2>
          <button onClick={load} className="text-muted hover:text-navy transition-colors" title="Обновить">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-muted gap-2">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Загружаем новости...</span>
          </div>
        )}
        {fetchError && (
          <div className="flex flex-col items-center py-12 gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-sm text-muted">Ошибка загрузки</p>
            <Button variant="outline" size="sm" onClick={load}>Повторить</Button>
          </div>
        )}
        {!loading && !fetchError && posts.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <Newspaper size={32} className="text-muted" />
            <p className="text-sm text-muted">Нет новостей. Добавьте первую выше.</p>
          </div>
        )}

        {!loading && !fetchError && posts.length > 0 && (
          <div className="divide-y divide-navy/5">
            {posts.map((post) => (
              <div key={post.id}>
                {editingId === post.id ? (
                  <div className="px-6 py-5">
                    <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-4">
                      Редактирование: {post.titleRu}
                    </p>
                    <NewsForm
                      initial={toFormValues(post)}
                      onSave={(values) => handleEdit(post, values)}
                      onCancel={() => setEditingId(null)}
                      loading={savingId === post.id}
                    />
                  </div>
                ) : (
                  <div className="px-6 py-4 flex items-start gap-4 hover:bg-offwhite/60 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0 mt-0.5">
                      <Newspaper size={18} className="text-navy/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink text-sm leading-snug">{post.titleRu}</p>
                      <p className="text-muted text-xs mt-0.5 truncate">{post.excerptRu}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-muted">{formatDate(post.publishedAt)}</span>
                        <span className="text-xs text-muted/50">/xeberler/{post.slug}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingId(post.id)}
                        disabled={!!savingId}
                        className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors"
                        title="Редактировать"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={savingId === post.id}
                        className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Удалить"
                      >
                        {savingId === post.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-muted text-center">
        Новости публикуются на странице <code className="bg-white px-1 rounded border border-navy/10">/xeberler</code> немедленно после сохранения.
      </p>
    </div>
  );
}
