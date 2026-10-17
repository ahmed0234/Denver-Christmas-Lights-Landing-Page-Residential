"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Snowflake,
  Home,
  Building2,
  Wrench,
  PackageOpen,
  PenTool,
  Gem,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Static bokeh ─────────────────────────────────────────────────────────────
const SERVICE_BOKEH = [
  { left: "5%", top: "20%", size: 4, gold: true, dur: 3.8, delay: 0.2 },
  { left: "95%", top: "15%", size: 3, gold: false, dur: 4.2, delay: 0.8 },
  { left: "10%", top: "75%", size: 5, gold: true, dur: 3.5, delay: 1.4 },
  { left: "88%", top: "70%", size: 4, gold: false, dur: 4.8, delay: 0.5 },
  { left: "50%", top: "5%", size: 3, gold: true, dur: 3.2, delay: 1.8 },
  { left: "2%", top: "50%", size: 3, gold: false, dur: 5.0, delay: 2.3 },
  { left: "98%", top: "45%", size: 4, gold: true, dur: 3.6, delay: 1.0 },
];

function SectionEyebrow() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div
        className="h-px w-16 sm:w-24"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
        }}
      />
      <span
        className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
        style={{ color: "var(--accent)" }}
      >
        WHAT WE OFFER
      </span>
      <span
        className="text-[10px] tracking-[0.15em] hidden sm:inline"
        style={{ color: "var(--accent)", opacity: 0.65 }}
      >
        ····
      </span>
      <div
        className="h-px w-16 sm:w-24"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Before / After Slider (inline, for Featured Cards) ───────────────────────
function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const rafId = useRef<number | null>(null);
  const posRef = useRef(50);

  const applyPos = useCallback((pos: number) => {
    posRef.current = pos;
    if (clipRef.current) {
      clipRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    }
    if (lineRef.current) {
      lineRef.current.style.left = `${pos}%`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${pos}%`;
    }
    if (containerRef.current) {
      containerRef.current.setAttribute("aria-valuenow", String(Math.round(pos)));
    }
  }, []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        if (rect.width <= 0) return;
        const rawPos = ((clientX - rect.left) / rect.width) * 100;
        const clamped = Math.max(0, Math.min(100, rawPos));
        applyPos(clamped);
      });
    },
    [applyPos]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const stopDragging = useCallback(
    (e?: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      setSliderPos(posRef.current);
      if (e) {
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          // Safe fallback
        }
      }
    },
    []
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let step = 0;
      if (e.key === "ArrowLeft") step = e.shiftKey ? -5 : -2;
      else if (e.key === "ArrowRight") step = e.shiftKey ? 5 : 2;
      else if (e.key === "PageDown") step = -10;
      else if (e.key === "PageUp") step = 10;
      else if (e.key === "Home") step = -100;
      else if (e.key === "End") step = 100;

      if (step !== 0) {
        e.preventDefault();
        const next = Math.max(0, Math.min(100, posRef.current + step));
        applyPos(next);
        setSliderPos(next);
      }
    },
    [applyPos]
  );

  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
        setSliderPos(posRef.current);
      }
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    window.addEventListener("pointercancel", handleGlobalPointerUp);
    return () => {
      window.removeEventListener("pointerup", handleGlobalPointerUp);
      window.removeEventListener("pointercancel", handleGlobalPointerUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden ${
        isDragging ? "cursor-grabbing" : "cursor-ew-resize"
      }`}
      style={{
        touchAction: isDragging ? "none" : "pan-y",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      aria-label="Before and after comparison slider"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        loading="lazy"
        decoding="async"
        quality={90}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />
      <div
        ref={clipRef}
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          willChange: isDragging ? "clip-path" : "auto",
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="lazy"
          decoding="async"
          quality={90}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          draggable={false}
        />
      </div>
      <div
        ref={lineRef}
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-10"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.92) 85%, rgba(255,255,255,0) 100%)",
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))",
          willChange: isDragging ? "left" : "auto",
        }}
      />
      <div
        ref={handleRef}
        className="absolute top-1/2 z-20 pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: "translate(-50%, -50%)",
          willChange: isDragging ? "left" : "auto",
        }}
      >
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-150 ${
            isDragging ? "scale-110 shadow-lg" : "hover:scale-105"
          }`}
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow: isDragging
              ? "0 4px 20px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.6)"
              : "0 2px 16px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.4)",
            backdropFilter: "blur(4px)",
          }}
        >
          <ChevronLeft
            size={10}
            className="text-neutral-700"
            style={{ marginRight: "-1px" }}
          />
          <ChevronRight
            size={10}
            className="text-neutral-700"
            style={{ marginLeft: "-1px" }}
          />
        </div>
      </div>
      <div
        className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none z-10 select-none"
        style={{
          background: "rgba(9,7,7,0.78)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
        }}
      >
        BEFORE
      </div>
      <div
        className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none z-10 select-none"
        style={{
          background: "var(--accent)",
          boxShadow: "0 2px 10px var(--accent-glow-soft)",
          borderRadius: "4px",
        }}
      >
        AFTER
      </div>
    </div>
  );
}

// ─── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({
  title,
  icon: Icon,
  beforeImage,
  afterImage,
}: {
  title: string;
  icon: React.ElementType;
  beforeImage: string;
  afterImage: string;
  delay?: number;
}) {
  const baseShadow = `var(--shadow-card), inset 0 1px 0 var(--highlight-card)`;
  const hoverShadow = `var(--shadow-card-hover), 0 0 0 1px var(--accent), inset 0 1px 0 var(--highlight-card)`;

  return (
    <div
      className="group relative flex-1 min-w-0 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
      style={{
        border: "1px solid var(--border-color)",
        boxShadow: baseShadow,
        transition: "box-shadow 0.3s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = baseShadow;
      }}
    >
      {/* Title Badge */}
      <div
        className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%)`,
          backdropFilter: "blur(10px)",
          border: "1px solid var(--accent)",
          boxShadow: `0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 var(--highlight-surface)`,
        }}
      >
        <div
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--accent-glow-faint)" }}
        >
          <Icon size={16} style={{ color: "var(--accent)" }} />
        </div>
        <span
          className="text-[12px] 2xl:text-lg font-semibold tracking-wide whitespace-nowrap"
          style={{ color: "var(--text-heading)" }}
        >
          {title}
        </span>
      </div>
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-[1.015] transition-transform duration-500 ease-out h-full w-full">
          <BeforeAfterSlider
            beforeImage={beforeImage}
            afterImage={afterImage}
            beforeAlt={`${title} before`}
            afterAlt={`${title} after`}
          />
        </div>
      </div>
    </div>
  );
}

