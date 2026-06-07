import { Sparkles, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-10"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            }}
          >
            <Sparkles size={11} className="text-white" />
          </div>

          <span
            className="text-sm font-bold text-white/60"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Giorgi.dev
          </span>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2 text-xs text-white/35 md:flex-row md:gap-6">
          <a
            href="tel:+995555137003"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Phone size={12} />
            +995 555 137 003
          </a>

          <a
            href="mailto:bliadze1997@gmail.com"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <Mail size={12} />
            bliadze1997@gmail.com
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-white/25">
          © {new Date().getFullYear()} All rights reserved. Developed by{" "}
          <a
            href="https://next-hub.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-300 transition-colors hover:text-violet-200"
          >
            Next Hub Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}