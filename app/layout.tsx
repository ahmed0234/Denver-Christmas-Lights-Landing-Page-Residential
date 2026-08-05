import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title:
    "Residential Christmas Light Installation Denver | Denver Christmas Lights",
  description:
    "Professional residential Christmas light installation in Denver. Custom design, installation, maintenance, takedown and seasonal support. Request your free quote.",
  icons: {
    icon: "/NavbarLogo.png",
    shortcut: "/NavbarLogo.png",
    apple: "/NavbarLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="golden"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-959322441"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-959322441');
          `}
        </Script>
        {/* Google Ads Phone Call Conversion Tracking Snippet */}
        <Script id="google-phone-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-959322441/yn4TCPqn09wcEMmyuMkD', {
              'phone_conversion_number': '(720) 296-7711'
            });
          `}
        </Script>
        {/* Google Ads Onclick Call Conversion Helper */}
        <Script id="gtag-report-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-959322441/yn4TCPqn09wcEMmyuMkD',
                    'event_callback': callback
                });
              }
              return false;
            }
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

