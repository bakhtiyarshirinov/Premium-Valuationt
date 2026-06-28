import { companyInfo } from "@/lib/content";

export interface RequestFormValues {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}

export function buildRequestMessage(values: RequestFormValues, locale: "az" | "ru") {
  if (locale === "ru") {
    return `Здравствуйте! Меня зовут ${values.name}. Хочу отправить заявку по услуге: ${values.service || "—"}. Телефон: ${values.phone}.${values.email ? ` Email: ${values.email}.` : ""} Сообщение: ${values.message || "—"}`;
  }
  return `Salam! Mənim adım ${values.name}. ${values.service || "—"} üzrə sorğu göndərmək istəyirəm. Telefon: ${values.phone}.${values.email ? ` Email: ${values.email}.` : ""} Mesaj: ${values.message || "—"}`;
}

export function buildWhatsappUrl(values: RequestFormValues, locale: "az" | "ru") {
  const message = buildRequestMessage(values, locale);
  return `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(values: RequestFormValues, locale: "az" | "ru") {
  const message = buildRequestMessage(values, locale);
  const subject = locale === "ru" ? "Заявка на оценку" : "Qiymətləndirmə sorğusu";
  return `mailto:${companyInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
