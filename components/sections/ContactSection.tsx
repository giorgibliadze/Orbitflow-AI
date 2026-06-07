"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const text = `გამარჯობა, მინდა ვებსაიტის დამზადებაზე კონსულტაცია.%0A%0Aსახელი: ${form.name}%0AEmail: ${form.email}%0Aკომპანია: ${form.company}%0Aშეტყობინება: ${form.message}`;

    await new Promise((r) => setTimeout(r, 500));
    window.open(`https://wa.me/995599412986?text=${text}`, "_blank");

    setLoading(false);
    setSent(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-xl">
        <FadeIn className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-violet-300"
            style={{
              borderColor: "rgba(139,92,246,0.25)",
              background: "rgba(139,92,246,0.06)",
            }}
          >
            <Mail size={11} />
            დაგვიკავშირდით
          </div>

          <h2
            className="mb-4 font-black text-white"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: "1.05",
            }}
          >
            გჭირდებათ თანამედროვე ვებსაიტი?
          </h2>

          <p className="text-white/45">
            მოგვწერეთ თქვენი იდეა და დაგეხმარებით სწორი სტრუქტურის,
            დიზაინისა და ფუნქციონალის დაგეგმვაში.
          </p>

          <div className="mt-5 flex flex-col items-center justify-center gap-2 text-sm text-white/55 sm:flex-row sm:gap-5">
            <a
              href="tel:+995555137003"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone size={14} />
              +995 555 137 003
            </a>

            <a
              href="mailto:bliadze1997@gmail.com"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={14} />
              bliadze1997@gmail.com
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border p-8 text-center"
                style={{
                  borderColor: "rgba(52,211,153,0.25)",
                  background: "rgba(52,211,153,0.04)",
                }}
              >
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "rgba(52,211,153,0.15)" }}
                >
                  <Check size={22} className="text-emerald-400" />
                </div>

                <h3
                  className="mb-2 text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  შეტყობინება მზადაა
                </h3>

                <p className="text-sm text-white/45">
                  WhatsApp გაიხსნა თქვენი შეტყობინებით. გაგზავნის შემდეგ
                  მალე დაგიკავშირდებით.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl border p-6 md:p-8"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs text-white/45">
                        სახელი
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="თქვენი სახელი"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors"
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs text-white/45">
                        ელ. ფოსტა
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-white/45">
                      კომპანია / ბრენდი
                    </label>
                    <input
                      type="text"
                      name="company"
                      placeholder="კომპანიის ან ბრენდის სახელი"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-white/45">
                      რაში გჭირდებათ დახმარება?
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="მოკლედ აღწერეთ რა ტიპის ვებსაიტი ან პროექტი გჭირდებათ..."
                      value={form.message}
                      onChange={handleChange}
                      className="w-full resize-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 transition-colors"
                      style={inputStyle}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="brand"
                    size="lg"
                    className="w-full gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        მზადდება...
                      </span>
                    ) : (
                      <>
                        გაგზავნა <ArrowRight size={14} />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}