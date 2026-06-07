"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Purple Glow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(109,40,217,0.14) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Blue Glow */}
      <div
        className="absolute bottom-0 left-1/4 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium text-violet-300 mb-8"
            style={{
              borderColor: "rgba(139,92,246,0.25)",
              background: "rgba(139,92,246,0.08)",
            }}
          >
            <Globe size={12} />
            ვებსაიტების დამზადება ბიზნესისთვის
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="mb-8 font-black leading-[1.1] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
          }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
         უკეთესი ვებსაიტი
          <br />
          <span className="gradient-text">
            {" "}
            მეტი კლიენტი
          </span>
          
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-12 max-w-3xl text-lg md:text-xl leading-relaxed text-white/50"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          თანამედროვე დიზაინი, მაღალი სიჩქარე და SEO-ზე მორგებული
          სტრუქტურა — ვებსაიტი, რომელიც მხოლოდ ლამაზად კი არ გამოიყურება,
          არამედ რეალურად მუშაობს თქვენი ბიზნესისთვის.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            variant="brand"
            size="lg"
            className="gap-2 min-w-[220px]"
            asChild
          >
            <a href="#contact">
              დაიწყე პროექტი
              <ArrowRight size={15} />
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="min-w-[220px]"
            asChild
          >
            <a href="#features">
              ნახე შესაძლებლობები
            </a>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            "თანამედროვე დიზაინი",
            "სწრაფი და დაცული საიტი",
            "SEO-სთვის გამართული სტრუქტურა",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={14} className="text-emerald-400" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}