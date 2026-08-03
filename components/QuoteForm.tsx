"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  User,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  Lock,
  Snowflake,
  Check,
} from "lucide-react";

// ── Field wrapper ──────────────────────────────────────────────────────────────
function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  isTextarea = false,
  rightIcon: RightIcon,
  id,
  label,
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  rightIcon?: React.ElementType;
  id: string;
  label?: string;
}) {
  const baseClass =
    "w-full bg-transparent text-[var(--text-body)] placeholder-[var(--text-muted)] text-sm outline-none resize-none leading-normal";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-[var(--text-heading)] pl-0.5 tracking-wide"
        >
          {label}
        </label>
      )}
      <div
        className={`flex ${
          isTextarea ? "items-start" : "items-center"
        } gap-3 px-4 py-3.5 rounded-xl border-[1.5px] group transition-all`}
        style={{
          background: `linear-gradient(180deg, var(--input-bg-top) 0%, var(--input-bg-bottom) 100%)`,
          borderColor: "var(--border-input)",
          boxShadow:
            "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
        onFocus={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border-input-focus)";
          el.style.boxShadow =
            "0 0 0 2px var(--accent-glow-soft), inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
        }}
        onBlur={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = "var(--border-input)";
          el.style.boxShadow =
            "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
        }}
      >
        <Icon
          size={16}
          className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
          style={{ color: "var(--text-muted)" }}
        />
        {isTextarea ? (
          <textarea
            id={id}
            placeholder={placeholder}
            rows={3}
            className={`${baseClass} flex-1`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            className={`${baseClass} flex-1`}
          />
        )}
        {RightIcon && (
          <RightIcon
            size={16}
            className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
            style={{ color: "var(--text-muted)" }}
          />
        )}
      </div>
    </div>
  );
}

// ── Divider with snowflake ─────────────────────────────────────────────────────
function SnowflakeDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
      <Snowflake size={13} style={{ color: "var(--accent)" }} />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
    </div>
  );
}

// ── Service Multi-Select Component ──────────────────────────────────────────────
const SERVICE_OPTIONS = [
  "Roofline Lighting",
  "Entryway & Porch Lighting",
  "Full Property Lighting",
  "Tree & Landscape Lighting",
  "Not Sure Yet",
];

