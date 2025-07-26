// app/SessionWrapper.jsx
"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

import { Khand, M_PLUS_Code_Latin } from "next/font/google";

const khand = Khand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-khand",
});

const mplus = M_PLUS_Code_Latin({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-mplus",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
