import "./globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/context/AppProvider";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "CarbonTrack - Eco-Footprint & Pledge Tracker",
  description: "A production-grade carbon footprint tracker with real-time gamification, predictive analytics, voice assistance, and community challenges.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased text-charcoal-500 dark:text-carbon-text">
        <AppProvider>
          {/* Skip-link for screen readers & keyboard navigation */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 focus:outline-none" tabIndex={-1}>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
