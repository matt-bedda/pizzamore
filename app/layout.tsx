import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./CartContext";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PizzAmore",
  description: "Fresh pizza, delivered with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div
            id="container"
            className="flex flex-col h-screen w-screen overflow-hidden"
          >
            <Header />
            <main className="flex w-full flex-col flex-grow px-6 py-6 overflow-auto">
              {children}
            </main>
            <footer className="flex w-full px-4 py-2 flex-shrink-0 justify-center items-center border-t border-border">
              <p className="text-sm text-muted-foreground">
                Copyright © 2026 PizzAmore. All rights reserved.
              </p>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
