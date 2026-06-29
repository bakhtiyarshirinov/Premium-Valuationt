"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/components/locale-provider";
import { buildWhatsappUrl, buildMailtoUrl } from "@/lib/whatsapp";
import { MessageCircle, Mail } from "lucide-react";

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

export function RequestForm() {
  const { locale, t } = useLocale();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [toast, setToast] = useState<string | null>(null);

  function validate() {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = t.contact.form.errorRequired;
    if (!form.phone.trim()) next.phone = t.contact.form.errorRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function saveToDb() {
    // Fire-and-forget: saves to DB in parallel; never blocks or changes UI behaviour.
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, locale }),
    }).catch(() => {});
  }

  function handleWhatsapp() {
    if (!validate()) return;
    saveToDb();
    const url = buildWhatsappUrl(form, locale);
    window.open(url, "_blank", "noopener,noreferrer");
    showToast(t.contact.form.successToast);
  }

  function handleEmail() {
    if (!validate()) return;
    saveToDb();
    const url = buildMailtoUrl(form, locale);
    window.location.href = url;
  }

  const serviceOptions = t.services.map((s) => ({ value: s.title, label: s.title }));

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">{t.contact.form.name} *</Label>
          <Input
            id="name"
            value={form.name}
            placeholder={t.contact.form.namePlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">{t.contact.form.phone} *</Label>
          <Input
            id="phone"
            value={form.phone}
            placeholder={t.contact.form.phonePlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
          {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">{t.contact.form.email}</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            placeholder={t.contact.form.emailPlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="service">{t.contact.form.service}</Label>
          <Select
            value={form.service}
            onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}
          >
            <SelectTrigger id="service">
              <SelectValue placeholder={t.contact.form.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5 md:col-span-2">
          <Label htmlFor="message">{t.contact.form.message}</Label>
          <Textarea
            id="message"
            value={form.message}
            placeholder={t.contact.form.messagePlaceholder}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button variant="whatsapp" size="lg" onClick={handleWhatsapp} className="flex-1">
          <MessageCircle size={18} />
          {t.contact.form.submitWhatsapp}
        </Button>
        <Button variant="outline" size="lg" onClick={handleEmail} className="flex-1">
          <Mail size={18} />
          {t.contact.form.submitEmail}
        </Button>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-[100] bg-navy text-white px-5 py-3 rounded-xl shadow-navy-lg text-sm font-medium"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
