"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Link, Sparkles, Zap } from "lucide-react";
import type { TimelineItem } from "@/types";

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

interface TimelineCardProps {
  item: TimelineItem;
  timelineData: TimelineItem[];
  toggleItem: (id: number) => void;
}

function getStatusColor(status: TimelineItem["status"]) {
  switch (status) {
    case "completed":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    case "in-progress":
      return "bg-violet-500/20 text-violet-300 border-violet-500/40";
    case "pending":
      return "bg-slate-500/20 text-slate-400 border-slate-500/40";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/40";
  }
}

function getStatusLabel(status: TimelineItem["status"]) {
  switch (status) {
    case "completed":
      return "დასრულებულია";
    case "in-progress":
      return "მიმდინარეობს";
    case "pending":
      return "მზადდება";
    default:
      return "მზადდება";
  }
}

function TimelineCard({ item, timelineData, toggleItem }: TimelineCardProps) {
  return (
    <div
      className="relative rounded-2xl border p-4 sm:p-5"
      style={{
        background: "rgba(10,10,20,0.98)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(139,92,246,0.32)",
        boxShadow: "0 0 50px rgba(139,92,246,0.18)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium sm:text-xs ${getStatusColor(
            item.status
          )}`}
        >
          {getStatusLabel(item.status)}
        </span>

        <span className="font-mono text-[11px] text-white/35 sm:text-xs">
          {item.date}
        </span>
      </div>

      <h4 className="mb-2 text-sm font-semibold text-white">{item.title}</h4>

      <p className="text-xs leading-relaxed text-white/60">{item.content}</p>

      <div className="mt-4 border-t border-white/5 pt-3">
        <div className="mb-2 flex justify-between text-xs">
          <span className="flex items-center gap-1 text-white/40">
            <Zap size={10} />
            პროგრესი
          </span>

          <span className="font-mono text-violet-300">{item.energy}%</span>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${item.energy}%`,
              background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
            }}
          />
        </div>
      </div>

      {item.relatedIds.length > 0 && (
        <div className="mt-4 border-t border-white/5 pt-3">
          <div className="mb-2 flex items-center gap-1">
            <Link size={10} className="text-white/30" />

            <span className="text-xs uppercase tracking-wider text-white/30">
              დაკავშირებული
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.relatedIds.map((relatedId) => {
              const relatedItem = timelineData.find((i) => i.id === relatedId);

              return (
                <button
                  key={relatedId}
                  type="button"
                  className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-xs text-white/60 transition-all hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(relatedId);
                  }}
                >
                  {relatedItem?.title}
                  <ArrowRight size={8} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        setAutoRotate(false);
      } else if (!activeNodeId) {
        setAutoRotate(true);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [activeNodeId]);

  useEffect(() => {
    if (!autoRotate || isMobile) return;

    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);

    return () => clearInterval(timer);
  }, [autoRotate, isMobile]);

  const getRelatedItems = (itemId: number) => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const toggleItem = (id: number) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
      if (!isMobile) setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = isMobile ? 130 : 245;
    const radian = (angle * Math.PI) / 180;

    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
      opacity: Math.max(
        0.38,
        Math.min(1, 0.38 + 0.62 * ((1 + Math.sin(radian)) / 2))
      ),
      zIndex: Math.round(100 + 50 * Math.sin(radian)),
    };
  };

  return (
    <div
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-start overflow-visible pt-28 sm:h-[920px] sm:pt-40"
      onClick={() => {
        setActiveNodeId(null);
        if (!isMobile) setAutoRotate(true);
      }}
    >
      <div className="relative h-[310px] w-[310px] shrink-0 sm:h-[560px] sm:w-[560px]">
        <div className="absolute inset-0 rounded-full border border-white/5" />

        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[510px] sm:w-[510px]" />

        <div className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 shadow-2xl shadow-violet-500/20 backdrop-blur-xl sm:h-20 sm:w-20">
          <Sparkles size={22} className="text-violet-300 sm:size-7" />
        </div>

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isActive = activeNodeId === item.id;
          const isRelated = isRelatedToActive(item.id);
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700"
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                opacity: isActive ? 1 : activeNodeId ? 0.28 : position.opacity,
                zIndex: isActive ? 100 : activeNodeId ? 10 : position.zIndex,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              <button type="button" className="relative block">
                <div
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-11 sm:w-11 ${
                    isActive
                      ? "scale-125 border-violet-300 bg-violet-500/30 shadow-lg shadow-violet-500/30 sm:scale-150"
                      : isRelated
                      ? "border-violet-400/70 bg-violet-500/20"
                      : "border-white/20 bg-white/5"
                  }`}
                >
                  <Icon
                    size={15}
                    className={isActive ? "text-violet-100" : "text-white/60"}
                  />
                </div>

                <span
                  className={`mt-2 block whitespace-nowrap text-[10px] font-medium sm:mt-3 sm:text-xs ${
                    isActive ? "text-white" : "text-white/45"
                  }`}
                >
                  {item.title}
                </span>
              </button>

              {isActive && !isMobile && (
                <div className="absolute left-1/2 top-[90px] z-[999] w-[360px] -translate-x-1/2">
                  <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-violet-500/50" />
                  <TimelineCard
                    item={item}
                    timelineData={timelineData}
                    toggleItem={toggleItem}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeItem && isMobile && (
        <div className="mt-16 w-[calc(100vw-32px)] max-w-[360px]">
          <TimelineCard
            item={activeItem}
            timelineData={timelineData}
            toggleItem={toggleItem}
          />
        </div>
      )}
    </div>
  );
}