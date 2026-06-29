"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Calculator, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/components/locale-provider";
import {
  PROPERTY_TYPE_COEFFICIENTS,
  CONDITION_COEFFICIENTS,
  type PropertyTypeId,
  type ConditionId,
} from "@/constants/districts";
import {
  calculateEstimate,
  formatPrice,
  type EstimateResult,
} from "@/utils/calculateEstimate";
import { DisclaimerShort, DisclaimerFull } from "@/components/disclaimer";
import type { DistrictRecord } from "@/lib/districts-store";

// ─── WhatsApp config ─────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_WHATSAPP_NUMBER in your .env.local to override.
// Falls back to empty string — button still works, just opens wa.me with no number.
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

// ─── UI translations ──────────────────────────────────────────────────────────
const i18n = {
  az: {
    fieldArea: "Sahə (m²)",
    fieldAreaPlaceholder: "Məs: 85",
    fieldType: "Əmlak növü",
    fieldTypePlaceholder: "Seçin",
    fieldDistrict: "Rayon",
    fieldDistrictPlaceholder: "Seçin",
    fieldCondition: "Vəziyyəti",
    fieldConditionPlaceholder: "Seçin",
    fieldRooms: "Otaq sayı (istəyə görə)",
    fieldRoomsPlaceholder: "Məs: 3",
    calculate: "Hesabla",
    loadingDistricts: "Rayonlar yüklənir...",
    resultTitle: "Təxmini Qiymət Diapazonu",
    resultNote: "±10% diapazon",
    resultLow: "Minimum",
    resultMid: "Orta",
    resultHigh: "Maksimum",
    ctaTitle: "Rəsmi Qiymətləndirmə Hesabatı almaq istəyirsiniz?",
    ctaDesc:
      "Akkreditasiya olunmuş ekspertimiz obyektinizi yerindən qiymətləndirir — bank krediti, alqı-satqı, məhkəmə və notariat əməliyyatları üçün hüquqi qüvvəsi olan rəsmi hesabat alırsınız.",
    ctaButton: "WhatsApp ilə əlaqə saxlayın",
    errorArea: "Sahəni daxil edin",
    errorDistrict: "Rayonu seçin",
    errorType: "Əmlak növünü seçin",
    errorCondition: "Vəziyyəti seçin",
    districtLoadError: "Rayonları yükləmək mümkün olmadı. Səhifəni yeniləyin.",
    waMessage: (area: number, district: string, type: string, range: string) =>
      `Salam! Mənə ${area} m² sahəli ${type} (${district} rayonu) əmlakın qiymətləndirilməsi maraqlıdır. Kalkulyator göstəricisi: ${range}. Rəsmi qiymətləndirmə hesabatı sifariş etmək istəyirəm.`,
  },
  ru: {
    fieldArea: "Площадь (м²)",
    fieldAreaPlaceholder: "Напр: 85",
    fieldType: "Тип недвижимости",
    fieldTypePlaceholder: "Выберите",
    fieldDistrict: "Район",
    fieldDistrictPlaceholder: "Выберите",
    fieldCondition: "Состояние объекта",
    fieldConditionPlaceholder: "Выберите",
    fieldRooms: "Количество комнат (необязательно)",
    fieldRoomsPlaceholder: "Напр: 3",
    calculate: "Рассчитать",
    loadingDistricts: "Загружаем районы...",
    resultTitle: "Приблизительный диапазон стоимости",
    resultNote: "диапазон ±10%",
    resultLow: "Минимум",
    resultMid: "Среднее",
    resultHigh: "Максимум",
    ctaTitle: "Хотите получить официальный отчёт об оценке?",
    ctaDesc:
      "Аккредитованный эксперт выедет на объект и составит официальный отчёт с юридической силой — для банка, купли-продажи, суда или нотариальных сделок.",
    ctaButton: "Связаться с нами в WhatsApp",
    errorArea: "Введите площадь",
    errorDistrict: "Выберите район",
    errorType: "Выберите тип недвижимости",
    errorCondition: "Выберите состояние",
    districtLoadError: "Не удалось загрузить список районов. Обновите страницу.",
    waMessage: (area: number, district: string, type: string, range: string) =>
      `Здравствуйте! Меня интересует оценка недвижимости: ${type}, площадь ${area} м², район ${district}. Расчётный ориентир: ${range}. Хочу заказать официальный отчёт об оценке.`,
  },
};