// ─── String Lights SVG ────────────────────────────────────────────────────────
function StringLightsTop() {
  const bulbs = [
    { x: 8, y: 30, color: "var(--gold)" },
    { x: 22, y: 34, color: "var(--accent)" },
    { x: 36, y: 30, color: "var(--gold)" },
    { x: 50, y: 34, color: "#22c55e" },
    { x: 64, y: 30, color: "var(--accent)" },
    { x: 78, y: 34, color: "var(--gold)" },
    { x: 92, y: 30, color: "var(--accent)" },
  ];
  return (
    <svg
      className="absolute top-0 left-0 right-0 w-full pointer-events-none z-10"
      height="44"
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 14 Q12.5 20, 25 14 Q37.5 8, 50 14 Q62.5 20, 75 14 Q87.5 8, 100 14"
        stroke="rgba(120,70,40,0.55)"
        strokeWidth="0.6"
        fill="none"
      />
      {bulbs.map((b, i) => (
        <g key={i}>
          <line
            x1={b.x}
            y1="14"
            x2={b.x}
            y2={b.y - 4}
            stroke="rgba(120,70,40,0.5)"
            strokeWidth="0.5"
          />
          <rect
            x={b.x - 1.5}
            y={b.y - 4}
            width="3"
            height="2.5"
            rx="0.5"
            fill="rgba(80,50,30,0.8)"
          />
          <ellipse
            cx={b.x}
            cy={b.y + 4}
            rx="3"
            ry="4.5"
            fill={b.color}
            opacity="0.88"
          />
          <ellipse
            cx={b.x}
            cy={b.y + 4}
            rx="5.5"
            ry="7"
            fill={b.color}
            opacity="0.12"
          />
        </g>
      ))}
    </svg>
  );
}

