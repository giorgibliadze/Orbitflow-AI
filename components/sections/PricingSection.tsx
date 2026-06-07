"use client";

import { Check, BarChart3 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerChildren";
import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/types";

const pricing: PricingPlan[] = [
  {
    name: "Start",
    price: 900,
    period: "₾-დან",
    desc: "მარტივი landing page ან პრეზენტაციული საიტი მცირე ბიზნესისთვის.",
    features: [
      "1 გვერდიანი თანამედროვე დიზაინი",
      "მობილურზე მორგებული ვერსია",
      "საკონტაქტო ღილაკები",
      "ძირითადი SEO სტრუქტურა",
      "გაშვება ჰოსტინგზე",
    ],
    cta: "დამიკავშირდი",
    highlight: false,
  },
  {
    name: "Business",
    price: 1800,
    period: "₾-დან",
    desc: "სრული ბიზნეს ვებსაიტი სერვისებით, სექციებით და SEO სტრუქტურით.",
    features: [
      "5-მდე გვერდი / სექცია",
      "ინდივიდუალური დიზაინი",
      "საკონტაქტო ფორმა",
      "SEO მეტა ტექსტები",
      "Google Analytics / Tag Manager",
      "სიჩქარის ოპტიმიზაცია",
    ],
    cta: "პროექტის დაწყება",
    highlight: true,
  },
  {
    name: "Custom",
    price: null,
    period: "შეთანხმებით",
    desc: "ინდივიდუალური ფუნქციონალი, ონლაინ მაღაზია ან რთული ვებ პროექტი.",
    features: [
      "Next.js / WordPress / WooCommerce",
      "ონლაინ მაღაზია",
      "ადმინ პანელი",
      "გადახდის ინტეგრაცია",
      "დამატებითი ფუნქციონალი",
      "ტექნიკური მხარდაჭერა",
    ],
    cta: "კონსულტაცია",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-emerald-300"
            style={{
              borderColor: "rgba(52,211,153,0.25)",
              background: "rgba(52,211,153,0.06)",
            }}
          >
            <BarChart3 size={11} />
            ფასები
          </div>

          <h2
            className="mb-4 font-black text-white"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: "1.05",
            }}
          >
            აირჩიე პაკეტი შენი პროექტისთვის
          </h2>

          <p className="mx-auto max-w-xl text-white/45">
            ფასი დამოკიდებულია ვებსაიტის მოცულობაზე, ფუნქციონალზე და საჭირო
            ინტეგრაციებზე.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {pricing.map((plan, i) => (
            <StaggerItem key={i}>
              <div
                className="relative h-full rounded-2xl p-px transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: plan.highlight
                    ? "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(59,130,246,0.5))"
                    : "rgba(255,255,255,0.07)",
                }}
              >
                {plan.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed, #3b82f6)",
                    }}
                  >
                    პოპულარული
                  </div>
                )}

                <div
                  className="flex h-full flex-col rounded-2xl p-6"
                  style={{
                    background: plan.highlight
                      ? "rgba(15,10,30,0.95)"
                      : "rgba(10,10,20,0.8)",
                  }}
                >
                  <div className="mb-6">
                    <h3
                      className="mb-1 text-lg font-bold text-white"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {plan.name}
                    </h3>

                    <p className="mb-4 text-sm text-white/45">{plan.desc}</p>

                    <div className="flex items-baseline gap-1">
                      {plan.price ? (
                        <>
                          <span
                            className="text-4xl font-black text-white"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {plan.price}
                          </span>
                          <span className="text-sm text-white/45">
                            {plan.period}
                          </span>
                        </>
                      ) : (
                        <span
                          className="text-2xl font-black text-white"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature, fi) => (
                      <li
                        key={fi}
                        className="flex items-start gap-2.5 text-sm text-white/60"
                      >
                        <Check
                          size={14}
                          className="mt-0.5 flex-shrink-0 text-emerald-400"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.highlight ? "brand" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <a href="#contact">{plan.cta}</a>
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}