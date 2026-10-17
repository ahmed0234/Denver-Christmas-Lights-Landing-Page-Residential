"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { handleGetQuoteClick } from "@/lib/scrollUtils";
import {
  Sparkles,
  Sun,
  Home,
  TreePine,
  DoorOpen,
  Building2,
  Gift,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Transformation Data ──────────────────────────────────────────────────────
const transformations = [
  {
    id: 1,
    title: "Full Property Lighting",
    icon: Sparkles,
    beforeImage: "/BeforeAfter/beforeandafter/before.webp",
    afterImage: "/BeforeAfter/beforeandafter/after.webp",
  },
  {
    id: 2,
    title: "Professional Installation",
    icon: Sun,
    beforeImage: "/BeforeAfter/dayandnight/day.webp",
    afterImage: "/BeforeAfter/dayandnight/night.webp",
  },
  {
    id: 3,
    title: "Roofline Lighting",
    icon: Home,
    beforeImage: "/BeforeAfter/rooflinelightning/before.webp",
    afterImage: "/BeforeAfter/rooflinelightning/after.webp",
  },
  {
    id: 4,
    title: "Tree & Landscape Lighting",
    icon: TreePine,
    beforeImage: "/BeforeAfter/treelightning/before.webp",
    afterImage: "/BeforeAfter/treelightning/after.webp",
  },
  {
    id: 5,
    title: "Entryway & Porch Lighting",
    icon: DoorOpen,
    beforeImage: "/BeforeAfter/entrywaylightning/before.webp",
    afterImage: "/BeforeAfter/entrywaylightning/after.webp",
  },
  {
    id: 6,
    title: "Custom Lighting Design",
    icon: Building2,
    beforeImage: "/BeforeAfter/commercialbuilding/before.webp",
    afterImage: "/BeforeAfter/commercialbuilding/after.webp",
  },
];

// ─── Slider ───────────────────────────────────────────────────────────────────
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
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-150 ${
            isDragging ? "scale-110 shadow-lg" : "hover:scale-105"
          }`}
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow: isDragging
              ? "0 4px 20px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.6)"
              : "0 2px 16px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.35)",
            backdropFilter: "blur(4px)",
          }}
        >
          <ChevronLeft
            size={11}
            className="text-neutral-700"
            style={{ marginRight: "-1px" }}
          />
          <ChevronRight
            size={11}
            className="text-neutral-700"
            style={{ marginLeft: "-1px" }}
          />
        </div>
      </div>
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none z-10 select-none"
        style={{
          background: "rgba(10,8,8,0.72)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        Before
      </div>
      <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none z-10 select-none"
        style={{
          background: "var(--accent)",
          boxShadow: "0 2px 8px var(--accent-glow-soft)",
        }}
      >
        After
      </div>
    </div>
  );
}

// ─── Transformation Card ───────────────────────────────────────────────────────
function TransformationCard({
  item,
}: {
  item: (typeof transformations)[0];
  index: number;
}) {
  const Icon = item.icon;

  const normalBg = `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`;
  const hoverBg = `linear-gradient(160deg, var(--bg-elevated) 0%, var(--bg-card) 100%) padding-box, var(--card-border-gradient) border-box`;
  const normalShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`;
  const hoverShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card-hover)`;

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: normalBg,
        border: "2px solid transparent",
        boxShadow: normalShadow,
        transition: "background 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = hoverBg;
        el.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = normalBg;
        el.style.boxShadow = normalShadow;
      }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <BeforeAfterSlider
          beforeImage={item.beforeImage}
          afterImage={item.afterImage}
          beforeAlt={`${item.title} before`}
          afterAlt={`${item.title} after`}
        />
      </div>
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{
          borderTop: "1.5px solid var(--border-color)",
          background: `linear-gradient(180deg, var(--bg-elevated) 0%, var(--gradient-card-bottom) 100%)`,
        }}
      >
        <Icon
          size={22}
          style={{
            color: "var(--gold)",
            filter: "drop-shadow(0 0 4px var(--gold-glow))",
            flexShrink: 0,
          }}
        />
        <span
          className="text-[13px] sm:text-base 2xl:text-lg font-medium tracking-wide font-sans"
          style={{ color: "var(--text-heading)" }}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
}

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function SectionEyebrow() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div
        className="h-px w-12 sm:w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
        }}
      />
      <span
        className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ color: "var(--accent)" }}
      >
        ✦ what's Included ✦
      </span>
      <div
        className="h-px w-12 sm:w-20"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Bottom CTA Bar ───────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6 rounded-2xl max-w-[1280px] mx-auto"
      style={{
        background: `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`,
        backdropFilter: "blur(12px)",
        border: "2px solid transparent",
        boxShadow: `inset 0 1px 0 var(--highlight-card), var(--shadow-card-hover)`,
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)`,
            border: "1px solid var(--border-color)",
            boxShadow: "inset 0 1px 0 var(--highlight-surface)",
          }}
        >
          <Gift
            size={20}
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
          />
        </div>
        <div>
          <p
            className="text-lg sm:text-xl 2xl:text-3xl font-bold leading-tight font-sans"
            style={{ color: "var(--text-heading)" }}
          >
            Your Home Could Be Next
          </p>
          <p
            className="text-sm 2xl:text-lg mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Let us make your home the brightest on the block.
          </p>
        </div>
      </div>

      <a
        href="#quote"
        id="before-after-cta-quote"
        onClick={handleGetQuoteClick}
        className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide whitespace-nowrap w-full sm:w-auto justify-center flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
          boxShadow: `var(--shadow-btn), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
        }}
      >
        <span
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)",
          }}
        />
        <span className="relative text-amber-950 font-semibold">Get Your Free Quote</span>
        <ArrowRight size={15} className="relative text-amber-950 font-bold" />
      </a>
    </div>
  );
}

// ─── Static bokeh ─────────────────────────────────────────────────────────────
const BOKEH = [
  { left: "7%", top: "10%", size: 5, gold: true, dur: 3.5, delay: 0 },
  { left: "93%", top: "7%", size: 4, gold: false, dur: 4.0, delay: 0.7 },
  { left: "14%", top: "86%", size: 6, gold: true, dur: 3.2, delay: 1.2 },
  { left: "86%", top: "80%", size: 4, gold: false, dur: 4.5, delay: 0.4 },
  { left: "50%", top: "4%", size: 3, gold: true, dur: 3.8, delay: 1.8 },
  { left: "3%", top: "48%", size: 3, gold: false, dur: 5.0, delay: 2.1 },
  { left: "97%", top: "44%", size: 5, gold: true, dur: 3.6, delay: 0.9 },
];

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function BeforeandAfter() {
  return (
    <section
      id="before-after"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/BeforeAfter/BackGroundSubtle.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          className="object-cover object-[50%_30%] md:object-center opacity-65 md:opacity-90 brightness-90 saturate-90 contrast-105"
          quality={82}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 45%, rgba(9,7,7,0.48) 0%, rgba(9,7,7,0.78) 60%, rgba(9,7,7,0.96) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, var(--accent-glow-faint) 0%, transparent 70%)",
        }}
      />

      {/* Bokeh */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {BOKEH.map((b, i) => (
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

      {/* Main content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-8 pb-8">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="mb-5">
            <SectionEyebrow />
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08] tracking-tight mb-5 font-playfair"
            style={{ color: "var(--text-heading)" }}
          >
            Imagine Your <span className="text-accent-gradient">Home</span> Like
            This
          </h2>
          <p
            className="text-base sm:text-lg max-w-xl"
            style={{ color: "var(--text-muted)" }}
          >
            From clean roofline lighting to complete residential holiday
            displays, our team transforms Denver homes into memorable Christmas
            experiences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {transformations.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <BottomCTA />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--fade-to) 100%)",
        }}
      />
    </section>
  );
}
