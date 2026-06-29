"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Plus, Check, X, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DistrictRecord } from "@/lib/districts-store";

// ─── Inline form (add / edit) ─────────────────────────────────────────────────

interface DistrictFormValues {
  labelAz: string;
  labelRu: string;
  pricePerSqm: string;
}

const emptyValues: DistrictFormValues = { labelAz: "", labelRu: "", pricePerSqm: "" };

function DistrictForm({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: DistrictFormValues;
  onSave: (v: DistrictFormValues) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [values, setValues] = useState<DistrictFormValues>(initial ?? emptyValues);
  const [err, setErr] = useState("");

  function handleSave() {
    if (!values.labelAz.trim() || !values.labelRu.trim() || !values.pricePerSqm) {
      setErr("Заполните все поля");
      return;
    }
    if (Number(values.pricePerSqm) <= 0) {
      setErr("Цена должна быть больше 0");
      return;
    }
    setErr("");
    onSave(values);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Название (AZ)</Label>
        <Input placeholder="Nəsimi" value={values.labelAz} onChange={(e) => setValues((v) => ({ ...v, labelAz: e.target.value }))} />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Название (RU)</Label>
        <Input placeholder="Насими" value={values.labelRu} onChange={(e) => setValues((v) => ({ ...v, labelRu: e.target.value }))} />
      </div>
      <div className="flex flex-col gap-1">
        <Label className="text-xs">Цена за м² (AZN)</Label>
        <Input type="number" min={1} placeholder="1700" value={values.pricePerSqm} onChange={(e) => setValues((v) => ({ ...v, pricePerSqm: e.target.value }))} />
      </div>

      {err && (
        <p className="sm:col-span-3 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} /> {err}
        </p>
      )}

      <div className="sm:col-span-3 flex gap-2">
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

// ─── Main manager ─────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function DistrictManager() {
  const [districts, setDistricts] = useState<DistrictRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch("/api/admin/districts");
      if (!res.ok) throw new Error();
      setDistricts(await res.json());
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAdd(values: DistrictFormValues) {
    setSavingId("new");
    await fetch("/api/admin/districts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ labelAz: values.labelAz, labelRu: values.labelRu, pricePerSqm: Number(values.pricePerSqm) }),
    });
    setAddingNew(false);
    setSavingId(null);
    load();
  }

  async function handleEdit(district: DistrictRecord, values: DistrictFormValues) {
    setSavingId(district.id);
    await fetch("/api/admin/districts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: district.id, labelAz: values.labelAz, labelRu: values.labelRu, pricePerSqm: Number(values.pricePerSqm) }),
    });
    setEditingId(null);
    setSavingId(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Удалить этот район?")) return;
    setSavingId(id);
    await fetch(`/api/admin/districts?id=${id}`, { method: "DELETE" });
    setSavingId(null);
    load();
  }

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-navy">Добавить район</h2>
          {!addingNew && (
            <Button variant="gold" size="sm" onClick={() => setAddingNew(true)}>
              <Plus size={14} /> Добавить
            </Button>
          )}
        </div>
        {addingNew ? (
          <DistrictForm onSave={handleAdd} onCancel={() => setAddingNew(false)} loading={savingId === "new"} />
        ) : (
          <p className="text-sm text-muted">Нажмите «Добавить», чтобы внести новый район.</p>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-navy/5 shadow-navy-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy/5">
          <h2 className="font-semibold text-navy">Районы ({districts.length})</h2>
          <button onClick={load} className="text-muted hover:text-navy transition-colors" title="Обновить">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-muted gap-2">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Загружаем данные...</span>
          </div>
        )}
        {fetchError && (
          <div className="flex flex-col items-center py-12 gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-sm text-muted">Ошибка загрузки</p>
            <Button variant="outline" size="sm" onClick={load}>Повторить</Button>
          </div>
        )}
        {!loading && !fetchError && districts.length === 0 && (
          <p className="text-center text-muted text-sm py-16">Нет районов. Добавьте первый выше.</p>
        )}
        {!loading && !fetchError && districts.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-offwhite text-left">
                  <th className="px-6 py-3 font-semibold text-muted text-xs uppercase tracking-wider">Район (AZ)</th>
                  <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider">Район (RU)</th>
                  <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider">Цена / м²</th>
                  <th className="px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wider">Обновлено</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {districts.map((d) => (
                  <tr key={d.id} className="hover:bg-offwhite/60 transition-colors">
                    {editingId === d.id ? (
                      <td colSpan={5} className="px-6 py-4">
                        <DistrictForm
                          initial={{ labelAz: d.labelAz, labelRu: d.labelRu, pricePerSqm: String(d.pricePerSqm) }}
                          onSave={(values) => handleEdit(d, values)}
                          onCancel={() => setEditingId(null)}
                          loading={savingId === d.id}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="px-6 py-4 font-medium text-ink">{d.labelAz}</td>
                        <td className="px-4 py-4 text-ink">{d.labelRu}</td>
                        <td className="px-4 py-4">
                          <span className="font-semibold text-navy">{d.pricePerSqm.toLocaleString("ru-RU")} AZN</span>
                        </td>
                        <td className="px-4 py-4 text-muted text-xs whitespace-nowrap">{formatDate(d.updatedAt)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => setEditingId(d.id)} disabled={!!savingId} className="p-1.5 rounded-lg text-navy/50 hover:text-navy hover:bg-navy/5 transition-colors" title="Редактировать">
                              <Pencil size={15} />
                            </button>
                            <button onClick={() => handleDelete(d.id)} disabled={savingId === d.id} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Удалить">
                              {savingId === d.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-muted text-center">
        Изменения немедленно отражаются в калькуляторе на сайте.
      </p>
    </div>
  );
}
