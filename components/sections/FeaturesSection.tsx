"use client";
import { Zap, Shield, Globe, BarChart3, Cpu, GitBranch } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerChildren";
import type { Feature } from "@/types";

const features: Feature[] = [
  {
    icon: Zap,
    title: "სწრაფი შესრულება",
    desc: "ვებსაიტები იქმნება Next.js-ზე, რაც უზრუნველყოფს მაღალ სიჩქარეს, SEO ოპტიმიზაციას და საუკეთესო მომხმარებლის გამოცდილებას.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "უსაფრთხოება",
    desc: "SSL სერტიფიკატი, უსაფრთხოების საუკეთესო პრაქტიკები და საიტის სტაბილური მუშაობა ყველა მოწყობილობაზე.",
    color: "#22d3ee",
  },
  {
    icon: Globe,
    title: "SEO ოპტიმიზაცია",
    desc: "Google-ისთვის გამართული სტრუქტურა, მეტა მონაცემები და ტექნიკური SEO, რათა თქვენი ბიზნესი უკეთ გამოჩნდეს ძიების შედეგებში.",
    color: "#a78bfa",
  },
  {
    icon: BarChart3,
    title: "Google Analytics",
    desc: "ვებსაიტის ვიზიტორების, კონვერსიების და მომხმარებელთა ქცევის სრული ანალიტიკა.",
    color: "#34d399",
  },
  {
    icon: Cpu,
    title: "თანამედროვე ტექნოლოგიები",
    desc: "Next.js, React, WordPress, WooCommerce და სხვა თანამედროვე ტექნოლოგიები თქვენი პროექტისთვის.",
    color: "#f87171",
  },
  {
    icon: GitBranch,
    title: "მხარდაჭერა და განვითარება",
    desc: "საიტის გაშვების შემდეგაც ვუზრუნველყოფ განახლებებს, ტექნიკურ მხარდაჭერასა და შემდგომ განვითარებას.",
    color: "#60a5fa",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium text-cyan-300 mb-4"
            style={{
              borderColor: "rgba(34,211,238,0.25)",
              background: "rgba(34,211,238,0.06)",
            }}
          >
            <Zap size={11} />
            ჩემი სერვისები
          </div>
          <h2
            className="font-black text-white mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            ყველაფერი რაც ბიზნეს ვებსაიტს სჭირდება
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            თანამედროვე დიზაინი, მაღალი სიჩქარე, SEO ოპტიმიზაცია და შედეგზე ორიენტირებული განვითარება.
          </p>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={i}>
                <div
                  className="group relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:border-white/15 hover:bg-white/[0.03] h-full"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${feature.color}08 0%, transparent 60%)`,
                    }}
                  />
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                      style={{
                        background: `${feature.color}10`,
                        borderColor: `${feature.color}25`,
                      }}
                    >
                      <Icon size={18} style={{ color: feature.color }} />
                    </div>
                    <h3
                      className="font-bold text-white mb-2 text-base"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}