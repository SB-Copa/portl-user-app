import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/contexts/cart-context";
import CartGlobalFooter from "@/components/cart/cart-global-footer";
import Image from "next/image";
import TenantTopNavigation from "@/components/tenant/top-navigation";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  style: ['normal'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const generalSans = localFont({
  src: [
    {
      path: '../fonts/general-sans/GeneralSans-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-ExtralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../fonts/general-sans/GeneralSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/general-sans/GeneralSans-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
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
      <body className={`${inter.variable} ${generalSans.variable} ${generalSans.className} font-general-sans antialiased bg-black text-white`}>
      <CartProvider>
            <div className="flex flex-col relative mx-auto min-h-[100lvh] w-full">
                {/* <Image src="/images/portl-logo-white.svg" alt="logo" width={100} height={100} className="h-10 w-fit self-start" /> */}

                <TenantTopNavigation />

                <div className="flex flex-col pb-22">
                    {children}
                </div>

                <CartGlobalFooter />
            </div>
        </CartProvider>
      </body>
    </html>
  );
}
