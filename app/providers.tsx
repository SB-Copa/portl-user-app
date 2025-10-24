import { CartProvider } from '@/contexts/cart-context'
import { DeviceProvider } from '@/contexts/device-context'
import { getServerDevice } from '@/lib/server-device';
import React from 'react'

type ProvidersProps = {
    children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
    const device = await getServerDevice();
    return (
        <CartProvider>
            <DeviceProvider initialDevice={device}>
                {children}
            </DeviceProvider>
        </CartProvider>
    )
}
