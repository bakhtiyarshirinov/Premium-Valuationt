/**
 * Legal disclaimer component.
 * Edit the text here when a lawyer reviews/updates the wording.
 * Used in two modes:
 *   "short" — prominent notice near the result figure
 *   "full"  — complete legal paragraph below the result
 */
import { AlertTriangle } from "lucide-react";

const TEXT = {
  az: {
    short: "Bu hesablama rəsmi qiymətləndirmə deyil",
    full: `Diqqət: Burada göstərilən hesablama yalnız ilkin istiqamət üçün nəzərdə tutulmuşdur və Azərbaycan Respublikasının "Qiymətləndirmə fəaliyyəti haqqında" Qanunu çərçivəsində rəsmi əmlak qiymətləndirilməsi hesab edilmir. Hüquqi qüvvəyə malik rəsmi qiymətləndirmə yalnız Qiymətləndiricilər Palatası üzvü olan sertifikatlı qiymətləndiricilər tərəfindən həyata keçirilə bilər. Rəsmi qiymətləndirmə hesabatı üçün bizimlə əlaqə saxlayın.`,
  },
  ru: {
    short: "Не является официальной оценкой недвижимости",
    full: `Внимание: представленный расчёт является приблизительным ориентиром и не является официальной оценкой недвижимости в значении Закона Азербайджанской Республики «О оценочной деятельности» («Qiymətləndirmə fəaliyyəti haqqında»). Официальная оценка с юридической силой может быть проведена только сертифицированным оценщиком, являющимся членом Палаты оценщиков (Qiymətləndiricilər Palatası). Для получения официального отчёта об оценке свяжитесь с нами.`,
  },
};

export function DisclaimerShort({ locale }: { locale: "az" | "ru" }) {
  return (
    <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
      <AlertTriangle className="shrink-0" size={18} />
      <span className="font-semibold text-sm">{TEXT[locale].short}</span>
    </div>
  );
}

export function DisclaimerFull({ locale }: { locale: "az" | "ru" }) {
  return (
    <div className="rounded-xl border border-navy/10 bg-offwhite px-5 py-4">
      <div className="flex gap-2 items-start">
        <AlertTriangle className="shrink-0 mt-0.5 text-navy/50" size={15} />
        <p className="text-xs text-muted leading-relaxed">{TEXT[locale].full}</p>
      </div>
    </div>
  );
}