function ServiceMultiSelect() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (option: string) => {
    if (option === "Not Sure Yet") {
      if (selectedServices.includes("Not Sure Yet")) {
        setSelectedServices([]);
      } else {
        setSelectedServices(["Not Sure Yet"]);
      }
    } else {
      if (selectedServices.includes(option)) {
        setSelectedServices(selectedServices.filter((s) => s !== option));
      } else {
        setSelectedServices([
          ...selectedServices.filter((s) => s !== "Not Sure Yet"),
          option,
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between pl-0.5">
        <label className="text-xs font-semibold text-[var(--text-heading)] tracking-wide">
          Services Needed
        </label>
        <span className="text-[10px] font-normal text-[var(--text-muted)] uppercase tracking-wider">
          Select all that apply
        </span>
      </div>

      <input
        type="hidden"
        id="quote-services"
        name="services"
        value={selectedServices.join(", ")}
      />

      <div className="flex flex-wrap gap-2 pt-0.5">
        {SERVICE_OPTIONS.map((option) => {
          const isSelected = selectedServices.includes(option);
          return (
            <button
              type="button"
              key={option}
              onClick={() => toggleService(option)}
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer select-none border-[1.5px] ${
                isSelected
                  ? "border-[var(--gold)] text-[var(--text-heading)] font-semibold shadow-[0_0_12px_rgba(245,200,106,0.22),inset_0_1px_0_rgba(255,255,255,0.15)]"
                  : "border-[var(--border-input)] text-[var(--text-body)] hover:border-[var(--gold-dark)] hover:text-white"
              }`}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, rgba(217, 53, 53, 0.35) 0%, rgba(140, 25, 20, 0.5) 50%, rgba(245, 200, 106, 0.18) 100%)"
                  : "linear-gradient(180deg, var(--input-bg-top) 0%, var(--input-bg-bottom) 100%)",
                boxShadow: isSelected
                  ? "0 0 12px rgba(245, 200, 106, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                  : "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)",
              }}
            >
              <div
                className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-[var(--bg-primary)] font-bold shadow-[0_0_6px_rgba(245,200,106,0.5)]"
                    : "border border-[var(--text-muted)] group-hover:border-[var(--gold-dark)] bg-black/20"
                }`}
              >
                {isSelected && <Check size={10} strokeWidth={3} />}
              </div>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function QuoteForm() {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const handleTriggerAttention = () => {
      setIsHighlighting(true);
      setAnimKey((prev) => prev + 1);

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Focus Full Name input field after animation begins
      const focusDelay = prefersReducedMotion ? 50 : 350;
      setTimeout(() => {
        const nameInput = document.getElementById(
          "quote-name"
        ) as HTMLInputElement | null;
        if (nameInput) {
          nameInput.focus({ preventScroll: true });
        }
      }, focusDelay);

      // Reset animation state after completing
      setTimeout(() => {
        setIsHighlighting(false);
      }, 1400);
    };

    window.addEventListener(
      "quote-form-trigger-attention",
      handleTriggerAttention
    );

    if (
      typeof window !== "undefined" &&
      (window.location.hash === "#quote" || window.location.hash === "#quote-form")
    ) {
      handleTriggerAttention();
    }

    return () => {
      window.removeEventListener(
        "quote-form-trigger-attention",
        handleTriggerAttention
      );
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="relative w-full max-w-[480px] mx-auto"
    >
      {/* Christmas Lights decoration */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "-76px", left: "-18px", right: "-18px" }}
      >
        <motion.div
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/FormUpperLights.png"
            alt="Christmas string lights decoration"
            width={1320}
            height={540}
            className="w-full h-auto"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </motion.div>
      </div>

      {/* ── Card ─────────────────────────────────────────────────────────────── */}
      <motion.div
        id="quote-form-container"
        key={animKey}
        animate={
          isHighlighting
            ? {
                scale: [1, 1.04, 1],
                borderColor: [
                  "var(--form-border-color)",
                  "#F5C86A",
                  "var(--form-border-color)",
                ],
                boxShadow: [
                  "0 0 0 1px var(--border-color), var(--shadow-card-hover), inset 0 1px 0 var(--highlight-btn)",
                  "0 0 35px rgba(245, 200, 106, 0.65), 0 0 75px rgba(245, 200, 106, 0.3), 0 20px 60px rgba(0, 0, 0, 0.9), inset 0 2px 6px rgba(255, 255, 255, 0.6)",
                  "0 0 0 1px var(--border-color), var(--shadow-card-hover), inset 0 1px 0 var(--highlight-btn)",
                ],
              }
            : {}
        }
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          /* Deep vertical gradient — lighter top, darker bottom */
          background: `radial-gradient(ellipse 90% 45% at 50% 0%, var(--gradient-form-top) 0%, var(--gradient-form-mid) 38%, var(--gradient-form-bottom) 100%)`,
          border: `2px solid var(--form-border-color)`,
          boxShadow: `0 0 0 1px var(--border-color), var(--shadow-card-hover), inset 0 1px 0 var(--highlight-btn)`,
        }}
      >
        {/* Highlight sweep effect during attention phase */}
        {isHighlighting && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(245, 200, 106, 0.05) 25%, rgba(255, 240, 190, 0.35) 50%, rgba(245, 200, 106, 0.05) 75%, transparent 100%)",
            }}
          />
        )}
        {/* Top warm shimmer — creates the "lighter top" depth effect */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 0%, var(--form-highlight) 0%, transparent 100%)`,
          }}
        />

        {/* Inner top highlight line */}
        <div
          className="absolute top-0 inset-x-12 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent, var(--highlight-btn), transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative px-7 pt-24 pb-7">
          {/* Top label */}
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-center mb-2"
            style={{ color: "var(--accent)" }}
          >
            GET YOUR FREE
          </p>

          {/* Heading */}
          <h2
            className="text-[1.75rem] font-bold text-center leading-snug"
            style={{
              color: "var(--text-heading)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            Christmas Lighting Quote
          </h2>

          <SnowflakeDivider />

          {/* Form fields */}
          <form
            className="flex flex-col gap-4 2xl:gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField id="quote-name" icon={User} placeholder="Full Name" />
            <FormField
              id="quote-email"
              icon={Mail}
              placeholder="Email Address"
              type="email"
            />
            <FormField
              id="quote-zip"
              icon={MapPin}
              placeholder="Enter your ZIP Code"
            />
            <ServiceMultiSelect />
            <FormField
              id="quote-message"
              icon={MessageSquare}
              placeholder="Message"
              isTextarea
            />

            {/* ── Submit Button ── */}
            <motion.button
              id="quote-submit"
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: `var(--shadow-btn-hover), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full mt-2 py-3 px-2 rounded-xl font-bold text-sm tracking-[0.16em] uppercase text-white flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
                boxShadow: `var(--shadow-btn), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 0 var(--btn-inner-shadow)`,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* 3D top shine */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)`,
                }}
              />
              <span className="relative flex-1 text-center text-amber-950">GET A FREE QUOTE</span>
              <span
                className="relative ml-4 w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.18)",
                }}
              >
                <ArrowRight size={17} style={{ color: "#000", strokeWidth: 2.5 }} className="text-amber-950" />
              </span>
            </motion.button>
          </form>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock size={11} style={{ color: "var(--text-muted)" }} />
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
