import CallCard from "@/components/landing/CallCard";
import { Icon, IconSprite, LineIcon } from "@/components/landing/Icons";
import SiteHeader from "@/components/landing/SiteHeader";
import StringLights from "@/components/landing/StringLights";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/landing/content";
import { montserrat, openSans } from "@/components/landing/fonts";
import type { Metadata } from "next";
import Link from "next/link";
import "../landing.css";
import "./success.css";

export const metadata: Metadata = {
  title: "Thank You | Denver Christmas Lights",
  description:
    "Your free Christmas light quote request has been received. Here's what happens next.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS: { title: string; text: string }[] = [
  {
    title: "We Review Your Home",
    text: "We look over your property details, roofline and lighting style so we understand exactly what you have in mind.",
  },
  {
    title: "We Give You a Call",
    text: "A member of our team reaches out within 24 hours to answer questions and talk through design ideas.",
  },
  {
    title: "You Get Your Lighting Plan",
    text: "We send a clear, written proposal with your custom design and pricing. No surprises, no pressure.",
  },
  {
    title: "We Light Up Your Home",
    text: "Once approved, we schedule your install date, keep everything shining all season and take it down after.",
  },
];

export default function SuccessPage() {
  return (
    <div className={`dcl ${montserrat.variable} ${openSans.variable}`}>
      <IconSprite />
      <SiteHeader base="/" />
      <StringLights />

      <main className="ty">
        <div className="wrap narrow">
          <span className="ty-tag">
            <i aria-hidden="true" />
            Thanks! We got your request
          </span>
          <h1>
            Here&rsquo;s What <span>Happens Next.</span>
          </h1>
          <p className="ty-lead">
            Your free quote request is in. A Denver Christmas Lights specialist
            will review your details and reach out soon to help plan your
            holiday display.
          </p>

          <ol className="ty-steps">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="ty-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="ty-card">
            <div className="ty-note">
              <span className="ty-check">
                <Icon
                  name="check"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                />
              </span>
              <div>
                <h3>No guesswork, no pressure.</h3>
                <p>
                  We&rsquo;ll keep you updated from the first call to your
                  install date. Have a question about your quote or want to lock
                  in a date sooner? Give us a call.
                </p>
              </div>
            </div>
            <CallCard />
          </div>

          <Link href="/" className="ty-back">
            <LineIcon name="arrow" />
            Back to home
          </Link>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="fbottom">
            <span>
              © {new Date().getFullYear()} Denver Christmas Lights. All rights
              reserved.
            </span>
            <span>
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a> · Fully insured · Locally
              owned
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
