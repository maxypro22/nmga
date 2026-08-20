import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ParallaxObserver } from "@/components/layout/ParallaxObserver";
import { getThemeOverrides, themeOverridesToCss } from "@/lib/content";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nmj-group.qa"),
  title: {
    default: "NMJ Group | Qatari Group Since 1991",
    template: "%s | NMJ Group",
  },
  description:
    "NMJ Group is a diversified business group headquartered in Doha, Qatar. Founded in 1991, we operate across hospitality, real estate, construction, events, services, technology, and AI.",
  keywords: [
    "NMJ Group",
    "NMJ Group Qatar",
    "Dania Group",
    "Qatari holding company",
    "Qatar business group",
    "Qatar conglomerate",
    "Doha holding company",
    "Sapphire Plaza Hotel",
    "Dania Real Estate",
    "Al Emara Al Islamiya",
    "Next IT",
    "Five Nodes",
    "Steak Town",
    "Al Anaqa",
    "Dania Maids",
    "Qatar investments",
    "Qatar real estate",
    "Qatar contracting",
    "Qatar hospitality",
    "Qatar technology",
  ],
  authors: [{ name: "NMJ Group" }],
  creator: "NMJ Group",
  publisher: "NMJ Group",
  alternates: {
    canonical: "https://nmj-group.qa",
    languages: {
      "en-QA": "https://nmj-group.qa",
      "ar-QA": "https://nmj-group.qa/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_QA",
    url: "https://nmj-group.qa",
    siteName: "NMJ Group",
    title: "NMJ Group | Qatari Group Since 1991",
    description:
      "NMJ Group is a diversified business group headquartered in Doha, Qatar. Founded in 1991, we operate across hospitality, real estate, construction, events, services, technology, and AI.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NMJ Group — Qatari Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NMJ Group | Qatari Group",
    description:
      "NMJ Group is a diversified business group headquartered in Doha, Qatar. Founded in 1991, we operate across hospitality, real estate, construction, events, services, technology, and AI.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "GOOGLE_VERIFICATION_PLACEHOLDER",
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('nmj-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (_) {}
  try {
    var p = location.pathname;
    if (p === '/ar' || p.indexOf('/ar/') === 0) {
      document.documentElement.lang = 'ar-QA';
      document.documentElement.dir = 'rtl';
    }
  } catch (_) {}
})();`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = await getThemeOverrides();
  const themeCss = themeOverridesToCss(theme);

  return (
    <html
      lang="en-QA"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {themeCss ? (
          <style dangerouslySetInnerHTML={{ __html: themeCss }} />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col bg-[var(--color-bg-primary)] text-[var(--color-ink)]">
        <SmoothScrollProvider>
          <Navigation />
          <main className="flex flex-1 flex-col">
            <PageShell>{children}</PageShell>
          </main>
          <Footer />
          <ScrollToTop />
          <ScrollProgress />
          <ParallaxObserver />
          <RevealObserver />
          <CursorGlow />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
