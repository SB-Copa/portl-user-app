import CartGlobalFooter from '@/components/cart/cart-global-footer'
import TenantTopNavigation from '@/components/tenant/top-navigation'
import { CartProvider } from '@/contexts/cart-context'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

type TenantLayoutProps = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    metadataBase: new URL('https://local.portl.com.ph/paradimes'),
    title: "PARADIMES | PORTL",
    description: "PARADIMES",
}

export default function TenantLayout({ children }: TenantLayoutProps) {
    return (
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
    )
}
