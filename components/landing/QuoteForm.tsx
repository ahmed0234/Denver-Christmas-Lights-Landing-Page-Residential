"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTACT_API_URL } from "@/lib/api";
import { PHONE_DISPLAY } from "./content";

const SERVICE_CHIPS = [
  "Roofline Lighting",
  "Entryway & Porch",
  "Tree & Landscape",
  "Full Property",
  "Not Sure Yet",
];

const SERVICE_OPTIONS = [
  "Roofline Lighting",
  "Entryway & Porch Lighting",
  "Tree & Landscape Lighting",
  "Full Property Lighting",
  "Not Sure Yet",
];

type Variant = "hero" | "contact";

const COPY: Record<Variant, { title: string; note: string; submit: string }> = {
  hero: {
    title: "Get Your Free Quote",
    note: "Custom pricing for your home. No obligation.",
    submit: "Get My Free Quote",
  },
  contact: {
    title: "Request a Free Quote",
    note: "We'll reply with custom pricing for your home.",
    submit: "Send Request",
  },
};

/** Posts to the backend /api/contact and redirects to /success (which fires the Ads conversion). */
export default function QuoteForm({ variant }: { variant: Variant }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const id = (field: string) => (variant === "hero" ? field : `c-${field}`);
  const copy = COPY[variant];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const service = field("service");

    setSubmitting(true);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${field("first_name")} ${field("last_name")}`.trim(),
          email: field("email"),
          phone: field("phone"),
          zip: field("zip"),
          services:
            variant === "hero"
              ? data.getAll("svc").join(", ")
              : service === "Choose one" ? "" : service,
          message: field("message"),
          honeypot: field("company"),
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        router.push("/success");
        return;
      }
      setError(result.error || "Something went wrong. Please try again or call us directly.");
    } catch {
      setError(`Network error. Please try again or call us at ${PHONE_DISPLAY}.`);
    }
    setSubmitting(false);
  };

  return (
    <form className="qform" onSubmit={handleSubmit}>
      <h2>{copy.title}</h2>
      <p className="note">{copy.note}</p>
      <div className="fgrid">
        <div>
          <label htmlFor={id("fn")}>First name *</label>
          <input id={id("fn")} name="first_name" required autoComplete="given-name" placeholder="First name" />
        </div>
        <div>
          <label htmlFor={id("ln")}>Last name *</label>
          <input id={id("ln")} name="last_name" required autoComplete="family-name" placeholder="Last name" />
        </div>
        <div>
          <label htmlFor={id("em")}>Email *</label>
          <input id={id("em")} name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor={id("ph")}>Phone *</label>
          <input id={id("ph")} name="phone" type="tel" required autoComplete="tel" placeholder="(720) 000-0000" />
        </div>
        {variant === "hero" ? (
          <>
            <div className="full">
              <label htmlFor="zip">ZIP code *</label>
              <input id="zip" name="zip" inputMode="numeric" required autoComplete="postal-code" placeholder="80202" />
            </div>
            <div className="full">
              <label>Services needed</label>
              <div className="chips">
                {SERVICE_CHIPS.map((label) => (
                  <label key={label} className="chip">
                    <input type="checkbox" name="svc" value={label} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="full">
            <label htmlFor="c-sv">Service needed</label>
            <select id="c-sv" name="service" defaultValue="Choose one">
              <option>Choose one</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
        <div className="full">
          <label htmlFor={id("msg")}>Message</label>
          <textarea
            id={id("msg")}
            name="message"
            placeholder={
              variant === "hero"
                ? "Tell us about your home and the look you want..."
                : "Tell us about your home..."
            }
          />
        </div>
      </div>
      {/* Honeypot: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn-red" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : copy.submit}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {variant === "hero" && (
        <p className="privacy">We respect your privacy. Your information is never shared.</p>
      )}
    </form>
  );
}
