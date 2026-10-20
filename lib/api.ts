/**
 * Backend origin that hosts /api/contact. Forms always post here, so leads reach
 * the API no matter which domain the page is served from.
 * Override with NEXT_PUBLIC_API_BASE_URL (e.g. "http://localhost:3000" in dev).
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://residential.christmascolorado.com"
).replace(/\/+$/, "");

export const CONTACT_API_URL = `${API_BASE_URL}/api/contact`;
