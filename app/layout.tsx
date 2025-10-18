import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import CartGlobalFooter from "@/components/cart/cart-global-footer";
import Image from "next/image";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  style: ['normal'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "PORTL",
  description: "PORTL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} font-inter antialiased bg-black text-white`}
      >
        <CartProvider>
          <div className="flex flex-col items-center relative max-w-[520px] mx-auto overflow-clip min-h-[100lvh] px-6 py-4 pb-22 gap-10 pt-10">
            <Image src="/images/portl-logo-white.svg" alt="logo" width={100} height={100} className="h-10 w-fit self-start"/>
            {children}
            <CartGlobalFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
