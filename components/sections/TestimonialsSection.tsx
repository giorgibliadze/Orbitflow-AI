"use client";

import { Star } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import type { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    name: "ნიკა მაისურაძე",
    role: "ბიზნესის მფლობელი",
    quote:
      "საიტი ზუსტად ისე გამოვიდა, როგორც გვინდოდა — სწრაფი, სუფთა და პროფესიონალური. განსაკუთრებით მომეწონა დეტალებზე ყურადღება.",
    avatar: "ნმ",
    stars: 5,
  },
  {
    name: "ანა გიორგაძე",
    role: "მარკეტინგის მენეჯერი",
    quote:
      "დიზაინიც და სტრუქტურაც კარგად იყო დაგეგმილი. საიტი მობილურზეც იდეალურად გამოიყურება და Google-ისთვისაც გამართულია.",
    avatar: "აგ",
    stars: 5,
  },
  {
    name: "ლევან კაპანაძე",
    role: "სტარტაპის დამფუძნებელი",
    quote:
      "მივიღეთ თანამედროვე ვებსაიტი, რომელიც კარგად წარმოაჩენს ჩვენს სერვისებს. კომუნიკაცია იყო სწრაფი და გასაგები.",
    avatar: "ლკ",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-blue-300"
            style={{
              borderColor: "rgba(96,165,250,0.25)",
              background: "rgba(96,165,250,0.06)",
            }}
          >
            <Star size={11} />
            შეფასებები
          </div>

          <h2
            className="mb-4 font-black text-white"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.05",
            }}
          >
            რას ამბობენ კლიენტები
          </h2>

          <p className="mx-auto max-w-xl text-white/45">
            რამდენიმე მაგალითი იმ გამოცდილებიდან, რომელსაც პროექტის პროცესში
            ვქმნით.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div
                className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:border-white/15"
                style={{
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div className="mb-4 flex gap-0.5">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, si) => (
                      <Star
                        key={si}
                        size={13}
                        fill="#f59e0b"
                        className="text-amber-400"
                      />
                    ))}
                </div>

                <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-white/65">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-violet-200"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
                      border: "1px solid rgba(139,92,246,0.3)",
                    }}
                  >
                    {t.avatar}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}