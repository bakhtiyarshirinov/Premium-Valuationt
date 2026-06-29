import {
  ESTIMATOR_CONFIG,
  PROPERTY_TYPE_COEFFICIENTS,
  CONDITION_COEFFICIENTS,
  type PropertyTypeId,
  type ConditionId,
} from "@/constants/districts";

export interface EstimateInput {
  areaSqm: number;
  /** Price per m² for the selected district — comes from /api/districts, managed in admin panel. */
  pricePerSqm: number;
  propertyType: PropertyTypeId;
  condition: ConditionId;
  rooms?: number;
}

export interface EstimateResult {
  low: number;
  mid: number;
  high: number;
  currency: string;
}

/**
 * Formula:
 *   mid  = areaSqm × pricePerSqm × typeMultiplier × conditionMultiplier
 *   low  = mid × (1 − rangePercent)        e.g. −10%
 *   high = mid × (1 + rangePercent)        e.g. +10%
 *
 * pricePerSqm is district-specific and comes from the admin panel (data/districts.json).
 * Type and condition multipliers live in src/constants/districts.ts.
 * rangePercent is intentionally non-zero — the result is an indicative range,
 * not a precise valuation.
 */
export function calculateEstimate(input: EstimateInput): EstimateResult {
  const { currency, rangePercent } = ESTIMATOR_CONFIG;

  const typeMult = PROPERTY_TYPE_COEFFICIENTS[input.propertyType].multiplier;
  const condMult = CONDITION_COEFFICIENTS[input.condition].multiplier;

  const mid = Math.round(input.areaSqm * input.pricePerSqm * typeMult * condMult);
  const low  = Math.round(mid * (1 - rangePercent));
  const high = Math.round(mid * (1 + rangePercent));

  return { low, mid, high, currency };
}

export function formatPrice(amount: number, currency: string): string {
  return `${amount.toLocaleString("ru-RU")} ${currency}`;
}
