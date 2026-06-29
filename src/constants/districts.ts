/**
 * Estimator configuration.
 * Prices per district are stored in data/districts.json and managed
 * through the admin panel at /admin/prices.
 * Only the coefficients below need code changes — everything else is configurable
 * in the admin UI.
 */

// ─── Result display ──────────────────────────────────────────────────────────
export const ESTIMATOR_CONFIG = {
  /** Display currency label — change here if currency changes. */
  currency: "AZN",
  /**
   * Band shown around the mid estimate.
   * 0.10 → shows "mid × 0.90 – mid × 1.10"
   * Important: this range is intentional — the calculator is a guide,
   * not an official valuation.
   */
  rangePercent: 0.10,
} as const;

// ─── Property type coefficients ───────────────────────────────────────────────
// Adjust these to reflect how each property type trades vs. the baseline (1.00).
// Consider moving to admin panel if you need non-technical staff to update them.
export type PropertyTypeId = "apartment" | "house" | "commercial";

export const PROPERTY_TYPE_COEFFICIENTS: Record<
  PropertyTypeId,
  { labelAz: string; labelRu: string; multiplier: number }
> = {
  // Baseline — apartment is the reference segment.
  apartment:  { labelAz: "Mənzil",             labelRu: "Квартира",                  multiplier: 1.00 },
  // Detached homes carry a land/plot premium.
  house:      { labelAz: "Ev",                 labelRu: "Дом",                       multiplier: 1.15 },
  // Commercial space typically commands a higher per-m² rate.
  commercial: { labelAz: "Kommersiya obyekti", labelRu: "Коммерческая недвижимость", multiplier: 1.25 },
};

// ─── Condition coefficients ───────────────────────────────────────────────────
// Reflect the % discount / premium vs. "good condition" baseline (1.00).
export type ConditionId =
  | "needs_repair"
  | "good"
  | "new_construction"
  | "premium";

export const CONDITION_COEFFICIENTS: Record<
  ConditionId,
  { labelAz: string; labelRu: string; multiplier: number }
> = {
  // Heavy discount — buyer must budget a full renovation.
  needs_repair:     { labelAz: "Təmir tələb edir", labelRu: "Требует ремонта",     multiplier: 0.75 },
  // Standard finished / move-in ready.
  good:             { labelAz: "Yaxşı vəziyyət",   labelRu: "Хорошее состояние",   multiplier: 1.00 },
  // Fresh build, developer finishes.
  new_construction: { labelAz: "Yeni tikili",       labelRu: "Новое строительство", multiplier: 1.20 },
  // High-spec materials, smart home, luxury fit-out.
  premium:          { labelAz: "Premium tərtibat",  labelRu: "Премиум отделка",     multiplier: 1.40 },
};