function StringLightsLeft() {
  const bulbs = [
    { y: 20, color: "var(--gold)" },
    { y: 38, color: "var(--accent)" },
    { y: 56, color: "var(--gold)" },
    { y: 74, color: "#22c55e" },
    { y: 88, color: "var(--accent)" },
  ];
  return (
    <svg
      className="absolute left-0 top-0 bottom-0 h-full pointer-events-none z-10"
      width="44"
      viewBox="0 0 44 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M14 0 Q20 12.5, 14 25 Q8 37.5, 14 50 Q20 62.5, 14 75 Q8 87.5, 14 100"
        stroke="rgba(120,70,40,0.55)"
        strokeWidth="0.6"
        fill="none"
      />
      {bulbs.map((b, i) => (
        <g key={i}>
          <line
            x1="14"
            y1={b.y}
            x2="22"
            y2={b.y}
            stroke="rgba(120,70,40,0.5)"
            strokeWidth="0.5"
          />
          <rect
            x="22"
            y={b.y - 1.5}
            width="2.5"
            height="3"
            rx="0.5"
            fill="rgba(80,50,30,0.8)"
          />
          <ellipse
            cx="30"
            cy={b.y}
            rx="4.5"
            ry="3"
            fill={b.color}
            opacity="0.88"
          />
          <ellipse
            cx="30"
            cy={b.y}
            rx="7"
            ry="5.5"
            fill={b.color}
            opacity="0.12"
          />
        </g>
      ))}
    </svg>
  );
}

function LightStrandRight() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-20 pointer-events-none z-0"
      viewBox="0 0 80 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M70 5 C58 25, 68 45, 55 65 C42 85, 65 105, 52 125 C39 145, 62 165, 50 190"
        stroke="rgba(120,70,40,0.5)"
        strokeWidth="1.2"
        fill="none"
      />
      {[
        { cx: 70, cy: 12 },
        { cx: 60, cy: 40 },
        { cx: 68, cy: 68 },
        { cx: 55, cy: 98 },
        { cx: 63, cy: 130 },
        { cx: 52, cy: 162 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="9" fill="var(--gold)" opacity="0.12" />
          <circle
            cx={p.cx}
            cy={p.cy}
            r="4.5"
            fill="var(--gold)"
            opacity="0.9"
          />
          <circle cx={p.cx} cy={p.cy} r="1.5" fill="white" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
  hasStringLights?: boolean;
  hasLightStrand?: boolean;
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  hasStringLights = false,
  hasLightStrand = false,
}: ServiceCardProps) {
  const clipPath =
    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
  const baseShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`;
  const hoverShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card-hover)`;

  return (
    <div className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5">
      {/* Floating icon above card */}
      <div className="relative z-20 mb-[-26px] flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)`,
            border: "1.5px solid var(--accent)",
            boxShadow: "var(--benefit-icon-shadow)",
          }}
        >
          <Icon
            size={22}
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
            className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
          />
        </div>
      </div>

      {/* Card body */}
      <div
        className="service-card-border relative w-full overflow-hidden"
        style={{
          clipPath,
          background: `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--bg-card) 50%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`,
          border: "1.5px solid transparent",
          boxShadow: baseShadow,
          transition: "box-shadow 0.35s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = hoverShadow;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = baseShadow;
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, var(--accent-glow-faint) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-x-10 top-0 h-px pointer-events-none z-[2]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--highlight-card), transparent)",
          }}
        />

        {hasStringLights && (
          <>
            <StringLightsTop />
            <StringLightsLeft />
          </>
        )}
        {hasLightStrand && <LightStrandRight />}

        <div className="relative z-[4] flex flex-col items-center text-center pt-10 pb-8 px-6">
          <h3
            className="text-2xl font-bold leading-snug mb-3 font-playfair whitespace-pre-line"
            style={{ color: "var(--text-heading)" }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-7"
            style={{ color: "var(--text-muted)", maxWidth: "210px" }}
          >
            {description}
          </p>
          <div className="flex items-center gap-2.5 mt-auto opacity-45 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="w-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold-glow))",
              }}
            />
            <div
              className="w-[6px] h-[6px] rotate-45 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, var(--gold), var(--gold-dark))`,
                boxShadow: "0 0 8px var(--gold-glow)",
              }}
            />
            <div
              className="w-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--gold-glow), transparent)",
              }}
            />
          </div>
        </div>

        <div
          className="absolute w-[3px] h-[3px] rounded-full pointer-events-none z-[5]"
          aria-hidden="true"
          style={{
            top: "0px",
            left: "19px",
            background: "var(--gold-glow)",
            boxShadow: "0 0 5px var(--gold-glow-faint)",
          }}
        />
        <div
          className="absolute w-[3px] h-[3px] rounded-full pointer-events-none z-[5]"
          aria-hidden="true"
          style={{
            bottom: "0px",
            right: "19px",
            background: "var(--gold-glow)",
            boxShadow: "0 0 5px var(--gold-glow-faint)",
          }}
        />
      </div>
    </div>
  );
}

