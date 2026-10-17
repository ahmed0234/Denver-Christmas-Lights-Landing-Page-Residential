"use client";

/**
 * ProcessSection.tsx
 * "Our Simple Process" — three-step horizontal timeline section.
 *
 * Fully optimized for sub-1s Core Web Vitals:
 * - 0 JS animation blocking (replaces heavy GSAP/ScrollTrigger with native CSS / Motion)
 * - 0 Layout thrashing / continuous forced reflows
 * - Background image lazily loaded with optimal quality (no priority abuse)
 * - Accessible, responsive, and buttery-smooth.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { handleGetQuoteClick } from "@/lib/scrollUtils";
import {
  Snowflake,
  Sparkle,
  ClipboardPen,
  Home,
  TreePine,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
} from "lucide-react";

const CONTENT = {
  eyebrow: "Our Simple Process",
  heading: {
    line1: "Professional Christmas Light",
    line2Prefix: "Installation in ",
    line2Highlight: "Three Simple Steps",
  },
  subtitle: "From quote to glow we make it effortless.",
  steps: [
    {
      number: "01",
      icon: ClipboardPen,
      title: "Request Your Free Quote",
      description:
        "Tell us about your home, preferred lighting style and ideal installation timeline.",
    },
    {
      number: "02",
      icon: Home,
      title: "Approve Your Lighting Plan",
      description:
        "We'll recommend a design and provide a clear proposal for your residential Christmas light installation.",
    },
    {
      number: "03",
      icon: TreePine,
      title: "Enjoy Your Holiday Display",
      description:
        "Our team installs your lights so you can enjoy a professionally decorated home without doing the work yourself.",
    },
  ],
  cta: "Start My Free Quote",
  trust: [
    { icon: ShieldCheck, label: "Fully Insured" },
    { icon: Clock, label: "On-Time Installation" },
    { icon: Star, label: "Satisfaction Guaranteed" },
  ],
};

// Fixed, deterministic particle field so server/client markup always matches.
const DUST = Array.from({ length: 24 }, (_, i) => {
  const x = (i * 41 + 7) % 100;
  const y = (i * 29 + 11) % 100;
  const size = 2 + (i % 3);
  const duration = 16 + (i % 6) * 3;
  const delay = (i % 8) * 1.4;
  const alt = i % 2 === 0;
  return { id: i, x, y, size, duration, delay, alt };
});

const SPARKLES = Array.from({ length: 6 }, (_, i) => {
  const x = (i * 63 + 17) % 100;
  const y = (i * 31 + 9) % 100;
  const duration = 5 + (i % 3);
  const delay = i * 0.8;
  return { id: i, x, y, duration, delay };
});

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRowRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [line, setLine] = useState({ left: 0, width: 0, top: 0, midLeft: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function measure() {
      const container = timelineRowRef.current;
      const first = iconRefs.current[0];
      const mid = iconRefs.current[1];
      const last = iconRefs.current[2];
      if (!container || !first || !mid || !last) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const midRect = mid.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const firstCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
      const midCenterX = midRect.left + midRect.width / 2 - containerRect.left;
      const lastCenterX = lastRect.left + lastRect.width / 2 - containerRect.left;
      const centerY = firstRect.top + firstRect.height / 2 - containerRect.top;

      setLine({
        left: firstCenterX,
        width: lastCenterX - firstCenterX,
        top: centerY,
        midLeft: midCenterX - firstCenterX,
      });
    }

    // Passive measurement once after initial paint
    timeoutId = setTimeout(measure, 100);
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(measure, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full overflow-hidden bg-[var(--color-bg,#070502)] py-28 sm:py-32 md:py-12"
    >
      {/* Background Image Layer (LCP/TBT Optimized: lazy loaded, sub-60KB WebP) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Process/Background.webp"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          aria-hidden="true"
          className="object-cover object-center opacity-40 sm:opacity-90 md:opacity-50 brightness-95 saturate-110 contrast-105"
          quality={75}
        />
        {/* Soft Heading Legibility Mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 45% at 50% 22%, rgba(7,5,2,0.72) 0%, rgba(7,5,2,0.40) 60%, transparent 100%)",
          }}
        />
        {/* Top and Bottom Edge Smooth Fades */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg,#070502) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg,#070502) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Ambient Golden Radial Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[18rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-gold,#e8b873)]/[0.08] blur-[120px]" />
        <div className="absolute left-1/2 top-[58%] h-[24rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.22] blur-[90px]" />
        <div className="absolute left-1/4 top-[65%] h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
        <div className="absolute right-1/4 top-[65%] h-56 w-56 translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
      </div>

      {/* Floating golden dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {DUST.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[var(--color-gold-light,#f8e3ab)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.12,
              animation: `${
                p.alt ? "process-float-alt" : "process-float"
              } ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
        {/* Tiny sparkles */}
        {SPARKLES.map((s) => (
          <Sparkle
            key={s.id}
            className="absolute text-[var(--color-gold-light,#f8e3ab)]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: 10,
              height: 10,
              opacity: 0.14,
              animation: `process-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
            strokeWidth={1}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <div className="flex flex-col items-center gap-3">
          <Snowflake
            className="h-4 w-4 text-[var(--color-gold,#e8b873)] drop-shadow-[0_0_6px_var(--color-gold,#e8b873)]"
            strokeWidth={1.5}
          />
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-gold,#e8b873)]/60 sm:w-16" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold,#e8b873)] sm:text-sm">
              {CONTENT.eyebrow}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-gold,#e8b873)]/60 sm:w-16" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-6 flex flex-col items-center gap-1 font-sans text-[2.1rem] font-bold tracking-tight text-[var(--color-text-primary,#f7f3ec)] sm:gap-2 sm:text-4xl md:text-5xl lg:text-[3.75rem]">
          <span className="leading-[1.2]">{CONTENT.heading.line1} </span>
          <span className="leading-[1.2]">
            {CONTENT.heading.line2Prefix}
            <span className="bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(232,184,115,0.35)]">
              {CONTENT.heading.line2Highlight}
            </span>
          </span>
        </h2>

        {/* Divider between heading and subtitle */}
        <div className="mt-6 flex items-center gap-3 origin-center">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
          <Snowflake
            className="h-3 w-3 shrink-0 text-[var(--color-gold,#e8b873)]/70"
            strokeWidth={1.5}
          />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
        </div>

        {/* Subtitle */}
        <p className="mt-5 max-w-xl text-sm text-[var(--color-text-muted,#cbc3b6)]/80 sm:text-base">
          {CONTENT.subtitle}
        </p>

        {/* Timeline */}
        <div className="relative mt-12 w-full sm:mt-24 md:mt-10">
          {/* Mobile connecting line (vertical) */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 w-2 -translate-x-1/2 overflow-hidden md:hidden">
            <div className="absolute inset-0 rounded-full bg-[var(--color-gold,#e8b873)]/20 blur-[6px]" />
            <div
              className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[var(--color-gold,#e8b873)]/70 via-[var(--color-gold-light,#f8e3ab)]/80 to-[var(--color-gold,#e8b873)]/70"
            />
            <div className="timeline-shine-vertical absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[var(--color-gold-light,#ffffff)] to-transparent drop-shadow-[0_0_8px_rgba(248,227,171,1)]" />
          </div>

          <div
            ref={timelineRowRef}
            className="relative grid grid-cols-1 gap-16 sm:gap-20 md:grid-cols-3 md:gap-6"
          >
            {/* Desktop connecting line */}
            {line.width > 0 && (
              <div
                className="pointer-events-none absolute hidden md:block"
                style={{ left: line.left, top: line.top, width: line.width, height: 0 }}
              >
                <div className="relative h-0 w-full">
                  <div className="absolute inset-x-0 top-0 h-4 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/35 blur-[14px]" />
                  <div
                    className="absolute inset-x-0 top-0 h-[2px] origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--color-gold-dark,#a9762f)]/50 via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)]/50 shadow-[0_0_12px_3px_rgba(232,184,115,0.5)]"
                  />
                  <div className="absolute inset-x-0 top-0 h-6 -translate-y-1/2 overflow-hidden">
                    <div className="timeline-shine absolute top-1/2 h-[3px] w-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white via-[var(--color-gold-light,#f8e3ab)] to-transparent drop-shadow-[0_0_10px_rgba(248,227,171,1)]" />
                  </div>
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: 0 }}
                  />
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: line.midLeft, animationDelay: "1.1s" }}
                  />
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: line.width, animationDelay: "2.2s" }}
                  />
                </div>
              </div>
            )}

            {CONTENT.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="process-step relative flex flex-col items-center"
                >
                  {/* Number */}
                  <span className="select-none bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text font-sans text-5xl font-black text-transparent opacity-60 drop-shadow-[0_0_14px_rgba(232,184,115,0.4)] sm:text-6xl">
                    {step.number}
                  </span>

                  {/* Icon circle with GPU float */}
                  <div className="relative mt-4 sm:mt-5">
                    <div className="absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/35 blur-2xl" />
                    <div
                      ref={(el) => {
                        iconRefs.current[i] = el;
                      }}
                      className="process-icon-float relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/80 via-[var(--color-gold,#e8b873)]/40 to-[var(--color-gold-dark,#a9762f)]/70 p-[1.5px] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)] sm:h-28 sm:w-28"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-bg-elevated,#1a130a)]/90 to-[var(--color-bg,#070502)]/95 shadow-[inset_0_2px_3px_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                        <div className="absolute inset-0 rounded-full bg-[var(--color-gold,#e8b873)]/10 blur-md" />
                        <Icon
                          className="relative h-9 w-9 text-[var(--color-gold-light,#f8e3ab)] drop-shadow-[0_0_8px_rgba(232,184,115,0.85)] sm:h-10 sm:w-10"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-xl font-bold text-[var(--color-text-primary,#f7f3ec)] sm:text-xl">
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <span className="mt-3 h-px w-11 bg-gradient-to-r from-transparent via-[var(--color-gold,#e8b873)]/70 to-transparent" />

                  {/* Description */}
                  <p className="mx-auto mt-4 max-w-[15rem] text-sm leading-relaxed text-[var(--color-text-muted,#cbc3b6)]/75">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="process-cta relative mt-10 sm:mt-10">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/50 opacity-70 blur-2xl animate-pulse" />
          <button
            type="button"
            onClick={handleGetQuoteClick}
            className="group relative flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/90 via-[var(--color-gold,#e8b873)]/70 to-[var(--color-gold-dark,#a9762f)]/90 p-[1.5px] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] sm:w-auto cursor-pointer transition-transform duration-200 hover:-translate-y-1 active:translate-y-0 active:scale-[0.99]"
          >
            <span className="flex w-full items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] px-3 py-3 shadow-[inset_0_2px_2px_rgba(255,255,255,0.65),inset_0_-6px_10px_rgba(0,0,0,0.3)] sm:px-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                <Sparkles
                  className="h-4 w-4 text-[var(--color-button-text,#241804)]"
                  strokeWidth={2}
                />
              </span>
              <span className="flex-1 whitespace-nowrap px-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-button-text,#241804)] sm:text-sm">
                {CONTENT.cta}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight
                  className="h-4 w-4 text-[var(--color-button-text,#241804)]"
                  strokeWidth={2}
                />
              </span>
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-col items-center gap-3 text-[var(--color-text-muted,#cbc3b6)]/65 sm:mt-9 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[var(--color-gold,#e8b873)]/20">
          {CONTENT.trust.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 sm:px-5 first:sm:pl-0 last:sm:pr-0"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--color-gold,#e8b873)]/80 drop-shadow-[0_0_4px_rgba(232,184,115,0.5)]"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes process-float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(6px, -14px);
          }
        }
        @keyframes process-float-alt {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-8px, -10px);
          }
        }
        @keyframes process-twinkle {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.22;
            transform: scale(1.1);
          }
        }
        @keyframes process-icon-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .process-icon-float {
          animation: process-icon-float 2.8s ease-in-out infinite;
        }

        /* --- Timeline line effects: Stationary Line + Single Animated Light Reflection --- */

        @keyframes timeline-shine-travel {
          0% {
            left: 0%;
            transform: translate(-100%, -50%);
          }
          100% {
            left: 100%;
            transform: translate(0%, -50%);
          }
        }
        .timeline-shine {
          animation: timeline-shine-travel 3.5s linear infinite;
        }

        @keyframes timeline-shine-travel-vertical {
          0% {
            top: 0%;
            transform: translate(-50%, -100%);
          }
          100% {
            top: 100%;
            transform: translate(-50%, 0%);
          }
        }
        .timeline-shine-vertical {
          animation: timeline-shine-travel-vertical 3.5s linear infinite;
        }

        @keyframes timeline-connector-pulse {
          0%,
          100% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.25);
          }
        }
        .timeline-connector-glow {
          animation: timeline-connector-pulse 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .process-icon-float,
          .timeline-shine,
          .timeline-shine-vertical,
          .timeline-connector-glow,
          [style*="process-float"],
          [style*="process-twinkle"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}