interface FormState {
  areaSqm: string;
  districtId: string;
  propertyType: PropertyTypeId | "";
  condition: ConditionId | "";
  rooms: string;
}

interface FormErrors {
  areaSqm?: string;
  districtId?: string;
  propertyType?: string;
  condition?: string;
}

const emptyForm: FormState = {
  areaSqm: "",
  districtId: "",
  propertyType: "",
  condition: "",
  rooms: "",
};

export function PropertyEstimator() {
  const { locale } = useLocale();
  const t = i18n[locale];

  const [districts, setDistricts] = useState<DistrictRecord[]>([]);
  const [districtsLoading, setDistrictsLoading] = useState(true);
  const [districtsError, setDistrictsError] = useState(false);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<EstimateResult | null>(null);

  // Fetch districts from API (managed via admin panel)
  useEffect(() => {
    fetch("/api/districts")
      .then((r) => r.json())
      .then((data: DistrictRecord[]) => {
        setDistricts(data);
        setDistrictsLoading(false);
      })
      .catch(() => {
        setDistrictsError(true);
        setDistrictsLoading(false);
      });
  }, []);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.areaSqm || Number(form.areaSqm) <= 0) next.areaSqm = t.errorArea;
    if (!form.districtId) next.districtId = t.errorDistrict;
    if (!form.propertyType) next.propertyType = t.errorType;
    if (!form.condition) next.condition = t.errorCondition;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleCalculate() {
    if (!validate()) return;
    const district = districts.find((d) => d.id === form.districtId)!;
    const estimate = calculateEstimate({
      areaSqm: Number(form.areaSqm),
      pricePerSqm: district.pricePerSqm,
      propertyType: form.propertyType as PropertyTypeId,
      condition: form.condition as ConditionId,
      rooms: form.rooms ? Number(form.rooms) : undefined,
    });
    setResult(estimate);
  }

  function buildWaUrl(): string {
    if (!result) return "https://wa.me/";
    const district = districts.find((d) => d.id === form.districtId);
    const districtLabel = district
      ? locale === "az" ? district.labelAz : district.labelRu
      : form.districtId;
    const typeLabel = form.propertyType
      ? locale === "az"
        ? PROPERTY_TYPE_COEFFICIENTS[form.propertyType as PropertyTypeId].labelAz
        : PROPERTY_TYPE_COEFFICIENTS[form.propertyType as PropertyTypeId].labelRu
      : "";
    const range = `${formatPrice(result.low, result.currency)} – ${formatPrice(result.high, result.currency)}`;
    const text = t.waMessage(Number(form.areaSqm), districtLabel, typeLabel, range);
    const base = WA_NUMBER ? `https://wa.me/${WA_NUMBER}` : "https://wa.me/";
    return `${base}?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="w-full">
      {/* ── Form ── */}
      <div className="bg-white rounded-3xl border border-navy/5 shadow-navy-lg p-7 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Area */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pe-area">{t.fieldArea} *</Label>
            <Input
              id="pe-area"
              type="number"
              min={1}
              placeholder={t.fieldAreaPlaceholder}
              value={form.areaSqm}
              onChange={(e) => {
                setForm((f) => ({ ...f, areaSqm: e.target.value }));
                setErrors((er) => ({ ...er, areaSqm: undefined }));
                setResult(null);
              }}
            />
            {errors.areaSqm && (
              <span className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.areaSqm}
              </span>
            )}
          </div>

          {/* Rooms (optional) */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pe-rooms">{t.fieldRooms}</Label>
            <Input
              id="pe-rooms"
              type="number"
              min={1}
              placeholder={t.fieldRoomsPlaceholder}
              value={form.rooms}
              onChange={(e) => setForm((f) => ({ ...f, rooms: e.target.value }))}
            />
          </div>

          {/* Property type */}
          <div className="flex flex-col gap-1.5">
            <Label>{t.fieldType} *</Label>
            <Select
              value={form.propertyType}
              onValueChange={(v) => {
                setForm((f) => ({ ...f, propertyType: v as PropertyTypeId }));
                setErrors((er) => ({ ...er, propertyType: undefined }));
                setResult(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.fieldTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(PROPERTY_TYPE_COEFFICIENTS) as [
                    PropertyTypeId,
                    { labelAz: string; labelRu: string; multiplier: number }
                  ][]
                ).map(([id, cfg]) => (
                  <SelectItem key={id} value={id}>
                    {locale === "az" ? cfg.labelAz : cfg.labelRu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.propertyType && (
              <span className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.propertyType}
              </span>
            )}
          </div>

          {/* District — loaded from API */}
          <div className="flex flex-col gap-1.5">
            <Label>{t.fieldDistrict} *</Label>
            {districtsError ? (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {t.districtLoadError}
              </p>
            ) : (
              <Select
                value={form.districtId}
                disabled={districtsLoading}
                onValueChange={(v) => {
                  setForm((f) => ({ ...f, districtId: v }));
                  setErrors((er) => ({ ...er, districtId: undefined }));
                  setResult(null);
                }}
              >
                <SelectTrigger>
                  {districtsLoading ? (
                    <span className="flex items-center gap-2 text-muted">
                      <Loader2 size={14} className="animate-spin" />
                      {t.loadingDistricts}
                    </span>
                  ) : (
                    <SelectValue placeholder={t.fieldDistrictPlaceholder} />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {locale === "az" ? d.labelAz : d.labelRu}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.districtId && (
              <span className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.districtId}
              </span>
            )}
          </div>

          {/* Condition */}
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <Label>{t.fieldCondition} *</Label>
            <Select
              value={form.condition}
              onValueChange={(v) => {
                setForm((f) => ({ ...f, condition: v as ConditionId }));
                setErrors((er) => ({ ...er, condition: undefined }));
                setResult(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.fieldConditionPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.entries(CONDITION_COEFFICIENTS) as [
                    ConditionId,
                    { labelAz: string; labelRu: string; multiplier: number }
                  ][]
                ).map(([id, cfg]) => (
                  <SelectItem key={id} value={id}>
                    {locale === "az" ? cfg.labelAz : cfg.labelRu}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.condition && (
              <span className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.condition}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="gold"
          size="lg"
          className="mt-7 w-full sm:w-auto"
          onClick={handleCalculate}
          disabled={districtsLoading || districtsError}
        >
          <Calculator size={18} />
          {t.calculate}
        </Button>
      </div>

      {/* ── Result ── */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 space-y-4"
          >
            {/* Short disclaimer — prominent, above the numbers */}
            <DisclaimerShort locale={locale} />

            {/* Price range */}
            <div className="bg-navy-gradient rounded-3xl p-7 md:p-10 text-white">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <p className="text-gold font-semibold tracking-[0.18em] uppercase text-xs">
                  {t.resultTitle}
                </p>
                <span className="text-white/40 text-xs">{t.resultNote}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
                <div className="text-center">
                  <p className="text-white/50 text-xs mb-1">{t.resultLow}</p>
                  <p className="font-display font-bold text-base md:text-xl text-white/75">
                    {formatPrice(result.low, result.currency)}
                  </p>
                </div>

                {/* Mid — the primary number */}
                <div className="text-center bg-white/10 rounded-2xl px-2 py-3">
                  <p className="text-gold/80 text-xs mb-1">{t.resultMid}</p>
                  <p className="font-display font-bold text-xl md:text-3xl text-gradient-gold">
                    {formatPrice(result.mid, result.currency)}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-white/50 text-xs mb-1">{t.resultHigh}</p>
                  <p className="font-display font-bold text-base md:text-xl text-white/75">
                    {formatPrice(result.high, result.currency)}
                  </p>
                </div>
              </div>

              {/* Full legal disclaimer inside result card */}
              <div className="border-t border-white/10 pt-4">
                <DisclaimerFull locale={locale} />
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-white rounded-3xl border border-navy/5 shadow-navy-lg p-7 md:p-9">
              <h3 className="font-display font-bold text-navy text-xl md:text-2xl mb-2">
                {t.ctaTitle}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">{t.ctaDesc}</p>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() => window.open(buildWaUrl(), "_blank", "noopener,noreferrer")}
              >
                <MessageCircle size={18} />
                {t.ctaButton}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
