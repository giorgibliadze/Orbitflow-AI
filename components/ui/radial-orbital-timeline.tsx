"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Link, Sparkles, Zap } from "lucide-react";
import type { TimelineItem } from "@/types";

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  useEffect(() => {
    if (!autoRotate) return;

    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);

    return () => clearInterval(timer);
  }, [autoRotate]);

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
      setAutoRotate(true);
    } else {
      setActiveNodeId(id);
      setAutoRotate(false);
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 245;
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

  const getStatusColor = (status: TimelineItem["status"]) => {
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
  };

  return (
    <div
      className="relative mx-auto flex h-[760px] w-full max-w-5xl items-center justify-center overflow-visible"
      onClick={() => {
        setActiveNodeId(null);
        setAutoRotate(true);
      }}
    >
      <div className="absolute h-[560px] w-[560px] rounded-full border border-white/5" />
      <div className="absolute h-[510px] w-[510px] rounded-full border border-white/10" />

      <div className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/20 shadow-2xl shadow-violet-500/20 backdrop-blur-xl">
        <Sparkles size={28} className="text-violet-300" />
      </div>

      {timelineData.map((item, index) => {
        const position = calculateNodePosition(index, timelineData.length);
        const isActive = activeNodeId === item.id;
        const isRelated = isRelatedToActive(item.id);
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            className="absolute cursor-pointer transition-all duration-700"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              opacity: isActive ? 1 : activeNodeId ? 0.28 : position.opacity,
              zIndex: isActive ? 30 : activeNodeId ? 10 : position.zIndex,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleItem(item.id);
            }}
          >
            <div
              className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "scale-150 border-violet-300 bg-violet-500/30 shadow-lg shadow-violet-500/30"
                  : isRelated
                  ? "border-violet-400/70 bg-violet-500/20"
                  : "border-white/20 bg-white/5"
              }`}
            >
              <Icon
                size={16}
                className={isActive ? "text-violet-100" : "text-white/60"}
              />
            </div>

            <span
              className={`mt-3 block whitespace-nowrap text-xs font-medium ${
                isActive ? "text-white" : "text-white/45"
              }`}
            >
              {item.title}
            </span>
          </button>
        );
      })}

      {activeItem && (
        <div
          className="absolute left-1/2 top-[455px] z-[999] w-[360px] -translate-x-1/2 rounded-2xl border p-5"
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
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusColor(
                activeItem.status
              )}`}
            >
              {activeItem.status === "completed"
                ? "Completed"
                : activeItem.status === "in-progress"
                ? "In Progress"
                : "Pending"}
            </span>

            <span className="font-mono text-xs text-white/35">
              {activeItem.date}
            </span>
          </div>

          <h4 className="mb-2 text-sm font-semibold text-white">
            {activeItem.title}
          </h4>

          <p className="text-xs leading-relaxed text-white/60">
            {activeItem.content}
          </p>

          <div className="mt-4 border-t border-white/5 pt-3">
            <div className="mb-2 flex justify-between text-xs">
              <span className="flex items-center gap-1 text-white/40">
                <Zap size={10} />
                Progress
              </span>

              <span className="font-mono text-violet-300">
                {activeItem.energy}%
              </span>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${activeItem.energy}%`,
                  background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                }}
              />
            </div>
          </div>

          {activeItem.relatedIds.length > 0 && (
            <div className="mt-4 border-t border-white/5 pt-3">
              <div className="mb-2 flex items-center gap-1">
                <Link size={10} className="text-white/30" />
                <span className="text-xs uppercase tracking-wider text-white/30">
                  Connected
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {activeItem.relatedIds.map((relatedId) => {
                  const relatedItem = timelineData.find(
                    (i) => i.id === relatedId
                  );

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
      )}
    </div>
  );
}