// ─── Trust Item ───────────────────────────────────────────────────────────────
function TrustItem({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)`,
          border: "1px solid var(--border-color)",
          boxShadow: "inset 0 1px 0 var(--highlight-surface)",
        }}
      >
        <Icon
          size={18}
          style={{
            color: "var(--accent)",
            filter: "drop-shadow(0 0 4px var(--accent-glow))",
          }}
        />
      </div>
      <div>
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: "var(--text-heading)" }}
        >
          {title}
        </p>
        <p
          className="text-[11px] leading-snug mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ─── Main Services Export ─────────────────────────────────────────────────────
export default function Services() {
  const featuredCards = [
    {
      title: "Residential Installation",
      icon: Home,
      beforeImage: "/BeforeAfter/services/before.webp",
      afterImage: "/BeforeAfter/services/after.webp",
    },
    {
      title: "Large Home Installation",
      icon: Building2,
      beforeImage: "/BeforeAfter/LargeHouse/Before.webp",
      afterImage: "/BeforeAfter/LargeHouse/After.webp",
    },
  ];

  const serviceCards = [
    {
      icon: Wrench,
      title: "Maintenance\n& Support",
      description:
        "We keep your lights shining all season long. Quick response for any issue, replacements, and tune-ups whenever you need.",
      hasStringLights: false,
      hasLightStrand: false,
    },
    {
      icon: PackageOpen,
      title: "Take Down\n& Storage",
      description:
        "We handle the takedown, careful packing, and off-season storage so your lights are safe and ready for next year.",
      hasStringLights: true,
      hasLightStrand: false,
    },
    {
      icon: PenTool,
      title: "Custom Design\n& Planning",
      description:
        "Every property is unique. We create custom lighting designs tailored to your home or business for the perfect look.",
      hasStringLights: false,
      hasLightStrand: false,
    },
    {
      icon: Gem,
      title: "Premium Lights\n& Materials",
      description:
        "We use commercial-grade LED lights that are brighter, safer, and built to withstand Colorado winters.",
      hasStringLights: false,
      hasLightStrand: true,
    },
  ];

  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Fully Insured",
      subtitle: "For Your Peace of Mind",
    },
    {
      icon: Star,
      title: "Satisfaction Guaranteed",
      subtitle: "We're Not Happy Until You Are",
    },
    {
      icon: Clock,
      title: "On-Time & Reliable",
      subtitle: "We Respect Your Time",
    },
    {
      icon: MapPin,
      title: "Locally Owned",
      subtitle: "Proudly Serving Denver, CO",
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 8%, var(--accent-glow-faint) 0%, transparent 65%)",
        }}
      />

      {/* Bokeh */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {SERVICE_BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-bokeh"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              backgroundColor: b.gold ? "var(--gold)" : "var(--accent)",
              filter: "blur(2px)",
              ["--bokeh-dur" as string]: `${b.dur}s`,
              ["--bokeh-delay" as string]: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-24 pb-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="mb-4">
            <SectionEyebrow />
          </div>
          <div className="mb-5">
            <Snowflake
              size={18}
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 8px var(--accent-glow))",
              }}
            />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[55px] font-bold leading-[1.08] tracking-tight mb-6 font-sans">
            <span style={{ color: "var(--text-heading)" }}>
              Complete Residential{" "}
            </span>
            <span className="text-accent-gradient">
              Christmas Light Installation
            </span>{" "}
            in Denver
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-[540px]"
            style={{ color: "var(--text-muted)" }}
          >
            Clean, professionally installed lighting designed to complement the
            shape and structure of your home
          </p>
        </div>

        {/* Featured cards */}
        <div className="flex flex-col sm:flex-row gap-5 mb-5">
          {featuredCards.map((card) => (
            <FeaturedCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              beforeImage={card.beforeImage}
              afterImage={card.afterImage}
            />
          ))}
        </div>

        {/* Four service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {serviceCards.map((card) => (
            <ServiceCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              hasStringLights={card.hasStringLights}
              hasLightStrand={card.hasLightStrand}
            />
          ))}
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 px-6 py-5 rounded-2xl"
          style={{
            background: `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`,
            border: "1px solid transparent",
            backdropFilter: "blur(8px)",
            boxShadow: `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`,
          }}
        >
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className="relative flex-1 min-w-0 w-full sm:w-auto"
            >
              {i > 0 && (
                <div
                  className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
                  style={{ backgroundColor: "var(--border-color)" }}
                />
              )}
              <div className={i > 0 ? "sm:pl-4" : ""}>
                <TrustItem
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--fade-to) 100%)",
        }}
      />
    </section>
  );
}
