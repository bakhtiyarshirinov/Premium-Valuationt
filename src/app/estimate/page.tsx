import type { Metadata } from "next";
import { EstimatePage } from "@/components/pages/estimate-page";

export const metadata: Metadata = {
  title: "Əmlak Kalkulyatoru / Калькулятор недвижимости",
  description:
    "Əmlakınızın təxmini dəyərini onlayn hesablayın — rayon, sahə, vəziyyət və növ əsasında. Rəsmi qiymətləndirmə üçün mütəxəssislə əlaqə saxlayın.",
};

export default function Page() {
  return <EstimatePage />;
}
