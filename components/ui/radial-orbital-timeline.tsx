"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
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
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "pending":
      return "Pending";
    default:
      return "Pending";
  }
}

function TimelineCard({ item, timelineData, toggleItem }: TimelineCardProps) {
  return (
    <div
      className="relative rounded-2xl border p-4 sm:p-5"
      style={{
        background: "rgba(10,10,20,0.95)",
        backdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.3)",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.05)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Connector line */}
      <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-white/50" />

      <div className="mb-3 flex items-center justify-between">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium sm:text-xs ${getStatusColor(item.status)}`}
        >
          {getStatusLabel(item.status)}
        </span>
        <span className="font-mono text-[11px] text-white/50 sm:text-xs">
          {item.date}
        </span>
      </div>

      <h4 className="mb-2 text-sm font-semibold text-white">{item.title}</h4>
      <p className="text-xs leading-relaxed text-white/80">{item.content}</p>

      {/* Energy bar */}
      <div className="mt-4 border-t border-white/10 pt-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="flex items-center text-white/70">
            <Zap size={10} className="mr-1" />
            Energy Level
          </span>
          <span className="font-mono text-white/70">{item.energy}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${item.energy}%` }}
          />
        </div>
      </div>

      {/* Related nodes */}
      {item.relatedIds.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-3">
          <div className="mb-2 flex items-center">
            <Link size={10} className="mr-1 text-white/70" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/70">
              Connected Nodes
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.relatedIds.map((relatedId) => {
              const relatedItem = timelineData.find((i) => i.id === relatedId);
              return (
                <button
                  key={relatedId}
                  type="button"
                  className="flex h-6 items-center rounded-none border border-white/20 bg-transparent px-2 py-0 text-xs text-white/80 transition-all hover:bg-white/10 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(relatedId);
                  }}
                >
                  {relatedItem?.title}
                  <ArrowRight size={8} className="ml-1 text-white/60" />
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
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const activeItem = timelineData.find((item) => item.id === activeNodeId);

  // Responsive check
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile && !activeNodeId) setAutoRotate(false);
      else if (!mobile && !activeNodeId) setAutoRotate(true);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [activeNodeId]);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      // Close all others
      Object.keys(prev).forEach((key) => {
        newState[parseInt(key)] = false;
      });

      const opening = !prev[id];
      newState[id] = opening;

      if (opening) {
        setActiveNodeId(id);
        setAutoRotate(false);

        // Pulse related nodes
        const related = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        related.forEach((rId) => {
          newPulse[rId] = true;
        });
        setPulseEffect(newPulse);

        // Snap rotation so selected node comes to front (bottom of orbit = 90deg)
        const nodeIndex = timelineData.findIndex((item) => item.id === id);
        const targetAngle = (nodeIndex / timelineData.length) * 360;
        setRotationAngle(270 - targetAngle);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Exact formula from the original reference
  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = isMobile ? 120 : 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    // Original: zIndex uses cos, opacity uses sin
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, zIndex, opacity };
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      if (!isMobile) setAutoRotate(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-visible"
      style={{ minHeight: isMobile ? 420 : 600 }}
      onClick={handleContainerClick}
    >
      {/* Orbit wrapper — perspective gives 3D depth exactly like original */}
      <div
        ref={orbitRef}
        className="relative flex items-center justify-center"
        style={{
          width: isMobile ? 280 : 500,
          height: isMobile ? 280 : 500,
          perspective: "1000px",
        }}
      >
        {/* Orbit track ring */}
        <div
          className="absolute rounded-full border border-white/10"
          style={{
            width: isMobile ? 260 : 440,
            height: isMobile ? 260 : 440,
          }}
        />

        {/* Center orb — exact original: gradient + ping rings + white inner dot */}
        <div className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse sm:h-16 sm:w-16">
          {/* Ping ring 1 */}
          <div className="absolute h-[72px] w-[72px] rounded-full border border-white/20 animate-ping opacity-70 sm:h-20 sm:w-20" />
          {/* Ping ring 2 — delayed */}
          <div
            className="absolute h-[88px] w-[88px] rounded-full border border-white/10 animate-ping opacity-50 sm:h-24 sm:w-24"
            style={{ animationDelay: "0.5s" }}
          />
          {/* Inner white dot */}
          <div className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-md sm:h-8 sm:w-8" />
        </div>

        {/* Nodes — positioned from center using translate(x, y) exactly like original */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          // Energy halo — exact original formula
          const haloSize = item.energy * 0.5 + 40;
          const haloOffset = (item.energy * 0.5) / 2;

          return (
            <div
              key={item.id}
              ref={(el) => {
                nodeRefs.current[item.id] = el;
              }}
              className="absolute transition-all duration-700 cursor-pointer"
              style={{
                // Positioned from center of parent (which is also centered)
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Energy glow halo — exact original */}
              <div
                className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                  width: `${haloSize}px`,
                  height: `${haloSize}px`,
                  left: `-${haloOffset}px`,
                  top: `-${haloOffset}px`,
                  pointerEvents: "none",
                }}
              />

              {/* Node circle */}
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2
                  transition-all duration-300
                  ${
                    isExpanded
                      ? "scale-150 border-white bg-white text-black shadow-lg shadow-white/30"
                      : isRelated
                      ? "animate-pulse border-white bg-white/50 text-black"
                      : "border-white/40 bg-black text-white"
                  }
                `}
              >
                <Icon size={16} />
              </div>

              {/* Node label */}
              <div
                className={`
                  absolute whitespace-nowrap text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "scale-125 text-white" : "text-white/70"}
                `}
                style={{ top: 48, left: "50%", transform: isExpanded ? "translateX(-50%) scale(1.25)" : "translateX(-50%)" }}
              >
                {item.title}
              </div>

              {/* Expanded popup card — desktop only */}
              {isExpanded && !isMobile && (
                <div
                  className="absolute z-[999] w-64"
                  style={{
                    top: 80,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
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

      {/* Mobile card — renders below orbit */}
      {activeItem && isMobile && (
        <div className="mt-8 w-[calc(100vw-32px)] max-w-[360px]">
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