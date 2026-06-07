"use client";

import {
  GitBranch,
  Calendar,
  FileText,
  Code,
  Layers,
  User,
  Clock,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/types";

const orbitalTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "გეგმა",
    date: "ეტაპი 01",
    content:
      "პირველ ეტაპზე განვსაზღვრავთ ვებსაიტის მიზანს, აუდიტორიას, საჭირო გვერდებს და ფუნქციონალს.",
    category: "Strategy",
    icon: Calendar,
    relatedIds: [2, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "სტრუქტურა",
    date: "ეტაპი 02",
    content:
      "ვაწყობთ საიტის ლოგიკას: სექციებს, მენიუს, მომხმარებლის გზას და კონტენტის განლაგებას.",
    category: "Structure",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed",
    energy: 100,
  },
  {
    id: 3,
    title: "დიზაინი",
    date: "ეტაპი 03",
    content:
      "იქმნება თანამედროვე ვიზუალი, რომელიც შეესაბამება ბრენდს და კარგად მუშაობს მობილურზეც.",
    category: "Design",
    icon: Layers,
    relatedIds: [2, 4],
    status: "completed",
    energy: 95,
  },
  {
    id: 4,
    title: "დეველოპმენტი",
    date: "ეტაპი 04",
    content:
      "ვებგვერდი იწერება Next.js, React ან WordPress ტექნოლოგიებით — სწრაფად, სუფთად და სწორად.",
    category: "Development",
    icon: Code,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 5,
    title: "ტესტირება",
    date: "ეტაპი 05",
    content:
      "ვამოწმებთ სიჩქარეს, responsive დიზაინს, ფორმებს, ბმულებს და ძირითად SEO პარამეტრებს.",
    category: "Testing",
    icon: User,
    relatedIds: [4, 6],
    status: "pending",
    energy: 45,
  },
  {
    id: 6,
    title: "გაშვება",
    date: "ეტაპი 06",
    content:
      "საიტი გადადის live რეჟიმში, ერთდება ანალიტიკა და მზადდება შემდგომი მხარდაჭერისთვის.",
    category: "Launch",
    icon: Clock,
    relatedIds: [5, 1],
    status: "pending",
    energy: 25,
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative px-6 py-24 md:py-32 overflow-visible">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(124,58,237,0.12) 0%, transparent 58%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn className="mb-12 text-center">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-violet-300"
            style={{
              borderColor: "rgba(139,92,246,0.25)",
              background: "rgba(139,92,246,0.06)",
            }}
          >
            <GitBranch size={11} />
            სამუშაო პროცესი
          </div>

          <h2
            className="mb-4 font-black text-white"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: "1.05",
            }}
          >
            როგორ იქმნება ვებსაიტი
          </h2>

          <p className="mx-auto max-w-2xl text-base text-white/45 md:text-lg">
            პროცესი იყოფა მკაფიო ეტაპებად — იდეიდან გაშვებამდე.
            დააჭირეთ თითოეულ ეტაპს დეტალების სანახავად.
          </p>
        </FadeIn>

        <div className="relative mx-auto max-w-5xl overflow-visible">
          <RadialOrbitalTimeline timelineData={orbitalTimelineData} />
        </div>
      </div>
    </section>
  );
}