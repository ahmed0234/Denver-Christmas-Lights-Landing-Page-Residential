declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export const GOOGLE_ADS_CONVERSION_ID = "AW-959322441/yn4TCPqn09wcEMmyuMkD";
export const PHONE_NUMBER_FORMATTED = "(720) 296-7711";
export const PHONE_NUMBER_TEL = "tel:7202967711";

/**
 * Global click handler for phone call conversion tracking in Google Ads.
 * Triggers the Google Ads conversion event when a user clicks any phone number or call CTA.
 */
export const handlePhoneCallClick = (
  e?: React.MouseEvent<HTMLElement>,
  url: string = PHONE_NUMBER_TEL
) => {
  if (typeof window !== "undefined") {
    if (typeof window.gtag_report_conversion === "function") {
      window.gtag_report_conversion(url);
    } else if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSION_ID,
      });
    }
  }
};
