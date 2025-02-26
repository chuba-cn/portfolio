/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import AnimatePresenceWrapper from "@/components/AnimatePresenceWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Chuba N.C",
  description: "Portfolio Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistMono.variable} ${geistSans.variable} antialiased w-full min-h-screen dark:bg-dark relative`}
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
        <Navbar />
        <AnimatePresenceWrapper>
          {children}
        </AnimatePresenceWrapper>
        <AnimatedGridPattern
          numSquares={60}
          maxOpacity={0.1}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(750px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-0 h-full skew-y-8 backdrop:blur-sm"
          )}
        />
        <Footer />
      </body>
    </html>
  );
}
