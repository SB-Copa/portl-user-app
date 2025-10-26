import { CartProvider } from '@/contexts/cart-context'
import { DeviceProvider } from '@/contexts/device-context'
import React from 'react'

type ProvidersProps = {
    children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
    return (
        <CartProvider>
            <DeviceProvider>
                {children}
            </DeviceProvider>
        </CartProvider>
    )
}
