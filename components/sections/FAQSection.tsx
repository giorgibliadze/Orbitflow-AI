"use client";
import { useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import type { FAQItem } from "@/types";

const faqs: FAQItem[] = [
  {
    q: "რა ტიპის ვებსაიტებს ამზადებთ?",
    a: "ვამზადებ თანამედროვე ბიზნეს ვებსაიტებს, landing page-ებს, პორტფოლიოებს, სერვისების გვერდებს, WooCommerce მაღაზიებს და Next.js-ზე აწყობილ სწრაფ ვებსაიტებს.",
  },
  {
    q: "რამდენ ხანში მზადდება ვებსაიტი?",
    a: "მარტივი landing page საშუალოდ მზადდება 5–7 სამუშაო დღეში. უფრო დიდი კორპორატიული ან ფუნქციური ვებსაიტი შეიძლება საჭიროებდეს 2–4 კვირას, მოცულობიდან გამომდინარე.",
  },
  {
    q: "რა შედის ვებსაიტის დამზადებაში?",
    a: "სტრუქტურის დაგეგმვა, დიზაინი, responsive ვერსია მობილურისთვის, ძირითადი SEO გამართვა, საკონტაქტო ფორმები, Google Analytics / Tag Manager-ის ინტეგრაცია საჭიროების შემთხვევაში და საბოლოო გაშვება.",
  },
  {
    q: "შეგიძლიათ არსებული ვებსაიტის გაუმჯობესება?",
    a: "დიახ. შემიძლია არსებული ვებსაიტის დიზაინის განახლება, სიჩქარის ოპტიმიზაცია, SEO სტრუქტურის გაუმჯობესება, შეცდომების გასწორება და ახალი ფუნქციონალის დამატება.",
  },
  {
    q: "როგორ იწყება თანამშრომლობა?",
    a: "პირველ ეტაპზე მიგზავნით მოკლე ინფორმაციას პროექტზე. შემდეგ განვსაზღვრავთ სტრუქტურას, ფუნქციონალს, ვადებს და ფასს. შეთანხმების შემდეგ იწყება დიზაინისა და დეველოპმენტის პროცესი.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium text-white/50 mb-4"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <MessageSquare size={11} />
            FAQ
          </div>
          <h2
            className="font-black text-white mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            ხშირად დასმული კითხვები
          </h2>
          <p className="mx-auto max-w-xl text-white/45">
            მოკლე პასუხები ვებსაიტის დამზადების პროცესზე, ვადებზე და
            მომსახურებაზე.
          </p>
        </FadeIn>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  borderColor:
                    open === i
                      ? "rgba(139,92,246,0.25)"
                      : "rgba(255,255,255,0.07)",
                  background:
                    open === i
                      ? "rgba(139,92,246,0.04)"
                      : "rgba(255,255,255,0.02)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-sm font-semibold text-white/85">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 text-white/30 transition-transform duration-300"
                    style={{
                      transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm text-white/45 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}