"use client";

import { handlePhoneCallClick } from "@/lib/gtag";
import { LineIcon } from "./Icons";
import { PHONE_DISPLAY, PHONE_HREF } from "./content";

/** Big red call button; reports the Google Ads phone conversion on click. */
export default function CallCard() {
  return (
    <a
      href={PHONE_HREF}
      className="ty-call"
      onClick={(e) => handlePhoneCallClick(e, PHONE_HREF)}
    >
      <span className="ty-call-ico">
        <LineIcon name="phone" />
      </span>
      <span>
        <small>Can&rsquo;t wait? Call us now</small>
        <strong>{PHONE_DISPLAY}</strong>
      </span>
    </a>
  );
}
