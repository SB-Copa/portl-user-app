import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import { CartOverview, CartOverviewActions } from "@/components/cart/cart-overview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartGlobalFooter from "@/components/cart/cart-global-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PD Portal",
  description: "PD Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <CartProvider>
          <div className="flex flex-col items-center relative max-w-[520px] mx-auto overflow-clip min-h-[100lvh] px-6 py-4 pb-22">
            {children}
            <CartGlobalFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
