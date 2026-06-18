import type { Metadata } from "next";
import { Sora, Source_Code_Pro, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackground from "@/components/design/GridBackground";
import ButtonGradient from "@/components/design/ButtonGradient";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LightsOutLoader from "@/components/racing/LightsOutLoader";
import TelemetryCursor from "@/components/racing/TelemetryCursor";
import TelemetryRail from "@/components/racing/TelemetryRail";
import ShaderBackground from "@/components/racing/ShaderBackground";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-code",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chuba — Frontend / Full-stack Engineer",
  description:
    "Chinemelum 'Chuba' Chuba-Nwene — a frontend-focused engineer building fast, scalable, real-time web applications. Currently leading frontend at TheTravelHunters.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${sourceCodePro.variable} ${spaceGrotesk.variable} antialiased relative min-h-screen w-full overflow-x-hidden`}
      >
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
            if(localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          `}
        </Script>
        <Analytics />
        <SpeedInsights />

        <LightsOutLoader />
        <TelemetryCursor />
        <TelemetryRail />

        <ShaderBackground />
        <GridBackground />
        <SmoothScroll>
          <Header />
          <main className="pt-[4.75rem] lg:pt-[5.25rem]">{children}</main>
          <Footer />
        </SmoothScroll>

        <ButtonGradient />
      </body>
    </html>
  );
}
