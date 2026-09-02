import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Continuum",
  description: "Save work context so you can pick up where you left off.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-slate-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-slate-900"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
